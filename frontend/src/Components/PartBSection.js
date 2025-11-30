import { FormInput, FormSection } from "./FormInput";

export function PartBSection({ formData, setFormData, readonly = false }) {
  return (
    <FormSection title="PART B — Conveyance Charges">
      <div className="grid grid-cols-3 gap-3">
        <FormInput
          type="date"
          name="convDate"
          value={formData.convDate}
          onChange={(e) => setFormData({ ...formData, convDate: e.target.value })}
          readOnly={readonly}
        />
        <FormInput
          name="convFrom"
          placeholder="From"
          value={formData.convFrom}
          onChange={(e) => setFormData({ ...formData, convFrom: e.target.value })}
          readOnly={readonly}
        />
        <FormInput
          name="convTo"
          placeholder="To"
          value={formData.convTo}
          onChange={(e) => setFormData({ ...formData, convTo: e.target.value })}
          readOnly={readonly}
        />
        <FormInput
          name="convKms"
          type="number"
          placeholder="Distance (kms)"
          value={formData.convKms}
          onChange={(e) => setFormData({ ...formData, convKms: e.target.value })}
          readOnly={readonly}
        />
        <FormInput
          name="convVehicleNo"
          placeholder="Vehicle No. (Scooter/Taxi)"
          value={formData.convVehicleNo}
          onChange={(e) => setFormData({ ...formData, convVehicleNo: e.target.value })}
          readOnly={readonly}
        />
        <FormInput
          name="convPurpose"
          placeholder="Purpose of Journey"
          value={formData.convPurpose}
          onChange={(e) => setFormData({ ...formData, convPurpose: e.target.value })}
          readOnly={readonly}
        />
        <FormInput
          name="convAmount"
          type="number"
          placeholder="Amount (Rs)"
          value={formData.convAmount}
          onChange={(e) => setFormData({ ...formData, convAmount: e.target.value })}
          readOnly={readonly}
          colSpan="col-span-3"
        />
      </div>
    </FormSection>
  );
}
