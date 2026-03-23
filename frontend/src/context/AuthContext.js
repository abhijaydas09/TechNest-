import { createContext, useContext, useState } from 'react';
import api from '../api/axiosConfig';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        const role = localStorage.getItem('role');
        return token ? { token, username, role } : null;
    });

    const saveAuth = (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('role', data.role);
        setUser(data);
    };

    const login = async ({ email, password }) => {
        const { data } = await api.post('/auth/login', { email, password });
        saveAuth(data);
        return data;
    };

    const register = async ({ username, email, password }) => {
        const { data } = await api.post('/auth/register', { username, email, password });
        saveAuth(data);
        return data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);