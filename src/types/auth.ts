export type UserRole = 'admin' | 'operador' | 'confirmacao';

export interface User {
  id: string;
  nome: string;
  email: string;
  role: UserRole;
}

export interface SystemUser extends User {
  status: 'ativo' | 'inativo';
  criadoEm: string;
}

export const roleLabels: Record<UserRole, string> = {
  admin: 'Administrador',
  operador: 'Operador',
  confirmacao: 'Op. Confirmação',
};

export const roleColors: Record<UserRole, string> = {
  admin: 'bg-purple-100 text-purple-700 border-purple-200',
  operador: 'bg-blue-100 text-blue-700 border-blue-200',
  confirmacao: 'bg-green-100 text-green-700 border-green-200',
};
