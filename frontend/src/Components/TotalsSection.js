import { FormInput, FormSection } from "./FormInput";

export function TotalsSection({ formData, setFormData }) {
  return (
    <FormSection title="Totals">
      <div className="grid grid-cols-2 gap-3 mb-4">
        <FormInput
          name="totalPartA"
          type="number"
          placeholder="Total Part A (Rs)"
          value={formData.totalPartA}
          onChange={(e) => setFormData({ ...formData, totalPartA: e.target.value })}
        />
        <FormInput
          name="totalPartB"
          type="number"
          placeholder="Total Part B (Rs)"
          value={formData.totalPartB}
          onChange={(e) => setFormData({ ...formData, totalPartB: e.target.value })}
        />
        <FormInput
          name="totalPartC"
          type="number"
          placeholder="Total Part C (Rs)"
          value={formData.totalPartC}
          onChange={(e) => setFormData({ ...formData, totalPartC: e.target.value })}
        />
        <FormInput
          name="grandTotal"
          type="number"
          placeholder="Grand Total (A+B+C) (Rs)"
          value={formData.grandTotal}
          onChange={(e) => setFormData({ ...formData, grandTotal: e.target.value })}
        />
        <FormInput
          name="grandTotalWords"
          placeholder="Rupees (in words)"
          value={formData.grandTotalWords}
          onChange={(e) => setFormData({ ...formData, grandTotalWords: e.target.value })}
          colSpan="col-span-2"
        />
      </div>
    </FormSection>
  );
}
