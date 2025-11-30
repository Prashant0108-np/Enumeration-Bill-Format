import React from "react";
import { HeaderSection } from "./HeaderSection";
import { ExaminerDetailsSection } from "./ExaminerDetailsSection";
import { PartASection } from "./PartASection";
import { PartBSection } from "./PartBSection";
import { PartCSection } from "./PartCSection";
import { TotalsSection } from "./TotalsSection";

export default function SharedForm({ title = "University Bill", formData, setFormData, onSubmit, actions, readonly = false }) {
  return (
    <div className="bg-gray-100 p-6">
      <div className="bg-white shadow rounded-2xl p-8">
        <h1 className="text-center mb-6 text-xl font-bold">{title}</h1>

        <form onSubmit={onSubmit} className="space-y-8">
          <HeaderSection formData={formData} setFormData={setFormData} readonly={readonly} />
          <ExaminerDetailsSection formData={formData} setFormData={setFormData} readonly={readonly} />
          <PartASection formData={formData} setFormData={setFormData} readonly={readonly} />
          <PartBSection formData={formData} setFormData={setFormData} readonly={readonly} />
          <PartCSection formData={formData} setFormData={setFormData} readonly={readonly} />
          <TotalsSection formData={formData} setFormData={setFormData} readonly={readonly} />

          {/* Actions slot - render submit/update/delete/remark buttons */}
          <div>{actions}</div>
        </form>
      </div>
    </div>
  );
}
