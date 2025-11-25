// Reusable form input component
export function FormInput({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  colSpan = "col-span-1",
}) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value || ""}
      onChange={onChange}
      className={`border p-2 rounded ${className} ${colSpan}`}
    />
  );
}

// Reusable textarea component
export function FormTextarea({
  name,
  placeholder,
  value,
  onChange,
  className = "",
  colSpan = "col-span-1",
}) {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value || ""}
      onChange={onChange}
      className={`border p-2 rounded ${className} ${colSpan}`}
    />
  );
}

// Reusable form section wrapper
export function FormSection({ title, children }) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      {children}
    </section>
  );
}

// Reusable subsection wrapper
export function FormSubSection({ title, children }) {
  return (
    <div className="border-t pt-4">
      <h3 className="text-md font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}
