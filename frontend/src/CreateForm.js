// code by Harsh

import { useState, useEffect } from "react";
import axios from "axios";
import { PDFDocument } from "pdf-lib";
import templatePdf from "./Enumeration_Bill_Format.pdf";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "./firebase";
import { useLocation } from "react-router-dom";

export default function ExamBillForm() {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");

  const location = useLocation();
  const shouldPrefill = location.state?.prefill;
  const prefillData = location.state?.prefillData;

  // Fetch user data or prefill if available
  useEffect(() => {
    const fetchFormData = async () => {
      if (prefillData) {
        console.log("Received Prefill Data:", prefillData);
        setFormData(prefillData);
        return;
      }

      if (!shouldPrefill) return;

      const user = auth.currentUser;
      if (!user) return;

      const idToken = await user.getIdToken();
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/exam-bill/", {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
        setFormData(res.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchFormData();
  }, [prefillData, shouldPrefill]);

  // Generate PDF from template
  const handleGeneratePdf = async (formData) => {
    const existingPdfBytes = await fetch(templatePdf).then((res) =>
      res.arrayBuffer()
    );
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { height } = firstPage.getSize();

    // Fill form data on PDF (adjust coordinates as needed)
    firstPage.drawText(formData.cno || "", { x: 430, y: height - 17, size: 8 });
    firstPage.drawText(formData.examinerId || "", {
      x: 450,
      y: height - 30,
      size: 8,
    });
    firstPage.drawText(formData.examinerName || "", {
      x: 160,
      y: height - 103,
      size: 8,
    });
    firstPage.drawText(formData.examinerCode || "", {
      x: 430,
      y: height - 103,
      size: 8,
    });
    firstPage.drawText(formData.address || "", {
      x: 160,
      y: height - 125,
      size: 8,
    });
    firstPage.drawText(formData.college || "", {
      x: 183,
      y: height - 174,
      size: 8,
    });
    firstPage.drawText(formData.subject || "", {
      x: 450,
      y: height - 174,
      size: 8,
    });
    firstPage.drawText(formData.bankName || "", {
      x: 155,
      y: height - 150,
      size: 8,
    });
    firstPage.drawText(formData.branch || "", {
      x: 293,
      y: height - 150,
      size: 8,
    });
    firstPage.drawText(formData.ifsc || "", {
      x: 466,
      y: height - 150,
      size: 8,
    });
    firstPage.drawText(formData.accountNo || "", {
      x: 110,
      y: height - 163,
      size: 8,
    });
    firstPage.drawText(formData.micr || "", {
      x: 225,
      y: height - 163,
      size: 8,
    });
    firstPage.drawText(formData.phone || "", {
      x: 110,
      y: height - 140,
      size: 8,
    });
    firstPage.drawText(formData.pan || "", {
      x: 290,
      y: height - 140,
      size: 8,
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url);
  };

  // Submit form data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const formObject = Object.fromEntries(data.entries());

    try {
      const user = auth.currentUser;
      const idToken = user ? await user.getIdToken() : null;

      const res = await axios.post(
        "http://127.0.0.1:8000/api/exam-bill/",
        formObject,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: idToken ? `Bearer ${idToken}` : undefined,
          },
        }
      );

      alert(res.data.message);
      // Optional: Generate PDF after submit
      // handleGeneratePdf(formObject);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form.");
    }
  };

  return (
    <div className="bg-gray-100 p-6">
      <div className="bg-white shadow rounded-2xl p-8">
        <h1 className="text-center mb-6 text-xl font-bold">University Bill</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* HEADER */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Header</h2>
            <div className="grid grid-cols-2 gap-3">
              <input
                name="cno"
                placeholder="C. No."
                value={formData.cno || ""}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="border p-2 rounded"
              />
              <input
                name="examinerId"
                placeholder="Examiner ID No."
                className="border p-2 rounded"
              />
              <input
                name="examType"
                placeholder="Exam (Annual/Semester)"
                className="border p-2 rounded"
              />
              <input
                name="college"
                placeholder="College / Faculty / Department"
                className="border p-2 rounded"
              />
              <input
                name="subject"
                placeholder="Subject"
                className="border p-2 rounded col-span-2"
              />
            </div>
          </section>

          {/* EXAMINER DETAILS */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Examiner Details</h2>
            <div className="grid grid-cols-2 gap-3">
              <input
                name="examinerName"
                placeholder="Examiner Name"
                value={formData.examinerName || ""}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="border p-2 rounded w-full"
              />
              <input
                name="examinerCode"
                placeholder="Examiner Code"
                value={formData.examinerCode || ""}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="border p-2 rounded"
              />
              <textarea
                name="address"
                placeholder="Residential Address"
                className="border p-2 rounded col-span-2"
              />
              <input
                name="phone"
                type="number"
                placeholder="Phone no."
                className="border p-2 rounded"
              />
              <input name="pan" placeholder="PAN" className="border p-2 rounded" />
              <input
                name="bankName"
                placeholder="Bank Name"
                className="border p-2 rounded"
              />
              <input
                name="branch"
                placeholder="Branch"
                className="border p-2 rounded"
              />
              <input
                name="ifsc"
                placeholder="IFSC Code"
                className="border p-2 rounded"
              />
              <input
                name="accountNo"
                placeholder="A/C No."
                className="border p-2 rounded"
              />
              <input
                name="micr"
                placeholder="MICR Code"
                className="border p-2 rounded"
              />
            </div>
          </section>

          {/* PART A */}
          <section>
            <h2 className="text-lg font-semibold mb-3">
              PART A — Setting of Question Paper / Valuation
            </h2>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <input
                name="examinationName"
                placeholder="Examination Name"
                className="border p-2 rounded"
              />
              <input
                name="paperName"
                placeholder="Paper (Name/Code)"
                className="border p-2 rounded"
              />
              <input
                name="papersSet"
                type="number"
                placeholder="No. of Papers Set"
                className="border p-2 rounded"
              />
              <input
                name="paperRate"
                type="number"
                placeholder="Rate per Paper (Rs)"
                className="border p-2 rounded"
              />
              <input
                name="durationHours"
                type="number"
                placeholder="Duration of Paper (Hours)"
                className="border p-2 rounded"
              />
              <input
                name="additionalExaminers"
                type="number"
                placeholder="No. of Additional Examiners (If any)"
                className="border p-2 rounded"
              />
            </div>

            {/* PRACTICAL EXAMINATION */}
            <div className="border-t pt-4">
              <h3 className="text-md font-semibold mb-3">
                Practical Examination (ONLY)
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm">
                    Examination held on (date)
                  </label>
                  <input
                    type="date"
                    name="practicalHeldOn"
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm">Held at / In</label>
                  <input
                    type="text"
                    name="practicalHeldAt"
                    placeholder="Location / Lab"
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm">
                    Batch size (candidates per batch)
                  </label>
                  <input
                    type="number"
                    name="practicalBatchSize"
                    placeholder="Batch of ___ candidates"
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm">
                    No. of Question Papers Set (Practical)
                  </label>
                  <input
                    type="number"
                    name="practicalPapersSet"
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm">
                    No. of Practical Examiners
                  </label>
                  <input
                    type="number"
                    name="practicalNoOfExaminers"
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm">
                    Rate per Practical Examiner (Rs)
                  </label>
                  <input
                    type="number"
                    name="practicalRatePerExaminer"
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm">
                    No. of Valued Scripts (Practical)
                  </label>
                  <input
                    type="number"
                    name="practicalNoOfValuedScripts"
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm">
                    Rate per Valued Script (Rs)
                  </label>
                  <input
                    type="number"
                    name="practicalRatePerValuedScript"
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm">
                    Conduct of Practical / Oral Examination — No. of Candidates
                  </label>
                  <input
                    type="number"
                    name="practicalConductNoOfCandidates"
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm">
                    Conduct Rate per Candidate (Rs)
                  </label>
                  <input
                    type="number"
                    name="practicalConductRatePerCandidate"
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm">
                    Valuation / Project Report / Dissertation — No. of
                    Dissertations
                  </label>
                  <input
                    type="number"
                    name="practicalValuationNoOfDissertations"
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm">Rate per Dissertation (Rs)</label>
                  <input
                    type="number"
                    name="practicalValuationRatePerDissertation"
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm">Any Remarks / Verified by</label>
                  <input
                    type="text"
                    name="practicalRemarks"
                    placeholder="Verified by / Remarks"
                    className="border p-2 rounded w-full"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* PART B */}
          <section>
            <h2 className="text-lg font-semibold mb-3">
              PART B — Conveyance Charges
            </h2>
            <div className="grid grid-cols-3 gap-3">
              <input type="date" name="convDate" className="border p-2 rounded" />
              <input name="convFrom" placeholder="From" className="border p-2 rounded" />
              <input name="convTo" placeholder="To" className="border p-2 rounded" />
              <input
                name="convKms"
                type="number"
                placeholder="Distance (kms)"
                className="border p-2 rounded"
              />
              <input
                name="convVehicleNo"
                placeholder="Vehicle No. (Scooter/Taxi)"
                className="border p-2 rounded"
              />
              <input
                name="convPurpose"
                placeholder="Purpose of Journey"
                className="border p-2 rounded"
              />
              <input
                name="convAmount"
                type="number"
                placeholder="Amount (Rs)"
                className="border p-2 rounded col-span-3"
              />
            </div>
          </section>

          {/* PART C */}
          <section>
            <h2 className="text-lg font-semibold mb-3">
              PART C — Contingent Expenses
            </h2>
            <div className="grid grid-cols-3 gap-3">
              <input type="date" name="contDate" className="border p-2 rounded" />
              <input
                name="contDetails"
                placeholder="Details of Expenditure"
                className="border p-2 rounded col-span-2"
              />
              <input
                name="contAmount"
                type="number"
                placeholder="Amount (Rs)"
                className="border p-2 rounded col-span-3"
              />
            </div>
          </section>

          {/* TOTALS */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Totals</h2>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <input
                name="totalPartA"
                type="number"
                placeholder="Total Part A (Rs)"
                className="border p-2 rounded"
              />
              <input
                name="totalPartB"
                type="number"
                placeholder="Total Part B (Rs)"
                className="border p-2 rounded"
              />
              <input
                name="totalPartC"
                type="number"
                placeholder="Total Part C (Rs)"
                className="border p-2 rounded"
              />
              <input
                name="grandTotal"
                type="number"
                placeholder="Grand Total (A+B+C) (Rs)"
                className="border p-2 rounded"
              />
              <input
                name="grandTotalWords"
                placeholder="Rupees (in words)"
                className="border p-2 rounded col-span-2"
              />
            </div>
          </section>

          {/* SUBMIT BUTTON */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Submit Bill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
