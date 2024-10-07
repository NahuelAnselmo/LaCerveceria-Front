import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../ui/Input/Input';
import SocialIcons from '../SocialIcons/SocialIcons';
import { useState } from 'react'; // Agregar useState
import { validateName, validateEmail, validatePassword } from './validators';
import './Register.css';
import logo from '../../assets/ImgIntegrantes/logo.png'; // Asegúrate de que la ruta sea correcta

const RegisterPage = () => {
  const {
    register,
    handleSubmit: onSubmitRHF,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
    criteriaMode: 'all',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [loading, setLoading] = useState(false); // Estado para manejar el loading
  const navigate = useNavigate();

  const handleSubmitForm = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    toast.loading('Cargando...');
    setLoading(true); // Activar loading
    try {
      const response = await fetch('http://localhost:3000/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Cuenta creada exitosamente');
        navigate('/login'); // Redirige al login después de registro exitoso
      } else {
        toast.error(result.message || 'Error al crear cuenta');
      }
    } catch (error) {
      toast.error('Error de conexión');
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
          <li>Al menos un carácter especial ($@$!%*?&)</li>
          <li>No debe contener espacios</li>
        </ul>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="register-page">
      <img src={logo} alt="Logo La Cervecería" className="register-logo" />
      <form onSubmit={onSubmitRHF(handleSubmitForm)} className="form-user-auth bg-black">
        <h1 className="color-red mt-3">Crear cuenta</h1>
        <div className="form-group">
          <Input
            name="username"
            type="text"
            label="Nombre"
            placeholder="Nombre"
            error={errors.username}
            register={register}
            options={{
              required: 'El nombre es obligatorio',
              validate: validateName,
            }}
          />
          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="Email"
            error={errors.email}
            register={register}
            options={{
              required: 'El mail es obligatorio',
              validate: validateEmail,
            }}
          />
          <div className="password-container">
            <OverlayTrigger
              trigger="click"
              placement="top"
              overlay={passwordPopover}
            >
              <span className="d-inline-block">
                <Input
                  name="password"
                  type="password"
                  label="Contraseña"
                  placeholder="Contraseña"
                  error={errors.password}
                  register={register}
                  options={{
                    required: 'La contraseña es obligatoria',
                    validate: validatePassword,
                  }}
                />
              </span>
            </OverlayTrigger>
          </div>
          <div className="form-group">
            <Input
              name="confirmPassword"
              type="password"
              label="Confirmar Contraseña"
              placeholder="Confirmar Contraseña"
              error={errors.confirmPassword}
              register={register}
              options={{
                required: 'Debes confirmar tu contraseña',
                validate: (value) =>
                  value === watch('password') || 'Las contraseñas no coinciden',
              }}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-danger" disabled={loading}>
          {loading ? 'Creando...' : 'Crear cuenta'}
        </button>
        <SocialIcons />
      </form>
      <p className="login-link">
        ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
