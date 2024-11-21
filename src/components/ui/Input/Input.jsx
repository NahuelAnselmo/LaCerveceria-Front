import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const Input = (props) => {
  const {
    name,
    type = "text",
    label,
    error,
    className = "",
    register,
    options,
    placeholder = "Ingrese un texto",
    textarea = false,
    maxLength,
    onChange,
    resetCount,
  } = props;

  const [internalCharCount, setInternalCharCount] = useState(0);

  const handleChange = (e) => {
    const value = e.target.value;
    setInternalCharCount(value.length);
    if (onChange) {
      onChange(e);
    }
  };

  useEffect(() => {
    if (textarea) {
      setInternalCharCount(
        document.getElementById(`${name}-input`)?.value.length || 0
      );
    }
  }, [name, textarea]);

  useEffect(() => {
    if (resetCount) {
      setInternalCharCount(0);
    }
  }, [resetCount]);

  if (textarea) {
    return (
      <fieldset className={`form-group`}>
       
        <textarea
          className={`${error ? "form-style-error textarea-contacto" : "form-style pb-2 textarea-contacto"}`}
          id={`${name}-input`}
          type={type}
          {...register(name, options)}
          placeholder={placeholder}
          icon={"bi bi-text-left"}
          maxLength={maxLength}
          onChange={handleChange}
        />
        {error ? (
      <i className={`input-icon-error bi bi-exclamation-diamond-fill `}></i>
) : (
   <i className={`input-icon bi bi-text-left`}></i>
)}
      </fieldset>
    );
  }

  return (
    <fieldset className={`form-floating ${className}`}>
      <input
        className={`form-control ${error ? "is-invalid" : ""}`}
        id={`${name}-input`}
        type={type}
        {...register(name, options)}
        placeholder={placeholder}
      />
      <label htmlFor={`${name}-input`}>{label}</label>
      <div className="invalid-feedback">{error?.message}</div>
    </fieldset>
  );
};

export default Input;

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  className: PropTypes.string,
  register: PropTypes.func.isRequired,
  options: PropTypes.object,
  placeholder: PropTypes.string,
  textarea: PropTypes.bool,
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
  resetCount: PropTypes.bool,
};