import { FormInput, FormSection } from "./FormInput";

export function PartCSection({ formData, setFormData }) {
  return (
    <FormSection title="PART C — Contingent Expenses">
      <div className="grid grid-cols-3 gap-3">
        <FormInput
          type="date"
          name="contDate"
          value={formData.contDate}
          onChange={(e) => setFormData({ ...formData, contDate: e.target.value })}
        />
        <FormInput
          name="contDetails"
          placeholder="Details of Expenditure"
          value={formData.contDetails}
          onChange={(e) => setFormData({ ...formData, contDetails: e.target.value })}
          colSpan="col-span-2"
        />
        <FormInput
          name="contAmount"
          type="number"
          placeholder="Amount (Rs)"
          value={formData.contAmount}
          onChange={(e) => setFormData({ ...formData, contAmount: e.target.value })}
          colSpan="col-span-3"
        />
      </div>
    </FormSection>
  );
}
