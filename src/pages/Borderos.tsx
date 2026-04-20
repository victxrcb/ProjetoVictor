import { useState } from "react";
import AppSidebar from "@/components/AppSidebar";
import TopMenu from "@/components/TopMenu";
import { mockBorderos, type Bordero } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { Plus, Pencil, Trash2, FileText, Search } from "lucide-react";
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

const campoVazio = (): Omit<Bordero, "id"> => ({
  data: "",
  numero: "",
  cedente: "",
  sacados: 0,
  unidade: "",
  contato: "",
});

const Borderos = () => {
  const { hasRole } = useAuth();
  const podeEditar = hasRole(["admin", "operador"]);
  const podeExcluir = hasRole(["admin"]);

  const [borderos, setBorderos] = useState<Bordero[]>(mockBorderos);
  const [busca, setBusca] = useState("");
  const [dialogAberto, setDialogAberto] = useState(false);
  const [excluirId, setExcluirId] = useState<string | null>(null);
  const [editando, setEditando] = useState<Bordero | null>(null);
  const [form, setForm] = useState<Omit<Bordero, "id">>(campoVazio());

  const filtrados = borderos.filter((b) =>
    [b.numero, b.cedente, b.unidade, b.contato].some((v) =>
      v.toLowerCase().includes(busca.toLowerCase())
    )
  );

  const abrirNovo = () => {
    setEditando(null);
    setForm(campoVazio());
    setDialogAberto(true);
  };

  const abrirEditar = (b: Bordero) => {
    setEditando(b);
    const { id: _id, ...resto } = b;
    void _id;
    setForm(resto);
    setDialogAberto(true);
  };

  const salvar = () => {
    if (!form.numero.trim() || !form.cedente.trim()) {
      toast.error("Número e Cedente são obrigatórios.");
      return;
    }
    if (editando) {
      setBorderos((prev) =>
        prev.map((b) => (b.id === editando.id ? { ...editando, ...form } : b))
      );
      toast.success("Borderô atualizado com sucesso!");
    } else {
      const novo: Bordero = {
        ...form,
        id: String(Date.now()),
        data: form.data || new Date().toLocaleDateString("pt-BR"),
      };
      setBorderos((prev) => [novo, ...prev]);
      toast.success("Borderô adicionado com sucesso!");
    }
    setDialogAberto(false);
  };

  const confirmarExclusao = () => {
    if (!excluirId) return;
    setBorderos((prev) => prev.filter((b) => b.id !== excluirId));
    toast.success("Borderô removido.");
    setExcluirId(null);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopMenu />
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in-up">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Borderôs</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Gerencie os borderôs cadastrados no sistema
              </p>
            </div>
            {podeEditar && (
              <Button
                onClick={abrirNovo}
                className="gap-2 bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Plus size={16} />
                Novo Borderô
              </Button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up">
            {[
              { label: "Total", value: borderos.length, color: "text-purple-600" },
              { label: "São Paulo", value: borderos.filter((b) => b.unidade === "São Paulo").length, color: "text-blue-600" },
              { label: "Sacados (total)", value: borderos.reduce((s, b) => s + b.sacados, 0), color: "text-green-600" },
              { label: "Este mês", value: borderos.filter((b) => b.data.endsWith("2026")).length, color: "text-amber-600" },
            ].map((s) => (
              <div key={s.label} className="bg-card border border-border/50 rounded-xl p-4 shadow-sm">
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Tabela */}
          <div className="bg-card border border-border/50 rounded-xl shadow-sm overflow-hidden animate-fade-in-up">
            {/* Cabeçalho da tabela */}
            <div className="px-6 py-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                <FileText size={18} className="text-primary" />
                Lista de Borderôs
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
                    {["Data", "Borderô", "Cedente", "Nº Sacados", "Unidade", "Contato", "Ações"].map((h) => (
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
                        Nenhum borderô encontrado.
                      </td>
                    </tr>
                  ) : (
                    filtrados.map((b) => (
                      <tr key={b.id} className="border-b border-border/20 hover:bg-primary/5 transition-colors group">
                        <td className="px-6 py-4 whitespace-nowrap text-foreground/80">{b.data}</td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-primary">{b.numero}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-foreground/80">{b.cedente}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-foreground/80">{b.sacados}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-foreground/80">{b.unidade}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-foreground/80">{b.contato}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {podeEditar && (
                              <button
                                onClick={() => abrirEditar(b)}
                                className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                                title="Editar"
                              >
                                <Pencil size={15} />
                              </button>
                            )}
                            {podeExcluir && (
                              <button
                                onClick={() => setExcluirId(b.id)}
                                className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                                title="Excluir"
                              >
                                <Trash2 size={15} />
                              </button>
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
              <span>Total: <strong>{borderos.length}</strong></span>
              <span>Exibindo: <strong>{filtrados.length}</strong></span>
            </div>
          </div>
        </main>
      </div>

      {/* Dialog Adicionar/Editar */}
      <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editando ? "Editar Borderô" : "Novo Borderô"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="space-y-1.5">
              <Label>Número *</Label>
              <Input value={form.numero} onChange={(e) => setForm({ ...form, numero: e.target.value })} placeholder="BRD-007" />
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
              <Label>Nº de Sacados</Label>
              <Input type="number" min={0} value={form.sacados} onChange={(e) => setForm({ ...form, sacados: Number(e.target.value) })} />
            </div>
            <div className="space-y-1.5">
              <Label>Unidade</Label>
              <Input value={form.unidade} onChange={(e) => setForm({ ...form, unidade: e.target.value })} placeholder="Cidade" />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label>Contato</Label>
              <Input value={form.contato} onChange={(e) => setForm({ ...form, contato: e.target.value })} placeholder="(XX) 9XXXX-XXXX" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogAberto(false)}>Cancelar</Button>
            <Button onClick={salvar} className="bg-purple-600 hover:bg-purple-700 text-white">
              {editando ? "Salvar alterações" : "Adicionar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Alert de exclusão */}
      <AlertDialog open={!!excluirId} onOpenChange={(o) => { if (!o) setExcluirId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir borderô?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O borderô será removido permanentemente.
            </AlertDialogDescription>
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

export default Borderos;
