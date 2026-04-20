import { useState, useRef, useEffect } from "react";
import AppSidebar from "@/components/AppSidebar";
import TopMenu from "@/components/TopMenu";
import { mockMensagens, mockSystemUsers, type ChatMessage } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { roleLabels, roleColors } from "@/types/auth";
import { cn } from "@/lib/utils";
import { Send, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Chat = () => {
  const { user } = useAuth();
  const [mensagens, setMensagens] = useState<ChatMessage[]>(mockMensagens);
  const [texto, setTexto] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  const enviar = () => {
    if (!texto.trim() || !user) return;
    const nova: ChatMessage = {
      id: String(Date.now()),
      userId: user.id,
      userName: user.nome,
      userRole: user.role,
      texto: texto.trim(),
      hora: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    };
    setMensagens((prev) => [...prev, nova]);
    setTexto("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviar();
    }
  };

  const usuariosOnline = mockSystemUsers.filter((u) => u.status === "ativo");

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopMenu />
        <main className="flex-1 flex overflow-hidden" style={{ height: "calc(100vh - 57px)" }}>

          {/* Painel esquerdo: participantes */}
          <aside className="w-52 shrink-0 border-r border-border/50 bg-card flex flex-col">
            <div className="px-4 py-4 border-b border-border/50">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <MessageCircle size={15} className="text-primary" />
                Canal Geral
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">{usuariosOnline.length} online</p>
            </div>
            <div className="flex-1 overflow-y-auto py-3 px-3 space-y-2">
              {mockSystemUsers.map((u) => (
                <div key={u.id} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-muted/40 transition-colors">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                      {u.nome.charAt(0)}
                    </div>
                    <span className={cn(
                      "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-card",
                      u.status === "ativo" ? "bg-green-500" : "bg-gray-400"
                    )} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-foreground truncate">{u.nome}</p>
                    <span className={cn(
                      "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border",
                      roleColors[u.role]
                    )}>
                      {roleLabels[u.role]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Área principal do chat */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Header do chat */}
            <div className="px-6 py-3.5 border-b border-border/50 bg-card/80">
              <h2 className="text-sm font-semibold text-foreground"># geral</h2>
              <p className="text-xs text-muted-foreground">Chat entre operadores — Dell cred</p>
            </div>

            {/* Mensagens */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {mensagens.map((m, i) => {
                const isOwn = m.userId === user?.id;
                const showHeader = i === 0 || mensagens[i - 1].userId !== m.userId;
                return (
                  <div key={m.id} className={cn("flex gap-3", isOwn && "flex-row-reverse")}>
                    {showHeader && (
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0 mt-0.5">
                        {m.userName.charAt(0)}
                      </div>
                    )}
                    {!showHeader && <div className="w-8 shrink-0" />}
                    <div className={cn("max-w-[70%] space-y-1", isOwn && "items-end flex flex-col")}>
                      {showHeader && (
                        <div className={cn("flex items-center gap-2", isOwn && "flex-row-reverse")}>
                          <span className="text-xs font-semibold text-foreground">{m.userName}</span>
                          <span className={cn(
                            "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border",
                            roleColors[m.userRole]
                          )}>
                            {roleLabels[m.userRole]}
                          </span>
                          <span className="text-[10px] text-muted-foreground">{m.hora}</span>
                        </div>
                      )}
                      <div className={cn(
                        "px-4 py-2.5 rounded-2xl text-sm leading-relaxed break-words",
                        isOwn
                          ? "bg-purple-600 text-white rounded-tr-sm"
                          : "bg-card border border-border/50 text-foreground rounded-tl-sm shadow-sm"
                      )}>
                        {m.texto}
                      </div>
                      {!showHeader && (
                        <span className="text-[10px] text-muted-foreground px-1">{m.hora}</span>
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-6 py-4 border-t border-border/50 bg-card/80">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                  {user?.nome.charAt(0)}
                </div>
                <Input
                  value={texto}
                  onChange={(e) => setTexto(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Mensagem no #geral...`}
                  className="flex-1 bg-background border-border/50 rounded-xl"
                />
                <Button
                  onClick={enviar}
                  disabled={!texto.trim()}
                  size="icon"
                  className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl shrink-0"
                >
                  <Send size={16} />
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1.5 ml-11">Enter para enviar</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Chat;
