import { useLocation } from "react-router-dom";
import { useState } from "react";
import { auth } from "./firebase";
import axios from "axios";

export default function AdminFormView() {

    const [showRemarkPopup, setShowRemarkPopup] = useState(false);
    const [remarkText, setRemarkText] = useState("");


    const location = useLocation();
    const prefillData = location.state?.prefillData || {};
    const [formData, setFormData] = useState(prefillData);
    const handleRemarkSubmit = async () => {
        if (!remarkText.trim()) {
            alert("Remark cannot be empty.");
            return;
        }

        try {
            const user = auth.currentUser;
            const token = await user.getIdToken();

            await axios.post(
                `http://127.0.0.1:8000/api/exam-bill/remark/${formData.id}/`,
                { remark: remarkText },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Remark saved successfully!");

            setFormData({ ...formData, remark: remarkText });
            setShowRemarkPopup(false);
            

        } catch (err) {
            console.error(err);
            alert("Failed to save remark");
        }
    };

    const handleUpdate = () => alert("Update clicked");
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this form?")) return;

        try {
            const user = auth.currentUser;
            const token = await user.getIdToken();

            await axios.delete(
                `http://127.0.0.1:8000/api/exam-bill/delete/${formData.id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Form deleted successfully!");
            window.location.href = "/admin"; // ✅ redirect back to admin panel

        } catch (error) {
            console.error("Delete Error:", error);
            alert("Failed to delete form.");
        }
    };




    return (
        <div className="bg-gray-100 p-6">
            <div className="bg-white shadow rounded-2xl p-8">
                <h1 className="text-center mb-6 text-xl font-bold">Admin View — University Bill</h1>

                <form className="space-y-8">
                    {/* HEADER */}
                    <section>
                        <h2 className="text-lg font-semibold mb-3">Header</h2>
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                name="cno"
                                placeholder="C. No."
                                value={formData.cno || ""}
                                onChange={(e) => setFormData({ ...formData, cno: e.target.value })}
                                className="border p-2 rounded"
                            />
                            <input
                                name="examinerId"
                                placeholder="Examiner ID No."
                                value={formData.examinerId || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, examinerId: e.target.value })
                                }
                                className="border p-2 rounded"
                            />

                            <input
                                name="examType"
                                placeholder="Exam (Annual/Semester)"
                                value={formData.examType || ""}
                                onChange={(e) => setFormData({ ...formData, examType: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <input
                                name="college"
                                placeholder="College / Faculty / Department"
                                value={formData.college || ""}
                                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <input
                                name="subject"
                                placeholder="Subject"
                                value={formData.subject || ""}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
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
                                    setFormData({ ...formData, examinerName: e.target.value })
                                }
                                className="border p-2 rounded w-full"
                            />

                            <input
                                name="examinerCode"
                                placeholder="Examiner Code"
                                value={formData.examinerCode || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, examinerCode: e.target.value })
                                }
                                className="border p-2 rounded"
                            />

                            <textarea
                                name="address"
                                placeholder="Residential Address"
                                value={formData.address || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, address: e.target.value })
                                }
                                className="border p-2 rounded col-span-2"
                            />

                            <input
                                name="phone"
                                type="number"
                                placeholder="Phone no."
                                value={formData.phone || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                }
                                className="border p-2 rounded"
                            />

                            <input
                                name="pan"
                                placeholder="PAN"
                                value={formData.pan || ""}
                                onChange={(e) => setFormData({ ...formData, pan: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <input
                                name="bankName"
                                placeholder="Bank Name"
                                value={formData.bankName || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, bankName: e.target.value })
                                }
                                className="border p-2 rounded"
                            />

                            <input
                                name="branch"
                                placeholder="Branch"
                                value={formData.branch || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, branch: e.target.value })
                                }
                                className="border p-2 rounded"
                            />

                            <input
                                name="ifsc"
                                placeholder="IFSC Code"
                                value={formData.ifsc || ""}
                                onChange={(e) => setFormData({ ...formData, ifsc: e.target.value })}
                                className="border p-2 rounded"
                            />

                            <input
                                name="accountNo"
                                placeholder="A/C No."
                                value={formData.accountNo || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, accountNo: e.target.value })
                                }
                                className="border p-2 rounded"
                            />

                            <input
                                name="micr"
                                placeholder="MICR Code"
                                value={formData.micr || ""}
                                onChange={(e) => setFormData({ ...formData, micr: e.target.value })}
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
                                value={formData.examinationName || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, examinationName: e.target.value })
                                }
                                className="border p-2 rounded"
                            />

                            <input
                                name="paperName"
                                placeholder="Paper (Name/Code)"
                                value={formData.paperName || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, paperName: e.target.value })
                                }
                                className="border p-2 rounded"
                            />

                            <input
                                name="papersSet"
                                type="number"
                                placeholder="No. of Papers Set"
                                value={formData.papersSet || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, papersSet: e.target.value })
                                }
                                className="border p-2 rounded"
                            />

                            <input
                                name="paperRate"
                                type="number"
                                placeholder="Rate per Paper (Rs)"
                                value={formData.paperRate || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, paperRate: e.target.value })
                                }
                                className="border p-2 rounded"
                            />

                            <input
                                name="durationHours"
                                type="number"
                                placeholder="Duration of Paper (Hours)"
                                value={formData.durationHours || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, durationHours: e.target.value })
                                }
                                className="border p-2 rounded"
                            />

                            <input
                                name="additionalExaminers"
                                type="number"
                                placeholder="No. of Additional Examiners (If any)"
                                value={formData.additionalExaminers || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, additionalExaminers: e.target.value })
                                }
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
                                    <label className="block text-sm">Examination held on (date)</label>
                                    <input
                                        type="date"
                                        name="practicalHeldOn"
                                        value={formData.practicalHeldOn || ""}
                                        onChange={(e) =>
                                            setFormData({ ...formData, practicalHeldOn: e.target.value })
                                        }
                                        className="border p-2 rounded w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm">Held at / In</label>
                                    <input
                                        type="text"
                                        name="practicalHeldAt"
                                        placeholder="Location / Lab"
                                        value={formData.practicalHeldAt || ""}
                                        onChange={(e) =>
                                            setFormData({ ...formData, practicalHeldAt: e.target.value })
                                        }
                                        className="border p-2 rounded w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm">Batch size</label>
                                    <input
                                        type="number"
                                        name="practicalBatchSize"
                                        value={formData.practicalBatchSize || ""}
                                        onChange={(e) =>
                                            setFormData({ ...formData, practicalBatchSize: e.target.value })
                                        }
                                        placeholder="Batch of ___ candidates"
                                        className="border p-2 rounded w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm">No. of Question Papers Set</label>
                                    <input
                                        type="number"
                                        name="practicalPapersSet"
                                        value={formData.practicalPapersSet || ""}
                                        onChange={(e) =>
                                            setFormData({ ...formData, practicalPapersSet: e.target.value })
                                        }
                                        className="border p-2 rounded w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm">No. of Practical Examiners</label>
                                    <input
                                        type="number"
                                        name="practicalNoOfExaminers"
                                        value={formData.practicalNoOfExaminers || ""}
                                        onChange={(e) =>
                                            setFormData({ ...formData, practicalNoOfExaminers: e.target.value })
                                        }
                                        className="border p-2 rounded w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm">Rate per Practical Examiner</label>
                                    <input
                                        type="number"
                                        name="practicalRatePerExaminer"
                                        value={formData.practicalRatePerExaminer || ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                practicalRatePerExaminer: e.target.value,
                                            })
                                        }
                                        className="border p-2 rounded w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm">No. of Valued Scripts</label>
                                    <input
                                        type="number"
                                        name="practicalNoOfValuedScripts"
                                        value={formData.practicalNoOfValuedScripts || ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                practicalNoOfValuedScripts: e.target.value,
                                            })
                                        }
                                        className="border p-2 rounded w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm">Rate per Valued Script</label>
                                    <input
                                        type="number"
                                        name="practicalRatePerValuedScript"
                                        value={formData.practicalRatePerValuedScript || ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                practicalRatePerValuedScript: e.target.value,
                                            })
                                        }
                                        className="border p-2 rounded w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm">
                                        Conduct Practical — No. of Candidates
                                    </label>
                                    <input
                                        type="number"
                                        name="practicalConductNoOfCandidates"
                                        value={formData.practicalConductNoOfCandidates || ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                practicalConductNoOfCandidates: e.target.value,
                                            })
                                        }
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
                                        value={formData.practicalConductRatePerCandidate || ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                practicalConductRatePerCandidate: e.target.value,
                                            })
                                        }
                                        className="border p-2 rounded w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm">
                                        Valuation / Project — No. of Dissertations
                                    </label>
                                    <input
                                        type="number"
                                        name="practicalValuationNoOfDissertations"
                                        value={formData.practicalValuationNoOfDissertations || ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                practicalValuationNoOfDissertations: e.target.value,
                                            })
                                        }
                                        className="border p-2 rounded w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm">Rate per Dissertation (Rs)</label>
                                    <input
                                        type="number"
                                        name="practicalValuationRatePerDissertation"
                                        value={formData.practicalValuationRatePerDissertation || ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                practicalValuationRatePerDissertation: e.target.value,
                                            })
                                        }
                                        className="border p-2 rounded w-full"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-sm">Remarks / Verified by</label>
                                    <input
                                        type="text"
                                        name="practicalRemarks"
                                        placeholder="Verified by / Remarks"
                                        value={formData.practicalRemarks || ""}
                                        onChange={(e) =>
                                            setFormData({ ...formData, practicalRemarks: e.target.value })
                                        }
                                        className="border p-2 rounded w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* PART B */}
                    <section>
                        <h2 className="text-lg font-semibold mb-3">PART B — Conveyance Charges</h2>

                        <div className="grid grid-cols-3 gap-3">
                            <input
                                type="date"
                                name="convDate"
                                value={formData.convDate || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, convDate: e.target.value })
                                }
                                className="border p-2 rounded"
                            />

                            <input
                                name="convFrom"
                                placeholder="From"
                                value={formData.convFrom || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, convFrom: e.target.value })
                                }
                                className="border p-2 rounded"
                            />

                            <input
                                name="convTo"
                                placeholder="To"
                                value={formData.convTo || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, convTo: e.target.value })
                                }
                                className="border p-2 rounded"
                            />

                            <input
                                name="convKms"
                                type="number"
                                placeholder="Distance (kms)"
                                value={formData.convKms || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, convKms: e.target.value })
                                }
                                className="border p-2 rounded"
                            />

                            <input
                                name="convVehicleNo"
                                placeholder="Vehicle No. (Scooter/Taxi)"
                                value={formData.convVehicleNo || ""}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        convVehicleNo: e.target.value,
                                    })
                                }
                                className="border p-2 rounded"
                            />

                            <input
                                name="convPurpose"
                                placeholder="Purpose of Journey"
                                value={formData.convPurpose || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, convPurpose: e.target.value })
                                }
                                className="border p-2 rounded"
                            />

                            <input
                                name="convAmount"
                                type="number"
                                placeholder="Amount (Rs)"
                                value={formData.convAmount || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, convAmount: e.target.value })
                                }
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
                            <input
                                type="date"
                                name="contDate"
                                value={formData.contDate || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, contDate: e.target.value })
                                }
                                className="border p-2 rounded"
                            />

                            <input
                                name="contDetails"
                                placeholder="Details of Expenditure"
                                value={formData.contDetails || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, contDetails: e.target.value })
                                }
                                className="border p-2 rounded col-span-2"
                            />

                            <input
                                name="contAmount"
                                type="number"
                                placeholder="Amount (Rs)"
                                value={formData.contAmount || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, contAmount: e.target.value })
                                }
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
                                value={formData.totalPartA || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, totalPartA: e.target.value })
                                }
                                className="border p-2 rounded"
                            />

                            <input
                                name="totalPartB"
                                type="number"
                                placeholder="Total Part B (Rs)"
                                value={formData.totalPartB || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, totalPartB: e.target.value })
                                }
                                className="border p-2 rounded"
                            />

                            <input
                                name="totalPartC"
                                type="number"
                                placeholder="Total Part C (Rs)"
                                value={formData.totalPartC || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, totalPartC: e.target.value })
                                }
                                className="border p-2 rounded"
                            />

                            <input
                                name="grandTotal"
                                type="number"
                                placeholder="Grand Total (A+B+C) (Rs)"
                                value={formData.grandTotal || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, grandTotal: e.target.value })
                                }
                                className="border p-2 rounded"
                            />

                            <input
                                name="grandTotalWords"
                                placeholder="Rupees (in words)"
                                value={formData.grandTotalWords || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, grandTotalWords: e.target.value })
                                }
                                className="border p-2 rounded col-span-2"
                            />
                        </div>
                    </section>

                    {showRemarkPopup && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-xl p-6 w-96 shadow-xl">

                                <h2 className="text-xl font-bold mb-3">Add Remark</h2>

                                <textarea
                                    placeholder="Write your remark here..."
                                    className="border rounded-lg w-full p-3 h-28"
                                    value={remarkText}
                                    onChange={(e) => setRemarkText(e.target.value)}
                                />

                                <div className="flex justify-end gap-3 mt-4">
                                    <button
                                        className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                                        onClick={() => setShowRemarkPopup(false)}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                        onClick={handleRemarkSubmit}
                                    >
                                        Save
                                    </button>
                                </div>

                            </div>
                        </div>
                    )}

                    {/* ✅ ADMIN ACTION BUTTONS */}
                    <div className="flex gap-4 justify-center mt-6">

                        <button
                            type="button"
                            onClick={() => setShowRemarkPopup(true)}
                            className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600"
                        >
                            Remark
                        </button>


                        <button
                            type="button"
                            onClick={handleUpdate}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                        >
                            Update
                        </button>

                        <button
                            type="button"
                            onClick={handleDelete}
                            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
