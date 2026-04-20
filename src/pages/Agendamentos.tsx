import { useState } from "react";
import AppSidebar from "@/components/AppSidebar";
import TopMenu from "@/components/TopMenu";
import { mockAgendamentos, type Agendamento } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import StatusBadge from "@/components/StatusBadge";
import { Plus, Search, CalendarClock, Pencil, Trash2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const campoVazio = (): Omit<Agendamento, "id"> => ({
  data: "",
  bordero: "",
  cedente: "",
  status: "pendente",
  retorno: "",
  observacao: "",
});

const Agendamentos = () => {
  const { user, hasRole } = useAuth();
  const isAdmin = hasRole(["admin"]);
  const isConfirmacao = hasRole(["confirmacao"]);
  const podeCriar = hasRole(["admin", "confirmacao"]);

  const [agendamentos, setAgendamentos] = useState<Agendamento[]>(mockAgendamentos);
  const [busca, setBusca] = useState("");
  const [dialogAberto, setDialogAberto] = useState(false);
  const [dialogContato, setDialogContato] = useState(false);
  const [excluirId, setExcluirId] = useState<string | null>(null);
  const [editando, setEditando] = useState<Agendamento | null>(null);
  const [form, setForm] = useState<Omit<Agendamento, "id">>(campoVazio());
  const [contatoForm, setContatoForm] = useState<{ status: Agendamento["status"]; observacao: string }>({
    status: "pendente",
    observacao: "",
  });

  const filtrados = agendamentos.filter((a) =>
    [a.bordero, a.cedente, a.retorno].some((v) =>
      v.toLowerCase().includes(busca.toLowerCase())
    )
  );

  const abrirNovo = () => {
    setEditando(null);
    setForm(campoVazio());
    setDialogAberto(true);
  };

  const abrirEditar = (a: Agendamento) => {
    setEditando(a);
    const { id: _id, ...resto } = a;
    void _id;
    setForm(resto);
    setDialogAberto(true);
  };

  const abrirContato = (a: Agendamento) => {
    setEditando(a);
    setContatoForm({ status: a.status, observacao: a.observacao ?? "" });
    setDialogContato(true);
  };

  const salvar = () => {
    if (!form.bordero.trim() || !form.cedente.trim()) {
      toast.error("Borderô e Cedente são obrigatórios.");
      return;
    }
    if (editando) {
      setAgendamentos((prev) =>
        prev.map((a) => (a.id === editando.id ? { ...editando, ...form } : a))
      );
      toast.success("Agendamento atualizado!");
    } else {
      setAgendamentos((prev) => [
        { ...form, id: String(Date.now()), data: form.data || new Date().toLocaleDateString("pt-BR") },
        ...prev,
      ]);
      toast.success("Agendamento criado!");
    }
    setDialogAberto(false);
  };

  const salvarContato = () => {
    if (!editando) return;
    setAgendamentos((prev) =>
      prev.map((a) =>
        a.id === editando.id
          ? { ...a, status: contatoForm.status, observacao: contatoForm.observacao, contatadoPor: user?.nome }
          : a
      )
    );
    toast.success("Contato registrado com sucesso!");
    setDialogContato(false);
  };

  const confirmarExclusao = () => {
    if (!excluirId) return;
    setAgendamentos((prev) => prev.filter((a) => a.id !== excluirId));
    toast.success("Agendamento removido.");
    setExcluirId(null);
  };

  const pendentes = agendamentos.filter((a) => a.status === "pendente").length;
  const confirmados = agendamentos.filter((a) => a.status === "confirmado").length;
  const recusados = agendamentos.filter((a) => a.status === "recusado").length;

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopMenu />
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in-up">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Agendamentos</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {isConfirmacao
                  ? "Registre os contatos realizados com as empresas do borderô"
                  : "Gerencie os agendamentos de contato com cedentes"}
              </p>
            </div>
            {podeCriar && (
              <Button onClick={abrirNovo} className="gap-2 bg-purple-600 hover:bg-purple-700 text-white">
                <Plus size={16} />
                Novo Agendamento
              </Button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 animate-fade-in-up">
            {[
              { label: "Pendentes", value: pendentes, color: "text-amber-600", bg: "bg-amber-50 border-amber-100" },
              { label: "Confirmados", value: confirmados, color: "text-green-600", bg: "bg-green-50 border-green-100" },
              { label: "Recusados", value: recusados, color: "text-red-600", bg: "bg-red-50 border-red-100" },
            ].map((s) => (
              <div key={s.label} className={`border rounded-xl p-4 shadow-sm ${s.bg}`}>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Tabela */}
          <div className="bg-card border border-border/50 rounded-xl shadow-sm overflow-hidden animate-fade-in-up">
            <div className="px-6 py-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                <CalendarClock size={18} className="text-primary" />
                Lista de Agendamentos
                <span className="text-xs font-normal text-muted-foreground ml-1">({filtrados.length})</span>
              </h3>
              <div className="relative w-full sm:w-60">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={15} />
                <Input
                  placeholder="Buscar..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="pl-9 h-9 bg-background/50 text-sm border-border/50 rounded-lg"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/30 border-b border-border/50">
                  <tr>
                    {["Data", "Borderô", "Cedente", "Status", "Retorno", "Observação", "Ações"].map((h) => (
                      <th key={h} className="text-left px-6 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtrados.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-muted-foreground">
                        Nenhum agendamento encontrado.
                      </td>
                    </tr>
                  ) : (
                    filtrados.map((a) => (
                      <tr key={a.id} className="border-b border-border/20 hover:bg-primary/5 transition-colors group">
                        <td className="px-6 py-4 whitespace-nowrap text-foreground/80">{a.data}</td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-primary">{a.bordero}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-foreground/80">{a.cedente}</td>
                        <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={a.status} /></td>
                        <td className="px-6 py-4 whitespace-nowrap text-foreground/80">{a.retorno}</td>
                        <td className="px-6 py-4 max-w-[200px] truncate text-foreground/60 text-xs">
                          {a.observacao || "—"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {isConfirmacao && (
                              <button
                                onClick={() => abrirContato(a)}
                                className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 transition-colors"
                                title="Registrar contato"
                              >
                                <MessageSquare size={15} />
                              </button>
                            )}
                            {isAdmin && (
                              <>
                                <button
                                  onClick={() => abrirEditar(a)}
                                  className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                                  title="Editar"
                                >
                                  <Pencil size={15} />
                                </button>
                                <button
                                  onClick={() => setExcluirId(a.id)}
                                  className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                                  title="Excluir"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 border-t border-border/50 bg-muted/20 text-xs text-muted-foreground flex justify-between">
              <span>Total: <strong>{agendamentos.length}</strong></span>
              <span>Exibindo: <strong>{filtrados.length}</strong></span>
            </div>
          </div>
        </main>
      </div>

      {/* Dialog Admin: Adicionar/Editar */}
      <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editando ? "Editar Agendamento" : "Novo Agendamento"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="space-y-1.5">
              <Label>Borderô *</Label>
              <Input value={form.bordero} onChange={(e) => setForm({ ...form, bordero: e.target.value })} placeholder="BRD-001" />
            </div>
            <div className="space-y-1.5">
              <Label>Data</Label>
              <Input value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} placeholder="DD/MM/AAAA" />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label>Cedente *</Label>
              <Input value={form.cedente} onChange={(e) => setForm({ ...form, cedente: e.target.value })} placeholder="Nome da empresa" />
            </div>
            <div className="space-y-1.5">
              <Label>Retorno</Label>
              <Input value={form.retorno} onChange={(e) => setForm({ ...form, retorno: e.target.value })} placeholder="DD/MM/AAAA" />
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as Agendamento["status"] })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="confirmado">Confirmado</SelectItem>
                  <SelectItem value="recusado">Recusado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label>Observação</Label>
              <Textarea value={form.observacao} onChange={(e) => setForm({ ...form, observacao: e.target.value })} rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogAberto(false)}>Cancelar</Button>
            <Button onClick={salvar} className="bg-purple-600 hover:bg-purple-700 text-white">
              {editando ? "Salvar alterações" : "Criar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Op. Confirmação: Registrar contato */}
      <Dialog open={dialogContato} onOpenChange={setDialogContato}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Registrar Contato</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="rounded-lg bg-muted/30 px-4 py-3 text-sm">
              <p className="font-medium">{editando?.cedente}</p>
              <p className="text-muted-foreground text-xs">{editando?.bordero} · Retorno: {editando?.retorno}</p>
            </div>
            <div className="space-y-1.5">
              <Label>Resultado do contato</Label>
              <Select value={contatoForm.status} onValueChange={(v) => setContatoForm({ ...contatoForm, status: v as Agendamento["status"] })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendente">Pendente (tentar novamente)</SelectItem>
                  <SelectItem value="confirmado">Confirmado</SelectItem>
                  <SelectItem value="recusado">Recusado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Observações do contato</Label>
              <Textarea
                value={contatoForm.observacao}
                onChange={(e) => setContatoForm({ ...contatoForm, observacao: e.target.value })}
                placeholder="Descreva como foi o contato..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogContato(false)}>Cancelar</Button>
            <Button onClick={salvarContato} className="bg-green-600 hover:bg-green-700 text-white">
              Registrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Alert exclusão */}
      <AlertDialog open={!!excluirId} onOpenChange={(o) => { if (!o) setExcluirId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir agendamento?</AlertDialogTitle>
            <AlertDialogDescription>Esta ação não pode ser desfeita.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmarExclusao} className="bg-red-600 hover:bg-red-700 text-white">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Agendamentos;
