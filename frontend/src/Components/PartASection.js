import { FormInput, FormSection, FormSubSection } from "./FormInput";

export function PartASection({ formData, setFormData, readonly = false }) {
  return (
    <FormSection title="PART A — Examination & Practical Details">
      <FormSubSection title="Examination Details">
        <div className="grid grid-cols-3 gap-3">
          <FormInput
            name="examinationName"
            placeholder="Examination Name"
            value={formData.examinationName}
            onChange={(e) => setFormData({ ...formData, examinationName: e.target.value })}
            readOnly={readonly}
          />
          <FormInput
            name="paperName"
            placeholder="Paper Name"
            value={formData.paperName}
            onChange={(e) => setFormData({ ...formData, paperName: e.target.value })}
            readOnly={readonly}
          />
          <FormInput
            name="papersSet"
            type="number"
            placeholder="Papers Set"
            value={formData.papersSet}
            onChange={(e) => setFormData({ ...formData, papersSet: e.target.value })}
            readOnly={readonly}
          />
          <FormInput
            name="paperRate"
            type="number"
            placeholder="Paper Rate (Rs)"
            value={formData.paperRate}
            onChange={(e) => setFormData({ ...formData, paperRate: e.target.value })}
            readOnly={readonly}
          />
          <FormInput
            name="durationHours"
            type="number"
            placeholder="Duration (hours)"
            value={formData.durationHours}
            onChange={(e) => setFormData({ ...formData, durationHours: e.target.value })}
            readOnly={readonly}
          />
          <FormInput
            name="additionalExaminers"
            type="number"
            placeholder="Additional Examiners"
            value={formData.additionalExaminers}
            onChange={(e) => setFormData({ ...formData, additionalExaminers: e.target.value })}
            readOnly={readonly}
          />
        </div>
      </FormSubSection>

      <FormSubSection title="Practical Examination">
        <div className="grid grid-cols-3 gap-3">
          <FormInput
            name="practicalHeldOn"
            type="date"
            placeholder="Held On"
            value={formData.practicalHeldOn}
            onChange={(e) => setFormData({ ...formData, practicalHeldOn: e.target.value })}
            readOnly={readonly}
          />
          <FormInput
            name="practicalHeldAt"
            placeholder="Held At"
            value={formData.practicalHeldAt}
            onChange={(e) => setFormData({ ...formData, practicalHeldAt: e.target.value })}
            readOnly={readonly}
          />
          <FormInput
            name="practicalBatchSize"
            type="number"
            placeholder="Batch Size"
            value={formData.practicalBatchSize}
            onChange={(e) => setFormData({ ...formData, practicalBatchSize: e.target.value })}
            readOnly={readonly}
          />
          <FormInput
            name="practicalPapersSet"
            type="number"
            placeholder="Papers Set"
            value={formData.practicalPapersSet}
            onChange={(e) => setFormData({ ...formData, practicalPapersSet: e.target.value })}
            readOnly={readonly}
          />
          <FormInput
            name="practicalNoOfValuedScripts"
            type="number"
            placeholder="No. of Valued Scripts"
            value={formData.practicalNoOfValuedScripts}
            onChange={(e) => setFormData({ ...formData, practicalNoOfValuedScripts: e.target.value })}
            readOnly={readonly}
          />
          <FormInput
            name="practicalRatePerValuedScript"
            type="number"
            placeholder="Rate/Valued Script (Rs)"
            value={formData.practicalRatePerValuedScript}
            onChange={(e) => setFormData({ ...formData, practicalRatePerValuedScript: e.target.value })}
            readOnly={readonly}
          />
          <FormInput
            name="practicalConductNoOfCandidates"
            type="number"
            placeholder="Conduct — No. of Candidates"
            value={formData.practicalConductNoOfCandidates}
            onChange={(e) => setFormData({ ...formData, practicalConductNoOfCandidates: e.target.value })}
            readOnly={readonly}
          />
          <FormInput
            name="practicalConductRatePerCandidate"
            type="number"
            placeholder="Conduct — Rate/Candidate (Rs)"
            value={formData.practicalConductRatePerCandidate}
            onChange={(e) => setFormData({ ...formData, practicalConductRatePerCandidate: e.target.value })}
            readOnly={readonly}
          />
          <FormInput
            name="practicalValuationRatePerDissertation"
            type="number"
            placeholder="Valuation — Rate/Dissertation (Rs)"
            value={formData.practicalValuationRatePerDissertation}
            onChange={(e) => setFormData({ ...formData, practicalValuationRatePerDissertation: e.target.value })}
            readOnly={readonly}
          />
        </div>
      </FormSubSection>
    </FormSection>
  );
}
                    