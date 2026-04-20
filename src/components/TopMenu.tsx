import { useState } from "react";
import { Bell, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { roleLabels, roleColors } from "@/types/auth";
import { mockMensagens } from "@/data/mockData";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TopMenu = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [lidas, setLidas] = useState<string[]>([]);

  // Últimas 5 mensagens do chat como "notificações"
  const notificacoes = mockMensagens
    .filter((m) => m.userId !== user?.id)
    .slice(-5)
    .reverse();

  const naoLidas = notificacoes.filter((m) => !lidas.includes(m.id));

  const marcarTodasLidas = () => {
    setLidas(notificacoes.map((m) => m.id));
  };

  return (
    <header className="sticky top-0 z-20 border-b border-border/50 bg-card/95 backdrop-blur-sm">
      <div className="px-6 py-3 flex items-center justify-end gap-3">

        {/* Badge de perfil */}
        {user && (
          <span
            className={cn(
              "inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium border",
              roleColors[user.role]
            )}
          >
            {roleLabels[user.role]}
          </span>
        )}

        {/* Sino de notificações */}
        <DropdownMenu onOpenChange={(open) => { if (open) marcarTodasLidas(); }}>
          <DropdownMenuTrigger asChild>
            <button className="relative inline-flex items-center p-2 rounded-lg text-foreground hover:bg-primary/10 transition-colors duration-200 group">
              <Bell size={18} className="text-primary group-hover:scale-110 transition-transform" />
              {naoLidas.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 bg-destructive rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                  {naoLidas.length}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0">
            {/* Header do dropdown */}
            <div className="px-4 py-3 border-b border-border/50 flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Notificações</span>
              <span className="text-xs text-muted-foreground">
                {naoLidas.length > 0 ? `${naoLidas.length} nova(s)` : "Tudo lido"}
              </span>
            </div>

            {/* Lista de mensagens */}
            {notificacoes.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                Nenhuma notificação
              </div>
            ) : (
              <div className="divide-y divide-border/30">
                {notificacoes.map((m) => (
                  <div
                    key={m.id}
                    className={cn(
                      "px-4 py-3 flex items-start gap-3 hover:bg-muted/30 transition-colors cursor-pointer",
                      !lidas.includes(m.id) && "bg-primary/5"
                    )}
                    onClick={() => navigate("/chat")}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0 mt-0.5">
                      {m.userName.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-foreground truncate">{m.userName}</p>
                        <span className="text-[10px] text-muted-foreground shrink-0">{m.hora}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{m.texto}</p>
                    </div>
                    {!lidas.includes(m.id) && (
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Footer */}
            <div
              className="px-4 py-3 border-t border-border/50 text-center cursor-pointer hover:bg-muted/30 transition-colors"
              onClick={() => navigate("/chat")}
            >
              <span className="text-xs text-primary font-medium flex items-center justify-center gap-1.5">
                <MessageCircle size={13} />
                Abrir chat
              </span>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopMenu;
