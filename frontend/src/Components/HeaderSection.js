import { FormInput, FormTextarea, FormSection } from "./FormInput";

export function HeaderSection({ formData, setFormData, readonly = false }) {
  return (
    <FormSection title="Header">
      <div className="grid grid-cols-2 gap-3">
        <FormInput
          name="cno"
          placeholder="C. No."
          value={formData.cno}
          onChange={(e) => setFormData({ ...formData, cno: e.target.value })}
          readOnly={readonly}
        />
        <FormInput
          name="examinerId"
          placeholder="Examiner ID No."
          value={formData.examinerId}
          onChange={(e) => setFormData({ ...formData, examinerId: e.target.value })}
          readOnly={readonly}
        />
        <FormInput
          name="examType"
          placeholder="Exam (Annual/Semester)"
          value={formData.examType}
          onChange={(e) => setFormData({ ...formData, examType: e.target.value })}
          readOnly={readonly}
        />
        <FormInput
          name="college"
          placeholder="College / Faculty / Department"
          value={formData.college}
          onChange={(e) => setFormData({ ...formData, college: e.target.value })}
          readOnly={readonly}
        />
        <FormInput
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          readOnly={readonly}
          colSpan="col-span-2"
        />
      </div>
    </FormSection>
  );
}
