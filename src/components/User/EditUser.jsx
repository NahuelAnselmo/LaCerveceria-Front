import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import { useSession } from '../../constans/Stores/useSesion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { validateName, validateEmail, validatePassword } from '../Register/validators';
import './EditUser.css';

const EditUser = () => {
  const { user } = useSession();
  const {
    register,
    handleSubmit: onSubmitRHF,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (user?.id) {
      // Inicializar los valores del formulario con los datos del usuario actual
      setValue('username', user.username);
      setValue('email', user.email);
    }
  }, [user, setValue]);

  const handleSubmitForm = async (data) => {
    if (data.password && data.password !== data.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no coinciden. Por favor verifique.',
      });
      return;
    }

    Swal.fire({
      title: 'Actualizando datos...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const response = await fetch(`http://localhost:3000/api/v1/auth/edit/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Datos de usuario actualizados correctamente.',
        });
      } else {
        const result = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: result.message || 'Error al actualizar los datos.',
        });
      }
    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al actualizar los datos. Por favor, inténtalo nuevamente.',
      });
    }
  };

  return (
    <div className="edit-user-container-edituser">
      <form onSubmit={onSubmitRHF(handleSubmitForm)}>
        <h2>Editar Usuario</h2>
        <div className="form-group-edituser">
          <label htmlFor="username">Nombre de Usuario:</label>
          <input
            type="text"
            id="username"
            name="username"
            {...register('username', {
              required: 'El nombre de usuario es obligatorio',
              validate: validateName,
            })}
          />
          {errors.username && <span className="error-message-edituser">{errors.username.message}</span>}
        </div>
        <div className="form-group-edituser">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            {...register('email', {
              required: 'El correo electrónico es obligatorio',
              validate: validateEmail,
            })}
          />
          {errors.email && <span className="error-message-edituser">{errors.email.message}</span>}
        </div>
        <div className="password-group-edituser">
          <label htmlFor="password">Contraseña:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            {...register('password', {
              validate: validatePassword,
            })}
          />
          <button
            type="button"
            className="toggle-password-btn-edituser"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.password && <span className="error-message-edituser">{errors.password.message}</span>}
        </div>
        <div className="password-group-edituser">
          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            {...register('confirmPassword', {
              validate: (value) =>
                value === watch('password') || 'Las contraseñas no coinciden',
            })}
          />
          <button
            type="button"
            className="toggle-password-btn-edituser"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.confirmPassword && (
            <span className="error-message-edituser">{errors.confirmPassword.message}</span>
          )}
        </div>
        <button type="submit" className="btn-submit-edituser">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditUser;