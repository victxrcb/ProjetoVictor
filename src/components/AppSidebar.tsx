import { useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { toast } from "sonner";

const AppSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logout realizado com sucesso!");
    navigate("/");
  };

  return (
    <aside className="w-56 shrink-0 bg-sidebar text-sidebar-foreground flex flex-col items-center py-8 gap-4 min-h-screen animate-slide-in-left font-sans">
      
      {/* Avatar */}
      <div className="w-20 h-20 rounded-full bg-sidebar-primary flex items-center justify-center shadow-lg">
        <User size={40} className="text-sidebar-primary-foreground" />
      </div>

      {/* Nome do usuário */}
      <span className="text-sm font-semibold tracking-wide">
        USER TEST
      </span>

      {/* Menu */}
      <div className="mt-6 w-full px-4 space-y-1 flex-1">
        <div className="text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/50 px-3 mb-2">
          Menu
        </div>

        {["Dashboard", "Borderôs", "Agendamentos", "Relatórios", "Configurações"].map((item) => (
          <button
            key={item}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium tracking-tight text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 hover:pl-4"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Logout */}
      <div className="w-full px-4 pb-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive/80 hover:bg-destructive/10 hover:text-destructive transition-all duration-200 hover:pl-4"
        >
          <LogOut size={16} />
          Sair da conta
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;