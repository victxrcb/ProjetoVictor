import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User, UserRole } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  login: (email: string, senha: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (roles: UserRole[]) => boolean;
}

// Credenciais mock — substitua por chamada real à API futuramente
const credenciais = [
  { id: '1', nome: 'Admin Master', email: 'admin@dellcred.com', role: 'admin' as UserRole, senha: 'admin123' },
  { id: '2', nome: 'Victor Operador', email: 'victor@dellcred.com', role: 'operador' as UserRole, senha: 'oper123' },
  { id: '3', nome: 'Carlos Confirmação', email: 'carlos@dellcred.com', role: 'confirmacao' as UserRole, senha: 'conf123' },
];

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('dellcred_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (emailOuNome: string, senha: string): boolean => {
    const entrada = emailOuNome.trim().toLowerCase();
    const found = credenciais.find(
      (u) =>
        (u.email.toLowerCase() === entrada || u.nome.toLowerCase() === entrada) &&
        u.senha === senha.trim()
    );
    if (found) {
      const userData: User = { id: found.id, nome: found.nome, email: found.email, role: found.role };
      setUser(userData);
      localStorage.setItem('dellcred_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dellcred_user');
  };

  const hasRole = (roles: UserRole[]): boolean =>
    !!user && roles.includes(user.role);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
};
