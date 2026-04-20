import { useNavigate, useLocation } from "react-router-dom";
import {
  LogOut, LayoutDashboard, FileText,
  Calendar, Settings, Users, MessageCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { roleLabels } from "@/types/auth";
import type { UserRole } from "@/types/auth";
import { cn } from "@/lib/utils";

interface MenuItem {
  label: string;
  icon: React.ElementType;
  path: string;
  roles?: UserRole[];
}

const allMenuItems: MenuItem[] = [
  { label: "Dashboard",     icon: LayoutDashboard, path: "/dashboard" },
  { label: "Borderôs",      icon: FileText,        path: "/borderos",      roles: ["admin", "operador", "confirmacao"] },
  { label: "Agendamentos",  icon: Calendar,        path: "/agendamentos", roles: ["admin", "confirmacao", "operador"] },
  { label: "Chat",          icon: MessageCircle,   path: "/chat" },
  { label: "Usuários",      icon: Users,           path: "/usuarios",     roles: ["admin"] },
  { label: "Configurações", icon: Settings,        path: "/configuracoes", roles: ["admin"] },
];

const roleBadgeStyle: Record<UserRole, string> = {
  admin:       "bg-white/20 text-white border-white/20",
  operador:    "bg-blue-400/20 text-blue-200 border-blue-400/20",
  confirmacao: "bg-emerald-400/20 text-emerald-200 border-emerald-400/20",
};

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, hasRole } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logout realizado com sucesso!");
    navigate("/");
  };

  const menuItems = allMenuItems.filter(
    (item) => !item.roles || hasRole(item.roles)
  );

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-56 shrink-0 flex flex-col min-h-screen animate-slide-in-left bg-gradient-to-b from-purple-950 via-purple-900 to-purple-950">

      {/* ── Logo ─────────────────────────────────────────── */}
      <div className="px-5 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          {/* Ícone */}
          <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center shadow-inner">
            <div className="w-4 h-4 rounded-md bg-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white leading-none">Dell cred</h1>
            <p className="text-[11px] text-purple-300 mt-0.5">Platform</p>
          </div>
        </div>
      </div>

      {/* ── User card ────────────────────────────────────── */}
      <div className="mx-3 mt-4 rounded-xl bg-white/10 border border-white/10 px-3 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0 text-white font-bold text-sm">
            {user?.nome?.charAt(0) ?? "?"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white truncate leading-none mb-0.5">
              {user?.nome ?? "—"}
            </p>
            <p className="text-[11px] text-purple-300 truncate">{user?.email ?? ""}</p>
          </div>
        </div>
        {user && (
          <span className={cn(
            "inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium border",
            roleBadgeStyle[user.role]
          )}>
            {roleLabels[user.role]}
          </span>
        )}
      </div>

      {/* ── Navegação ────────────────────────────────────── */}
      <nav className="flex-1 px-3 py-5 space-y-0.5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-purple-400 px-2 mb-3">
          Menu Principal
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                active
                  ? "bg-white text-purple-900 shadow-md shadow-black/20"
                  : "text-purple-200 hover:text-white hover:bg-white/10"
              )}
            >
              <Icon
                size={17}
                className={cn(
                  "shrink-0 transition-transform",
                  active ? "text-purple-700" : "group-hover:scale-110"
                )}
              />
              <span className="flex-1 text-left truncate">{item.label}</span>
              {active && (
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              )}
            </button>
          );
        })}
      </nav>

      {/* ── Logout ───────────────────────────────────────── */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-300 hover:text-red-200 hover:bg-red-500/15 transition-all duration-200 group"
        >
          <LogOut size={17} className="shrink-0 group-hover:scale-110 transition-transform" />
          <span className="flex-1 text-left">Sair da conta</span>
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;
