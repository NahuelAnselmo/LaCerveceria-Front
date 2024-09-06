import PropTypes from "prop-types";

const AdminInput = ({ label, name, type, value, onChange, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        className={error ? "input-error" : ""}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

AdminInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default AdminInput;