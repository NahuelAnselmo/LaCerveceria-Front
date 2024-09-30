import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <Outlet />  {/* Aquí se renderizan las páginas de login y register */}
    </div>
  );
};

export default AuthLayout;
