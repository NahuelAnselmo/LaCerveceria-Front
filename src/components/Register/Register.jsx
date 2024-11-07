import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import Input from "../ui/Input/Input";
import SocialIcons from "../SocialIcons/SocialIcons";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importar iconos de visibilidad
import { validateName, validateEmail, validatePassword } from "./validators";
import "./Register.css";
import logo from "../../assets/ImgIntegrantes/logo.png"; // Asegúrate de que la ruta sea correcta

const RegisterPage = () => {
  const {
    register,
    handleSubmit: onSubmitRHF,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onSubmit",
    criteriaMode: "all",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [loading, setLoading] = useState(false); // Estado para manejar el loading
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para mostrar/ocultar confirmar contraseña

  const navigate = useNavigate();

  const handleSubmitForm = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    toast.loading("Cargando...");
    setLoading(true); // Activar loading
    try {
      console.log("➡️ Enviando datos de registro:", data);
      const response = await fetch(
        "http://localhost:3000/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: data.username,
            email: data.email,
            password: data.password,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("Cuenta creada exitosamente");
        navigate("/login"); // Redirige al login después de registro exitoso
      } else {
        console.error("❌ Error en la respuesta:", result);
        toast.error(result.message || "Error al crear cuenta");
      }
    } catch (error) {
      console.error("❌ Error en la conexión:", error);
      toast.error("Error de conexión");
    } finally {
      setLoading(false); // Desactivar loading
      toast.dismiss(); // Detener el loading toast
    }
  };

  const passwordPopover = (
    <Popover id="password-popover">
      <Popover.Body>
        La contraseña debe cumplir con los siguientes requisitos:
        <ul>
          <li>Entre 8 y 15 caracteres</li>
          <li>Al menos una letra minúscula</li>
          <li>Al menos una letra mayúscula</li>
          <li>Al menos un número</li>
          <li>No debe contener espacios</li>
        </ul>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="register-page">
      <img src={logo} alt="Logo La Cervecería" className="register-logo" />
      <form
        onSubmit={onSubmitRHF(handleSubmitForm)}
        className="register-form-user-auth"
      >
        <h1 className="color-red mt-3">Crear cuenta</h1>
        <div className="register-form-group">
          <Input
            name="username"
            type="text"
            label="Nombre"
            placeholder="Nombre"
            error={errors.username}
            register={register}
            options={{
              required: "El nombre es obligatorio",
              validate: validateName,
            }}
            className="register-form-control"
          />
          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="Email"
            error={errors.email}
            register={register}
            options={{
              required: "El mail es obligatorio",
              validate: validateEmail,
            }}
            className="register-form-control"
          />
          <div className="register-password-container">
            <OverlayTrigger
              trigger="click"
              placement="top"
              overlay={passwordPopover}
            >
              <span className="d-inline-block">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  label="Contraseña"
                  placeholder="Contraseña"
                  error={errors.password}
                  register={register}
                  options={{
                    required: "La contraseña es obligatoria",
                    minLength: {
                      value: 8,
                      message: "La contraseña debe tener al menos 8 caracteres",
                    },
                    validate: (value) =>
                      /^(?=.*[A-Z])(?=.*\d{2,}).{8,}$/.test(value) ||
                      "La contraseña debe tener al menos una mayúscula y dos dígitos",
                  }}
                  className="register-form-control password-input"
                />
              </span>
            </OverlayTrigger>
            <span
              className="register-eye-icon"
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="register-form-group">
            <div className="register-password-container">
              <Input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                label="Confirmar Contraseña"
                placeholder="Confirmar Contraseña"
                error={errors.confirmPassword}
                register={register}
                options={{
                  required: "Debes confirmar tu contraseña",
                  validate: (value) =>
                    value === watch("password") ||
                    "Las contraseñas no coinciden",
                }}
                className="register-form-control password-input"
              />
              <span
                className="register-eye-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ cursor: "pointer" }}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
        </div>
        <button type="submit" className="register-submit-btn" disabled={loading}>
          {loading ? "Creando..." : "Crear cuenta"}
        </button>
        <SocialIcons />
      </form>
      <p className="login-link">
        ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
      </p>

      {/* Botón para volver al inicio */}
      <button onClick={() => navigate("/")} className="btn btn-warning">
        Volver al inicio
      </button>
    </div>
  );
};

export default RegisterPage;
