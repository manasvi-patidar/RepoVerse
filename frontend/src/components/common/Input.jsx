function Input({
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  required = false,
}) {
  return (
    <div className="form-group">
      {/* Input Label */}
      <label className="form-label">
        {label}

        {/* Show * only when required */}
        {required && <span className="required-star">*</span>}
      </label>

      <input
        className="form-input"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
