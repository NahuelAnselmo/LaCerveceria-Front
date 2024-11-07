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

      // Verificar si la respuesta fue exitosa
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error del servidor:", errorData.message);
        alert(errorData.message);
        setLoading(false);
        return;
      }

      const result = await response.json();

      // Verificar si el token existe en la respuesta
      const token = result?.data?.token || result?.token;

      if (!token || token === "undefined" || token === "null") {
        console.error("Token inválido:", token);
        alert("Error al iniciar sesión. Token inválido.");
        setLoading(false);
        return;
      }

      // Almacenar el token en localStorage
      localStorage.setItem('token', token);
      console.log("Token almacenado en localStorage:", token);

      // Redirigir al inicio y recargar la página para actualizar el header
      navigate('/');
      window.location.reload();
      
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
      <form id="login-form" onSubmit={handleSubmit(onSubmit)} className="form-user-auth bg-black">
  <h1 className="color-red mt-3">Iniciar Sesión</h1>
  <div className="login-form-group">
    <Input
      id="email-input"
      name="email"
      type="email"
      label="Correo Electrónico"
      placeholder="Correo Electrónico"
      error={errors.email}
      register={register}
      options={{ required: 'El correo es obligatorio' }}
    />
  </div>
  <div className="login-form-group">
    <Input
      id="password-input"
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
      <button onClick={() => navigate('/')} className="btn btn-warning">Volver al inicio</button>
    </div>
  );
};

export default LoginPage;