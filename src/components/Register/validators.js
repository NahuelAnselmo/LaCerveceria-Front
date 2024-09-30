export const validateName = (value) => {
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
  
    if (value.trim().length < 3) {
      return "El nombre debe tener al menos 3 caracteres";
    }

    if (value.trim().length > 30) {
      return "El nombre debe tener como mucho 30 caracteres";
    }
  
    if (!regex.test(value)) {
      return "El nombre contiene caracteres no válidos";
    }
  
    return true;
  };
  
  export const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (value.trim() === "") {
      return "El email es requerido";
    }
  
    if (!regex.test(value)) {
      return "Por favor, ingrese un email válido";
    }
  
    return true;
  };
  
  export const validatePassword = (value) => {
    if (value.trim() === "") {
      return "El campo 'password' es requerido";
    }
  
    if (value.trim().length < 8) {
      return "La contraseña debe tener al menos 8 caracteres";
    }
  
    if (value.trim().length > 15) {
      return "La contraseña no puede tener más de 15 caracteres";
    }
  
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
    if (!regex.test(value)) {
      return "El campo 'password' debe tener una minúscula, una mayúscula, un dígito, y un caracter especial, entre 8 y 15 caracteres";
    }
  
    return true;
  };
  
  