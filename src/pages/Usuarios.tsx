import { useState } from "react";
import AppSidebar from "@/components/AppSidebar";
import TopMenu from "@/components/TopMenu";
import { mockSystemUsers } from "@/data/mockData";
import type { SystemUser } from "@/types/auth";
import { roleLabels, roleColors } from "@/types/auth";
import { cn } from "@/lib/utils";
import { Plus, Pencil, Users, Search, UserCheck, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { toast } from "sonner";
import type { UserRole } from "@/types/auth";

const campoVazio = (): Omit<SystemUser, "id"> => ({
  nome: "",
  email: "",
  role: "operador",
  status: "ativo",
  criadoEm: new Date().toLocaleDateString("pt-BR"),
});

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState<SystemUser[]>(mockSystemUsers);
  const [busca, setBusca] = useState("");
  const [dialogAberto, setDialogAberto] = useState(false);
  const [editando, setEditando] = useState<SystemUser | null>(null);
  const [form, setForm] = useState<Omit<SystemUser, "id">>(campoVazio());

  const filtrados = usuarios.filter((u) =>
    [u.nome, u.email, roleLabels[u.role]].some((v) =>
      v.toLowerCase().includes(busca.toLowerCase())
    )
  );

  const abrirNovo = () => {
    setEditando(null);
    setForm(campoVazio());
    setDialogAberto(true);
  };

  const abrirEditar = (u: SystemUser) => {
    setEditando(u);
    const { id: _id, ...resto } = u;
    void _id;
    setForm(resto);
    setDialogAberto(true);
  };

  const salvar = () => {
    if (!form.nome.trim() || !form.email.trim()) {
      toast.error("Nome e e-mail são obrigatórios.");
      return;
    }
    if (editando) {
      setUsuarios((prev) =>
        prev.map((u) => (u.id === editando.id ? { ...editando, ...form } : u))
      );
      toast.success("Usuário atualizado!");
    } else {
      setUsuarios((prev) => [
        { ...form, id: String(Date.now()) },
        ...prev,
      ]);
      toast.success("Usuário criado com sucesso!");
    }
    setDialogAberto(false);
  };

  const toggleStatus = (id: string) => {
    setUsuarios((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "ativo" ? "inativo" : "ativo" } : u
      )
    );
    const u = usuarios.find((u) => u.id === id);
    toast.success(`Usuário ${u?.status === "ativo" ? "desativado" : "ativado"}.`);
  };

  const ativos = usuarios.filter((u) => u.status === "ativo").length;
  const inativos = usuarios.filter((u) => u.status === "inativo").length;

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopMenu />
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in-up">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Usuários</h2>
              <p className="text-sm text-muted-foreground mt-1">Gerencie os usuários e perfis de acesso</p>
            </div>
            <Button onClick={abrirNovo} className="gap-2 bg-purple-600 hover:bg-purple-700 text-white">
              <Plus size={16} />
              Novo Usuário
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up">
            {[
              { label: "Total", value: usuarios.length, color: "text-purple-600" },
              { label: "Ativos", value: ativos, color: "text-green-600" },
              { label: "Inativos", value: inativos, color: "text-gray-500" },
              { label: "Admins", value: usuarios.filter((u) => u.role === "admin").length, color: "text-blue-600" },
            ].map((s) => (
              <div key={s.label} className="bg-card border border-border/50 rounded-xl p-4 shadow-sm">
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Tabela */}
          <div className="bg-card border border-border/50 rounded-xl shadow-sm overflow-hidden animate-fade-in-up">
            <div className="px-6 py-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                <Users size={18} className="text-primary" />
                Lista de Usuários
                <span className="text-xs font-normal text-muted-foreground ml-1">({filtrados.length})</span>
              </h3>
              <div className="relative w-full sm:w-60">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={15} />
                <Input
                  placeholder="Buscar por nome ou e-mail..."
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
                    {["Usuário", "E-mail", "Perfil", "Status", "Criado em", "Ações"].map((h) => (
                      <th key={h} className="text-left px-6 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtrados.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-muted-foreground">
                        Nenhum usuário encontrado.
                      </td>
                    </tr>
                  ) : (
                    filtrados.map((u) => (
                      <tr key={u.id} className="border-b border-border/20 hover:bg-primary/5 transition-colors group">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                              {u.nome.charAt(0)}
                            </div>
                            <span className="font-medium text-foreground">{u.nome}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-foreground/70">{u.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={cn(
                            "inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border",
                            roleColors[u.role]
                          )}>
                            {roleLabels[u.role]}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border",
                            u.status === "ativo"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-gray-50 text-gray-500 border-gray-200"
                          )}>
                            <span className={cn("w-1.5 h-1.5 rounded-full", u.status === "ativo" ? "bg-green-500" : "bg-gray-400")} />
                            {u.status === "ativo" ? "Ativo" : "Inativo"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-foreground/70">{u.criadoEm}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => abrirEditar(u)}
                              className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                              title="Editar"
                            >
                              <Pencil size={15} />
                            </button>
                            <button
                              onClick={() => toggleStatus(u.id)}
                              className={cn(
                                "p-1.5 rounded-lg transition-colors",
                                u.status === "ativo"
                                  ? "text-red-500 hover:bg-red-50"
                                  : "text-green-600 hover:bg-green-50"
                              )}
                              title={u.status === "ativo" ? "Desativar" : "Ativar"}
                            >
                              {u.status === "ativo" ? <UserX size={15} /> : <UserCheck size={15} />}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 border-t border-border/50 bg-muted/20 text-xs text-muted-foreground flex justify-between">
              <span>Total: <strong>{usuarios.length}</strong></span>
              <span>Exibindo: <strong>{filtrados.length}</strong></span>
            </div>
          </div>
        </main>
      </div>

      {/* Dialog Adicionar/Editar */}
      <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editando ? "Editar Usuário" : "Novo Usuário"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Nome completo *</Label>
              <Input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Nome do usuário" />
            </div>
            <div className="space-y-1.5">
              <Label>E-mail *</Label>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@dellcred.com" />
            </div>
            <div className="space-y-1.5">
              <Label>Perfil de acesso</Label>
              <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v as UserRole })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="operador">Operador</SelectItem>
                  <SelectItem value="confirmacao">Op. Confirmação</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as SystemUser["status"] })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogAberto(false)}>Cancelar</Button>
            <Button onClick={salvar} className="bg-purple-600 hover:bg-purple-700 text-white">
              {editando ? "Salvar alterações" : "Criar usuário"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Usuarios;
