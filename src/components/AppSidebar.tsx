import { User } from "lucide-react";

const AppSidebar = () => {
  return (
    <aside className="w-56 shrink-0 bg-sidebar text-sidebar-foreground flex flex-col items-center py-8 gap-4 min-h-screen animate-slide-in-left">
      {/* Avatar */}
      <div className="w-20 h-20 rounded-full bg-sidebar-primary flex items-center justify-center shadow-lg">
        <User size={40} className="text-sidebar-primary-foreground" />
      </div>
      <span className="text-sm font-bold tracking-wide">USER TEST</span>

      <div className="mt-6 w-full px-4 space-y-1">
        <div className="text-[10px] uppercase tracking-widest text-sidebar-foreground/50 px-3 mb-2">Menu</div>
        {["Dashboard", "Borderôs", "Agendamentos", "Relatórios", "Configurações"].map((item) => (
          <button
            key={item}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-150"
          >
            {item}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default AppSidebar;
