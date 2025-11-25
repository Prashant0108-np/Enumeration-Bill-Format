import { FormInput, FormSection } from "./FormInput";

export function PartASection({ formData, setFormData, readonly = false }) {
  return (
    <FormSection title="PART A — Travelling Allowance">
      <div className="grid grid-cols-3 gap-3">
        <FormInput
          name="taDate"
          type="date"
          value={formData.taDate}
          onChange={(e) => setFormData({ ...formData, taDate: e.target.value })}
          readOnly={readonly}
        />
        <FormInput
          name="taFrom"
          placeholder="From"
          value={formData.taFrom}
          onChange={(e) => setFormData({ ...formData, taFrom: e.target.value })}
          readOnly={readonly}
        />
        <FormInput
          name="taTo"
          placeholder="To"
          value={formData.taTo}
          onChange={(e) => setFormData({ ...formData, taTo: e.target.value })}
          readOnly={readonly}
        />
        <FormInput
          name="taKms"
          type="number"
          placeholder="Distance (kms)"
          value={formData.taKms}
          onChange={(e) => setFormData({ ...formData, taKms: e.target.value })}
          readOnly={readonly}
        />
        <FormInput
          name="taVehicleNo"
          placeholder="Vehicle No."
          value={formData.taVehicleNo}
          onChange={(e) => setFormData({ ...formData, taVehicleNo: e.target.value })}
          readOnly={readonly}
        />
        <FormInput
          name="taPurpose"
          placeholder="Purpose"
          value={formData.taPurpose}
          onChange={(e) => setFormData({ ...formData, taPurpose: e.target.value })}
          readOnly={readonly}
        />
        <FormInput
          name="taAmount"
          type="number"
          placeholder="Amount (Rs)"
          value={formData.taAmount}
          onChange={(e) => setFormData({ ...formData, taAmount: e.target.value })}
          readOnly={readonly}
          colSpan="col-span-3"
        />
      </div>
    </FormSection>
  );
}
                    