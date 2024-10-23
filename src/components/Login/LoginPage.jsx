import React, { useState, useEffect } from 'react';
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
      const response = await fetch('http://localhost:3000/api/v1/auth/login', {
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
        // Guarda el token y redirige al inicio
        localStorage.setItem('token', result.token);
        navigate('/'); // Redirige al inicio
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

  // Utiliza el token para acceder a rutas protegidas
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3000/api/v1/some-protected-route', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Incluye el token en los headers
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Datos protegidos:', data);
      })
      .catch((error) => {
        console.error('Error en la ruta protegida:', error);
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Borra el token del almacenamiento local
    navigate('/login'); // Redirige al login
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
      {/* Botón para volver al inicio */}
      <button onClick={() => navigate('/')} className="btn btn-primary">Volver al inicio</button>
    </div>
  );
};

export default LoginPage;
