import type { SystemUser, UserRole } from '@/types/auth';

// ─── Borderô ─────────────────────────────────────────────────────────────────

export interface Bordero {
  id: string;
  data: string;
  numero: string;
  cedente: string;
  sacados: number;
  unidade: string;
  contato: string;
}

export const mockBorderos: Bordero[] = [
  { id: '1', data: '05/04/2026', numero: 'BRD-001', cedente: 'Tech Solutions Ltda', sacados: 12, unidade: 'São Paulo', contato: '(11) 99999-0001' },
  { id: '2', data: '04/04/2026', numero: 'BRD-002', cedente: 'Comércio Brasil S.A.', sacados: 8, unidade: 'Rio de Janeiro', contato: '(21) 98888-0002' },
  { id: '3', data: '03/04/2026', numero: 'BRD-003', cedente: 'Indústria Nacional Ltda', sacados: 25, unidade: 'Belo Horizonte', contato: '(31) 97777-0003' },
  { id: '4', data: '02/04/2026', numero: 'BRD-004', cedente: 'Logística Express S.A.', sacados: 5, unidade: 'Curitiba', contato: '(41) 96666-0004' },
  { id: '5', data: '01/04/2026', numero: 'BRD-005', cedente: 'Agro Forte Ltda', sacados: 18, unidade: 'Goiânia', contato: '(62) 95555-0005' },
  { id: '6', data: '31/03/2026', numero: 'BRD-006', cedente: 'Construtora Horizonte', sacados: 9, unidade: 'Salvador', contato: '(71) 94444-0006' },
];

// ─── Agendamento ──────────────────────────────────────────────────────────────

export interface Agendamento {
  id: string;
  data: string;
  bordero: string;
  cedente: string;
  status: 'pendente' | 'confirmado' | 'recusado';
  retorno: string;
  observacao?: string;
  contatadoPor?: string;
}

export const mockAgendamentos: Agendamento[] = [
  { id: '1', data: '05/04/2026', bordero: 'BRD-001', cedente: 'Tech Solutions Ltda', status: 'pendente', retorno: '06/04/2026', observacao: '' },
  { id: '2', data: '04/04/2026', bordero: 'BRD-002', cedente: 'Comércio Brasil S.A.', status: 'confirmado', retorno: '05/04/2026', observacao: 'Contato realizado via WhatsApp.', contatadoPor: 'Carlos Confirmação' },
  { id: '3', data: '03/04/2026', bordero: 'BRD-003', cedente: 'Indústria Nacional Ltda', status: 'recusado', retorno: '04/04/2026', observacao: 'Empresa não aceitou os termos.', contatadoPor: 'Carlos Confirmação' },
  { id: '4', data: '02/04/2026', bordero: 'BRD-004', cedente: 'Logística Express S.A.', status: 'pendente', retorno: '03/04/2026', observacao: '' },
  { id: '5', data: '01/04/2026', bordero: 'BRD-005', cedente: 'Agro Forte Ltda', status: 'confirmado', retorno: '02/04/2026', observacao: 'Confirmado por e-mail.', contatadoPor: 'Carlos Confirmação' },
];

// ─── Usuários do sistema ──────────────────────────────────────────────────────

export const mockSystemUsers: SystemUser[] = [
  { id: '1', nome: 'Admin Master', email: 'admin@dellcred.com', role: 'admin' as UserRole, status: 'ativo', criadoEm: '01/01/2026' },
  { id: '2', nome: 'Victor Operador', email: 'victor@dellcred.com', role: 'operador' as UserRole, status: 'ativo', criadoEm: '01/02/2026' },
  { id: '3', nome: 'Carlos Confirmação', email: 'carlos@dellcred.com', role: 'confirmacao' as UserRole, status: 'ativo', criadoEm: '01/03/2026' },
  { id: '4', nome: 'Ana Operadora', email: 'ana@dellcred.com', role: 'operador' as UserRole, status: 'inativo', criadoEm: '10/03/2026' },
];

// ─── Chat ─────────────────────────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  texto: string;
  hora: string;
}

export const mockMensagens: ChatMessage[] = [
  { id: '1', userId: '1', userName: 'Admin Master', userRole: 'admin', texto: 'Bom dia a todos! Lembrando que temos 6 borderôs ativos esta semana.', hora: '08:00' },
  { id: '2', userId: '2', userName: 'Victor Operador', userRole: 'operador', texto: 'Bom dia! Acabei de adicionar o BRD-006. Cedente: Construtora Horizonte.', hora: '08:30' },
  { id: '3', userId: '3', userName: 'Carlos Confirmação', userRole: 'confirmacao', texto: 'Perfeito, Victor. Vou entrar em contato com eles ainda hoje.', hora: '08:35' },
  { id: '4', userId: '2', userName: 'Victor Operador', userRole: 'operador', texto: 'O contato deles é (71) 94444-0006. Peça pelo sr. Ricardo.', hora: '08:40' },
  { id: '5', userId: '3', userName: 'Carlos Confirmação', userRole: 'confirmacao', texto: 'Anotado! Também preciso confirmar o BRD-004 com a Logística Express.', hora: '09:00' },
  { id: '6', userId: '1', userName: 'Admin Master', userRole: 'admin', texto: 'Carlos, priorize o BRD-001 primeiro — retorno vence amanhã.', hora: '09:10' },
  { id: '7', userId: '3', userName: 'Carlos Confirmação', userRole: 'confirmacao', texto: 'Entendido! Já estou ligando para a Tech Solutions.', hora: '09:15' },
];
