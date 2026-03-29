import { createContext, useContext, useState, useEffect } from 'react';
import { loginAPI, registerAPI } from '../data/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for logged in user session
    const storedUser = localStorage.getItem('ec_current_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await loginAPI(email, password);
    setUser(data);
    localStorage.setItem('ec_current_user', JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ec_current_user');
  };

  const register = async (userData) => {
    const data = await registerAPI(userData);
    setUser(data);
    localStorage.setItem('ec_current_user', JSON.stringify(data));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
