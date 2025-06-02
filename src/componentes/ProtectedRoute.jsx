import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const ProtectedRoute = ({ children }) => {
  const auth = getAuth();
  const user = auth.currentUser; // Aquí verificamos si hay un usuario autenticado

  if (!user) {
    return <Navigate to="/login" />; // Si no hay usuario autenticado, redirige a login
  }

  return children; // Si el usuario está autenticado, renderiza el contenido protegido
};

export default ProtectedRoute;
