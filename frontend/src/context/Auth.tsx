import axios from "axios";
import { createContext, useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: any): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const response: any = await axios.post(
        `${process.env.REACT_APP_API}/login`, 
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
          maxRedirects: 0,
        }
      );

      if(response?.status_code !== 200) {
      localStorage.setItem('logged', 'true');
      localStorage.setItem("user", JSON.stringify(response.data.data.company.data));
      setUser(response.data.data.company.data);
      navigate('/home', { state: { logged: true } });
      } else {
        alert("Credenciais inválidas.");
      }
    } catch (error) {
      console.error(error);
      alert("Credenciais inválidas.");
    }
  };

  useMemo(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    } else {
      setUser(null);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.setItem('logged', 'false');
    setUser(null);
    navigate('/Login', { state: { logged: false } });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  
  return context;
};

