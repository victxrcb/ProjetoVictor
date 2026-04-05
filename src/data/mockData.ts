// Mock data for Borderos and Agendamentos tables

export interface Bordero {
  id: string;
  data: string;
  numero: string;
  cedente: string;
  sacados: number;
  unidade: string;
  contato: string;
}

export interface Agendamento {
  id: string;
  data: string;
  bordero: string;
  cedente: string;
  status: "pendente" | "confirmado" | "recusado";
  retorno: string;
}

export const mockBorderos: Bordero[] = [
  { id: "1", data: "05/04/2026", numero: "BRD-001", cedente: "Tech Solutions Ltda", sacados: 12, unidade: "São Paulo", contato: "(11) 99999-0001" },
  { id: "2", data: "04/04/2026", numero: "BRD-002", cedente: "Comércio Brasil S.A.", sacados: 8, unidade: "Rio de Janeiro", contato: "(21) 98888-0002" },
  { id: "3", data: "03/04/2026", numero: "BRD-003", cedente: "Indústria Nacional Ltda", sacados: 25, unidade: "Belo Horizonte", contato: "(31) 97777-0003" },
  { id: "4", data: "02/04/2026", numero: "BRD-004", cedente: "Logística Express S.A.", sacados: 5, unidade: "Curitiba", contato: "(41) 96666-0004" },
  { id: "5", data: "01/04/2026", numero: "BRD-005", cedente: "Agro Forte Ltda", sacados: 18, unidade: "Goiânia", contato: "(62) 95555-0005" },
  { id: "6", data: "31/03/2026", numero: "BRD-006", cedente: "Construtora Horizonte", sacados: 9, unidade: "Salvador", contato: "(71) 94444-0006" },
];

export const mockAgendamentos: Agendamento[] = [
  { id: "1", data: "05/04/2026", bordero: "BRD-001", cedente: "Tech Solutions Ltda", status: "pendente", retorno: "06/04/2026" },
  { id: "2", data: "04/04/2026", bordero: "BRD-002", cedente: "Comércio Brasil S.A.", status: "confirmado", retorno: "05/04/2026" },
  { id: "3", data: "03/04/2026", bordero: "BRD-003", cedente: "Indústria Nacional Ltda", status: "recusado", retorno: "04/04/2026" },
  { id: "4", data: "02/04/2026", bordero: "BRD-004", cedente: "Logística Express S.A.", status: "pendente", retorno: "03/04/2026" },
  { id: "5", data: "01/04/2026", bordero: "BRD-005", cedente: "Agro Forte Ltda", status: "confirmado", retorno: "02/04/2026" },
];
