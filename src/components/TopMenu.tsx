import { Bell, Mail, Phone, Calendar, FileText, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const menuItems = [
  { label: "Notificar", icon: Phone, onClick: () => toast.info("Função de notificação em breve!") },
  { label: "NF-e", icon: FileText, onClick: () => toast.info("Módulo NF-e em breve!") },
  { label: "Agendar", icon: Calendar, onClick: () => toast.info("Agendamento em breve!") },
  { label: "E-mail", icon: Mail, onClick: () => toast.info("Envio de e-mail em breve!") },
  { label: "WhatsApp", icon: MessageCircle, onClick: () => toast.info("Integração WhatsApp em breve!") },
];

const TopMenu = () => {
  return (
    <header className="gradient-header px-6 py-3 flex items-center justify-between shadow-soft sticky top-0 z-20">
      <div className="flex items-center gap-2 flex-wrap">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={item.onClick}
            className="btn-ripple inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/80 text-primary-foreground text-sm font-semibold hover:bg-primary hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm"
          >
            <item.icon size={16} />
            {item.label}
          </button>
        ))}
      </div>

      {/* Notifications */}
      <button
        onClick={() => toast.info("Sem notificações novas")}
        className="relative btn-ripple inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/80 text-primary-foreground text-sm font-semibold hover:bg-primary hover:scale-105 active:scale-95 transition-all duration-200"
      >
        <Bell size={16} />
        Notificação
        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse-badge">
          3
        </span>
      </button>
    </header>
  );
};

export default TopMenu;
