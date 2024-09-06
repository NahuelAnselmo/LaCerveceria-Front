import PropTypes from "prop-types";

// const getRandomChar = () => {
//   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   return chars.charAt(Math.floor(Math.random() * chars.length));
// };
const InputLR = (props) => {
  const { name, type = "text", error, register, options, placeholder = "Ingrese un texto", icon } = props;
  // const randomChar = getRandomChar();
  return (
    <div className="form-group">
      <input
        className={` ${error ? "form-style-error" : "form-style pb-2"}`}
        // id={`${name}-${randomChar}-input`}
        type={type}
        placeholder={placeholder}
        {...register(name, options)} 
       />
     {error ? (
      <i className={`input-icon-error bi bi-exclamation-diamond-fill `}></i>
) : (
  icon && <i className={`input-icon ${icon}`}></i>
)}
  {error ? ( <p className="text-white text-start">{error?.message} </p> ) : ( <p></p>)}
        </div>
  );
};

export default InputLR;

InputLR.propTypes = {
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
  icon: PropTypes.string,
};