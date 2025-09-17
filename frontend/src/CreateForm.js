
// code by Harsh
// import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
import { useState,useEffect } from "react";
import axios from 'axios'

//connection with backend is completed
export default function ExamBillForm() {
  const [formData, setFormData] = useState({});
  const [message , setMessage] = useState('');

  // handle input changes
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted formData:", formData);
    alert("Form submitted — updating Excel…");
    // handleOverwrite();
  };


  //experiments with the api calls 
  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/api/hello')
    .then( response =>{
      setMessage(response.data.message)
    })
  },[])

  
  
// NOT WORKING 
  // // overwrite Excel using form data
  // const handleOverwrite = async () => {
  //   // 1. Fetch Excel from public
  //   const response = await fetch("/Enumeration_Bill_Format.xlsx");
  //   const arrayBuffer = await response.arrayBuffer();

  //   // 2. Read workbook
  //   const workbook = XLSX.read(arrayBuffer, { type: "array" });

  //   // 3. First sheet
  //   const sheetName = workbook.SheetNames[0];
  //   const worksheet = workbook.Sheets[sheetName];

  //   // 4. Convert sheet to rows
  //   const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  //   // 🔹 Example: Put form data into Excel
  //   // Say, we map "name" → A2, "roll" → B2
  //   rows[5][10] = formData.name || "Default Name";
  //   // rows[1][1] = formData.roll || "Default Roll";

  //   // 5. Convert back
  //   const newWorksheet = XLSX.utils.aoa_to_sheet(rows);
  //   workbook.Sheets[sheetName] = newWorksheet;

  //   // 6. Save updated file
  //   const newExcel = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  //   saveAs(new Blob([newExcel], { type: "application/octet-stream" }), "updated.xlsx");
  // };

  


  return (
    <div className="bg-gray-100 p-6">
      <div className=" bg-white shadow rounded-2xl p-8">
        <h1 className="	 text-center mb-6">
          Api response : {message}
        </h1> 

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Header & Examiner */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Header</h2>
            <div className="grid grid-cols-2 gap-3">
              <input name="cno" onChange={handleChange} placeholder="C. No." className="border p-2 rounded" />
              <input name="examinerId" onChange={handleChange} placeholder="Examiner ID No." className="border p-2 rounded" />
              <input name="examType" onChange={handleChange} placeholder="Exam (Annual/Semester)" className="border p-2 rounded" />
              <input name="college" onChange={handleChange} placeholder="College / Faculty / Department" className="border p-2 rounded" />
              <input name="subject" onChange={handleChange} placeholder="Subject" className="border p-2 rounded col-span-2" />
            </div>
          </section>
          {/* Examination Details */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Examiner Details</h2>
            <div className="grid grid-cols-2 gap-3">
              <input name="examinerName" onChange={handleChange} placeholder="Name of Examiner " className="border p-2 rounded" />
              <input name="examinerCode" onChange={handleChange} placeholder="Examiner Code" className="border p-2 rounded" />
              <textarea name="address" onChange={handleChange} placeholder="Residential Address" className="border p-2 rounded col-span-2" />
              <input name="phone" onChange={handleChange} type="number" placeholder="Phone no." className="border p-2 rounded" />
              <input name="pan" onChange={handleChange} placeholder="PAN" className="border p-2 rounded" />
              <input name="bankName" onChange={handleChange} placeholder="Bank Name" className="border p-2 rounded" />
              <input name="branch" onChange={handleChange} placeholder="Branch" className="border p-2 rounded" />
              <input name="ifsc" onChange={handleChange} placeholder="IFSC Code" className="border p-2 rounded" />
              <input name="accountNo" onChange={handleChange} placeholder="A/C No." className="border p-2 rounded" />
              <input name="micr" onChange={handleChange} placeholder="MICR Code" className="border p-2 rounded" />
            </div>
          </section>

          {/* Part A - Papers & Valuation */}
          <section>
            <h2 className="text-lg font-semibold mb-3">PART A — Setting of Question Paper / Valuation</h2>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <input name="examinationName" onChange={handleChange} placeholder="Examination Name" className="border p-2 rounded" />
              <input name="paperName" onChange={handleChange} placeholder="Paper (Name/Code)" className="border p-2 rounded" />
              <input name="papersSet" type="number" onChange={handleChange} placeholder="No. of Papers Set" className="border p-2 rounded" />
              <input name="paperRate" type="number" onChange={handleChange} placeholder="Rate per Paper (Rs)" className="border p-2 rounded" />
              <input name="durationHours" type="number" onChange={handleChange} placeholder="Duration of Paper (Hours)" className="border p-2 rounded" />
              <input name="additionalExaminers" type="number" onChange={handleChange} placeholder="No. of Additional Examiners (If any)" className="border p-2 rounded" />
            </div>

            {/* Practical Examination subsection */}
            <div className="border-t pt-4">
              <h3 className="text-md font-semibold mb-3">Practical Examination (ONLY)</h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm">Examination held on (date)</label>
                  <input type="date" name="practicalHeldOn" onChange={handleChange} className="border p-2 rounded w-full" />
                </div>

                <div>
                  <label className="block text-sm">Held at / In</label>
                  <input type="text" name="practicalHeldAt" onChange={handleChange} placeholder="Location / Lab" className="border p-2 rounded w-full" />
                </div>

                <div>
                  <label className="block text-sm">Batch size (candidates per batch)</label>
                  <input type="number" name="practicalBatchSize" onChange={handleChange} placeholder="Batch of ___ candidates" className="border p-2 rounded w-full" />
                </div>

                <div>
                  <label className="block text-sm">No. of Question Papers Set (Practical)</label>
                  <input type="number" name="practicalPapersSet" onChange={handleChange} className="border p-2 rounded w-full" />
                </div>

                <div>
                  <label className="block text-sm">No. of Practical Examiners</label>
                  <input type="number" name="practicalNoOfExaminers" onChange={handleChange} className="border p-2 rounded w-full" />
                </div>

                <div>
                  <label className="block text-sm">Rate per Practical Examiner (Rs)</label>
                  <input type="number" name="practicalRatePerExaminer" onChange={handleChange} className="border p-2 rounded w-full" />
                </div>

                <div>
                  <label className="block text-sm">No. of Valued Scripts (Practical)</label>
                  <input type="number" name="practicalNoOfValuedScripts" onChange={handleChange} className="border p-2 rounded w-full" />
                </div>

                <div>
                  <label className="block text-sm">Rate per Valued Script (Rs)</label>
                  <input type="number" name="practicalRatePerValuedScript" onChange={handleChange} className="border p-2 rounded w-full" />
                </div>

                <div>
                  <label className="block text-sm">Conduct of Practical / Oral Examination — No. of Candidates</label>
                  <input type="number" name="practicalConductNoOfCandidates" onChange={handleChange} className="border p-2 rounded w-full" />
                </div>

                <div>
                  <label className="block text-sm">Conduct Rate per Candidate (Rs)</label>
                  <input type="number" name="practicalConductRatePerCandidate" onChange={handleChange} className="border p-2 rounded w-full" />
                </div>

                <div>
                  <label className="block text-sm">Valuation / Project Report / Dissertation — No. of Dissertations</label>
                  <input type="number" name="practicalValuationNoOfDissertations" onChange={handleChange} className="border p-2 rounded w-full" />
                </div>

                <div>
                  <label className="block text-sm">Rate per Dissertation (Rs)</label>
                  <input type="number" name="practicalValuationRatePerDissertation" onChange={handleChange} className="border p-2 rounded w-full" />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm">Any Remarks / Verified by</label>
                  <input type="text" name="practicalRemarks" onChange={handleChange} placeholder="Verified by / Remarks" className="border p-2 rounded w-full" />
                </div>
              </div>
            </div>
          </section>

          {/* Part B - Conveyance */}
          <section>
            <h2 className="text-lg font-semibold mb-3">PART B — Conveyance Charges</h2>
            <div className="grid grid-cols-3 gap-3">
              <input type="date" name="convDate" onChange={handleChange} className="border p-2 rounded" />
              <input name="convFrom" onChange={handleChange} placeholder="From" className="border p-2 rounded" />
              <input name="convTo" onChange={handleChange} placeholder="To" className="border p-2 rounded" />
              <input name="convKms" type="number" onChange={handleChange} placeholder="Distance (kms)" className="border p-2 rounded" />
              <input name="convVehicleNo" onChange={handleChange} placeholder="Vehicle No. (Scooter/Taxi)" className="border p-2 rounded" />
              <input name="convPurpose" onChange={handleChange} placeholder="Purpose of Journey" className="border p-2 rounded" />
              <input name="convAmount" type="number" onChange={handleChange} placeholder="Amount (Rs)" className="border p-2 rounded col-span-3" />
            </div>
          </section>

          {/* Part C - Contingent Expenses */}
          <section>
            <h2 className="text-lg font-semibold mb-3">PART C — Contingent Expenses</h2>
            <div className="grid grid-cols-3 gap-3">
              <input type="date" name="contDate" onChange={handleChange} className="border p-2 rounded" />
              <input name="contDetails" onChange={handleChange} placeholder="Details of Expenditure" className="border p-2 rounded col-span-2" />
              <input name="contAmount" type="number" onChange={handleChange} placeholder="Amount (Rs)" className="border p-2 rounded col-span-3" />
            </div>
          </section>

          {/* Totals */}
          <section>
            <h2 className="text-lg font-semibold mb-3">Totals</h2>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <input name="totalPartA" type="number" onChange={handleChange} placeholder="Total Part A (Rs)" className="border p-2 rounded" />
              <input name="totalPartB" type="number" onChange={handleChange} placeholder="Total Part B (Rs)" className="border p-2 rounded" />
              <input name="totalPartC" type="number" onChange={handleChange} placeholder="Total Part C (Rs)" className="border p-2 rounded" />
              <input name="grandTotal" type="number" onChange={handleChange} placeholder="Grand Total (A+B+C) (Rs)" className="border p-2 rounded" />
              <input name="grandTotalWords" onChange={handleChange} placeholder="Rupees (in words)" className="border p-2 rounded col-span-2" />
            </div>

            
          </section>

          <div className="text-center">
            <button type="submit" className="bg-blue-600 text-white  px-6 py-2 rounded-lg">
              Submit Bill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
	