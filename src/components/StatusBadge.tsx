import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "pendente" | "confirmado" | "recusado";
}

const statusConfig = {
  pendente: { 
    label: "Pendente", 
    className: "bg-amber-50 text-amber-700 border-amber-200",
    dotColor: "bg-amber-500"
  },
  confirmado: { 
    label: "Confirmado", 
    className: "bg-green-50 text-green-700 border-green-200",
    dotColor: "bg-green-500"
  },
  recusado: { 
    label: "Recusado", 
    className: "bg-red-50 text-red-700 border-red-200",
    dotColor: "bg-red-500"
  },
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = statusConfig[status];
  return (
    <span className={cn("inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:shadow-md", config.className)}>
      <span className={cn("w-2 h-2 rounded-full mr-2 animate-pulse", config.dotColor)} />
      {config.label}
    </span>
  );
};

export default StatusBadge;
