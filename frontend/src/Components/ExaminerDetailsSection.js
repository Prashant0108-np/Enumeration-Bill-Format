import { FormInput, FormTextarea, FormSection } from "./FormInput";

export function ExaminerDetailsSection({ formData, setFormData }) {
  return (
    <FormSection title="Examiner Details">
      <div className="grid grid-cols-2 gap-3">
        <FormInput
          name="examinerName"
          placeholder="Examiner Name"
          value={formData.examinerName}
          onChange={(e) => setFormData({ ...formData, examinerName: e.target.value })}
        />
        <FormInput
          name="examinerCode"
          placeholder="Examiner Code"
          value={formData.examinerCode}
          onChange={(e) => setFormData({ ...formData, examinerCode: e.target.value })}
        />
        <FormTextarea
          name="address"
          placeholder="Residential Address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          colSpan="col-span-2"
        />
        <FormInput
          name="phone"
          type="number"
          placeholder="Phone no."
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <FormInput
          name="pan"
          placeholder="PAN"
          value={formData.pan}
          onChange={(e) => setFormData({ ...formData, pan: e.target.value })}
        />
        <FormInput
          name="bankName"
          placeholder="Bank Name"
          value={formData.bankName}
          onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
        />
        <FormInput
          name="branch"
          placeholder="Branch"
          value={formData.branch}
          onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
        />
        <FormInput
          name="ifsc"
          placeholder="IFSC Code"
          value={formData.ifsc}
          onChange={(e) => setFormData({ ...formData, ifsc: e.target.value })}
        />
        <FormInput
          name="accountNo"
          placeholder="A/C No."
          value={formData.accountNo}
          onChange={(e) => setFormData({ ...formData, accountNo: e.target.value })}
        />
        <FormInput
          name="micr"
          placeholder="MICR Code"
          value={formData.micr}
          onChange={(e) => setFormData({ ...formData, micr: e.target.value })}
        />
      </div>
    </FormSection>
  );
}
