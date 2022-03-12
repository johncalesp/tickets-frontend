import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/user_context';

const PrivateRoute = ({ children }) => {
  const { user } = useUserContext();
  return user ? children : <Navigate replace to="/" />;
};

export default PrivateRoute;
