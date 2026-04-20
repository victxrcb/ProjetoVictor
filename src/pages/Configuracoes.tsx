import AppSidebar from "@/components/AppSidebar";
import TopMenu from "@/components/TopMenu";
import { useAuth } from "@/contexts/AuthContext";
import { roleLabels, roleColors } from "@/types/auth";
import { cn } from "@/lib/utils";
import { Settings, Shield, Bell, Building2, Palette, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const Configuracoes = () => {
  const { user } = useAuth();

  const { isDark, setDark } = useTheme();
  const [empresa, setEmpresa] = useState({ nome: "Dell cred", email: "contato@dellcred.com", telefone: "(11) 3000-0000", site: "dellcred.com" });
  const [notif, setNotif] = useState({ novoBordero: true, novoAgendamento: true, chatMensagem: false, statusAtualizado: true });
  const [compacto, setCompacto] = useState(false);

  const salvar = () => toast.success("Configurações salvas com sucesso!");

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopMenu />
        <main className="flex-1 p-6 space-y-6 overflow-y-auto max-w-3xl">
          {/* Header */}
          <div className="animate-fade-in-up">
            <h2 className="text-3xl font-bold text-foreground">Configurações</h2>
            <p className="text-sm text-muted-foreground mt-1">Administre as preferências do sistema</p>
          </div>

          {/* Perfil do admin logado */}
          <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm animate-fade-in-up">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-xl font-bold text-purple-700">
                {user?.nome.charAt(0)}
              </div>
              <div>
                <p className="text-base font-semibold text-foreground">{user?.nome}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
                {user && (
                  <span className={cn(
                    "inline-flex items-center mt-1 px-2.5 py-0.5 rounded-lg text-xs font-medium border",
                    roleColors[user.role]
                  )}>
                    {roleLabels[user.role]}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Empresa */}
          <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm space-y-4 animate-fade-in-up">
            <div className="flex items-center gap-2 mb-2">
              <Building2 size={18} className="text-primary" />
              <h3 className="text-base font-semibold text-foreground">Dados da Empresa</h3>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Nome da empresa</Label>
                <Input value={empresa.nome} onChange={(e) => setEmpresa({ ...empresa, nome: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>E-mail</Label>
                <Input type="email" value={empresa.email} onChange={(e) => setEmpresa({ ...empresa, email: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Telefone</Label>
                <Input value={empresa.telefone} onChange={(e) => setEmpresa({ ...empresa, telefone: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Site</Label>
                <Input value={empresa.site} onChange={(e) => setEmpresa({ ...empresa, site: e.target.value })} />
              </div>
            </div>
          </div>

          {/* Notificações */}
          <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm space-y-4 animate-fade-in-up">
            <div className="flex items-center gap-2 mb-2">
              <Bell size={18} className="text-primary" />
              <h3 className="text-base font-semibold text-foreground">Notificações</h3>
            </div>
            <Separator />
            <div className="space-y-4">
              {[
                { key: "novoBordero" as const, label: "Novo borderô adicionado", desc: "Notificar quando um operador adicionar um borderô" },
                { key: "novoAgendamento" as const, label: "Novo agendamento criado", desc: "Notificar ao criar novos agendamentos" },
                { key: "chatMensagem" as const, label: "Mensagens no chat", desc: "Notificar ao receber mensagens no canal geral" },
                { key: "statusAtualizado" as const, label: "Status de agendamento atualizado", desc: "Notificar quando op. confirmação atualizar status" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch
                    checked={notif[item.key]}
                    onCheckedChange={(v) => setNotif({ ...notif, [item.key]: v })}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Aparência */}
          <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm space-y-4 animate-fade-in-up">
            <div className="flex items-center gap-2 mb-2">
              <Palette size={18} className="text-primary" />
              <h3 className="text-base font-semibold text-foreground">Aparência</h3>
            </div>
            <Separator />
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Modo escuro</p>
                  <p className="text-xs text-muted-foreground">Usar tema escuro em toda a plataforma</p>
                </div>
                <Switch checked={isDark} onCheckedChange={setDark} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Layout compacto</p>
                  <p className="text-xs text-muted-foreground">Reduzir espaçamento para exibir mais informações</p>
                </div>
                <Switch checked={compacto} onCheckedChange={setCompacto} />
              </div>
            </div>
          </div>

          {/* Segurança */}
          <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm space-y-4 animate-fade-in-up">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={18} className="text-primary" />
              <h3 className="text-base font-semibold text-foreground">Segurança</h3>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Senha atual</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-1.5">
                <Label>Nova senha</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Mínimo de 8 caracteres. Use letras, números e símbolos.</p>
          </div>

          {/* Botão salvar */}
          <div className="flex justify-end pb-6 animate-fade-in-up">
            <Button onClick={salvar} className="gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8">
              <Save size={16} />
              Salvar configurações
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Configuracoes;
