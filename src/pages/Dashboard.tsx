import { useState, useEffect } from "react";
import AppSidebar from "@/components/AppSidebar";
import TopMenu from "@/components/TopMenu";
import DataTable from "@/components/DataTable";
import StatusBadge from "@/components/StatusBadge";
import { mockBorderos, mockAgendamentos } from "@/data/mockData";
import type { Bordero, Agendamento } from "@/data/mockData";
import { FileBarChart, CalendarClock, TrendingUp, AlertCircle } from "lucide-react";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const borderoColumns = [
    { key: "data" as keyof Bordero, label: "Data" },
    { key: "numero" as keyof Bordero, label: "Borderô" },
    { key: "cedente" as keyof Bordero, label: "Cedente" },
    { key: "sacados" as keyof Bordero, label: "Nº Sacados" },
    { key: "unidade" as keyof Bordero, label: "Unidade" },
    { key: "contato" as keyof Bordero, label: "Contato" },
  ];

  const agendamentoColumns = [
    { key: "data" as keyof Agendamento, label: "Data" },
    { key: "bordero" as keyof Agendamento, label: "Borderô" },
    { key: "cedente" as keyof Agendamento, label: "Cedente" },
    {
      key: "status" as keyof Agendamento,
      label: "Status",
      render: (value: Agendamento[keyof Agendamento]) => (
        <StatusBadge status={value as Agendamento["status"]} />
      ),
    },
    { key: "retorno" as keyof Agendamento, label: "Retorno" },
  ];

  const statsData = [
    { 
      label: "Borderôs Ativos", 
      value: mockBorderos.length, 
      icon: FileBarChart,
      color: "from-blue-50 to-blue-100",
      textColor: "text-blue-600",
      trend: "+12%",
      trendUp: true
    },
    { 
      label: "Agendamentos Totais", 
      value: mockAgendamentos.length, 
      icon: CalendarClock,
      color: "from-purple-50 to-purple-100",
      textColor: "text-purple-600",
      trend: "+5%",
      trendUp: true
    },
    { 
      label: "Pendentes", 
      value: mockAgendamentos.filter((a) => a.status === "pendente").length, 
      icon: AlertCircle,
      color: "from-amber-50 to-amber-100",
      textColor: "text-amber-600",
      trend: "-3%",
      trendUp: false
    },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TopMenu />

        <main className="flex-1 p-6 space-y-6 scrollbar-styled overflow-y-auto">
          {/* Header Section */}
          <div className="animate-fade-in-up">
            <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard</h2>
            <p className="text-sm text-muted-foreground">Bem-vindo! Aqui está um resumo da sua atividade</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            {statsData.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="group relative overflow-hidden rounded-xl border border-border/50 bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/30"
                  style={{ animationDelay: `${(idx + 1) * 0.05}s` }}
                >
                  {/* Decorative gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10`} />

                  {/* Content */}
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                        <h3 className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</h3>
                      </div>
                      <div className={`rounded-lg p-3 bg-gradient-to-br ${stat.color}`}>
                        <Icon size={24} className={stat.textColor} />
                      </div>
                    </div>
                    
                    {/* Trend indicator */}
                    <div className="flex items-center gap-1 text-xs">
                      <TrendingUp size={14} className={stat.trendUp ? "text-green-600" : "text-red-600"} />
                      <span className={stat.trendUp ? "text-green-600" : "text-red-600"}>
                        {stat.trend} vs mês anterior
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tables Section */}
          <div className="space-y-6">
            <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <h3 className="text-lg font-semibold text-foreground mb-4">Dados Operacionais</h3>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <DataTable
                  title="BORDERÔS"
                  icon={<FileBarChart size={20} className="text-primary" />}
                  columns={borderoColumns}
                  data={mockBorderos}
                  loading={loading}
                />
                <DataTable
                  title="AGENDAMENTOS"
                  icon={<CalendarClock size={20} className="text-primary" />}
                  columns={agendamentoColumns}
                  data={mockAgendamentos}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
