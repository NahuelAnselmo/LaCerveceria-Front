import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Input from '../ui/Input/Input'; // Componente Input personalizado
import './Login.css';
import logo from '../../assets/ImgIntegrantes/logo.png';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Guarda el token y redirige
        localStorage.setItem('token', result.token);
        navigate('/dashboard'); // Redirige al dashboard
      } else {
        console.error(result.message);
        alert(result.message); // Muestra el error
      }
    } catch (error) {
      console.error('Error en el servidor:', error);
      alert('Error en el servidor');
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <img src={logo} alt="La Cervecería" className="login-logo" />
      <form onSubmit={handleSubmit(onSubmit)} className="form-user-auth bg-black">
        <h1 className="color-red mt-3">Iniciar Sesión</h1>
        <div className="form-group">
          <Input
            name="email"
            type="email"
            label="Correo Electrónico"
            placeholder="Correo Electrónico"
            error={errors.email}
            register={register}
            options={{ required: 'El correo es obligatorio' }}
          />
        </div>
        <div className="form-group">
          <Input
            name="password"
            type="password"
            label="Contraseña"
            placeholder="Contraseña"
            error={errors.password}
            register={register}
            options={{ required: 'La contraseña es obligatoria' }}
          />
        </div>
        <button type="submit" className="btn btn-danger" disabled={loading}>
          {loading ? 'Cargando...' : 'Ingresar'}
        </button>
        <div className="register-link">
          <p>¿No tienes cuenta? <a href="/register">Regístrate aquí</a></p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
