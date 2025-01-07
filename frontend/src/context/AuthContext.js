import { createContext, useReducer } from 'react';

// Create context
export const AuthContext = createContext();

// Reducer function to handle state changes (e.g., login and logout)
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

// AuthContextProvider to provide state and dispatch to children components
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,  // Initialize user state as null
  });

  console.log('AuthContext state', state);  // For debugging

  return (
    // Use AuthContext.Provider to pass down the state and dispatch to children
    <AuthContext.Provider value={{ user: state.user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
