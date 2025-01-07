import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';  // Adjust the path as necessary

export const useLogout = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);  // Access dispatch function from context

  const logout = () => {
    // Remove authentication data from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');

    // Dispatch the LOGOUT action to clear the user from state
    dispatch({ type: 'LOGOUT' });

    // Redirect to the login page
    navigate('/');
  };

  return { logout };
};
