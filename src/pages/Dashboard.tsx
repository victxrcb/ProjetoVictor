import { useState, useEffect } from "react";
import AppSidebar from "@/components/AppSidebar";
import TopMenu from "@/components/TopMenu";
import DataTable from "@/components/DataTable";
import StatusBadge from "@/components/StatusBadge";
import { mockBorderos, mockAgendamentos } from "@/data/mockData";
import type { Bordero, Agendamento } from "@/data/mockData";
import { FileBarChart, CalendarClock } from "lucide-react";

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

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TopMenu />

        <main className="flex-1 p-6 space-y-6 scrollbar-styled overflow-y-auto">
          {/* Stats row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in-up">
            {[
              { label: "Borderôs Ativos", value: mockBorderos.length, color: "bg-primary/10 text-primary" },
              { label: "Agendamentos", value: mockAgendamentos.length, color: "bg-info/10 text-info" },
              { label: "Pendentes", value: mockAgendamentos.filter((a) => a.status === "pendente").length, color: "bg-warning/10 text-warning" },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-xl p-5 shadow-soft hover:shadow-card transition-shadow duration-300">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className={`text-3xl font-bold mt-1 ${stat.color.split(" ")[1]}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Tables */}
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
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
