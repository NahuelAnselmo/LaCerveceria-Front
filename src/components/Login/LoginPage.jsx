import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Input from '../ui/Input/Input'; 
import './Login.css';
import logo from '../../assets/Fondos/logo.png';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; 

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });


      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error del servidor:", errorData.message);
        alert(errorData.message);
        setLoading(false);
        return;
      }

      const result = await response.json();

      
      const token = result?.data?.token || result?.token;

      if (!token || token === "undefined" || token === "null") {
        console.error("Token inválido:", token);
        alert("Error al iniciar sesión. Token inválido.");
        setLoading(false);
        return;
      }

      
      localStorage.setItem('token', token);
      console.log("Token almacenado en localStorage:", token);

      
      navigate('/');
      window.location.reload();
      
    } catch (error) {
      console.error('Error en el servidor:', error);
      alert('Error en el servidor');
    }
    setLoading(false);
  };


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${BACKEND_URL}/api/v1/some-protected-route`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, 
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
    localStorage.removeItem('token'); 
    navigate('/login'); 
    window.location.reload(); 
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
    <p className='text-white'>¿No tienes cuenta? <a href="/register">Regístrate aquí</a></p>
  </div>
</form>
 

      <button onClick={() => navigate('/')} className="btn btn-warning">Volver al inicio</button>
    </div>
  );
};

export default LoginPage;