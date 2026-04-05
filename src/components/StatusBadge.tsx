import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "pendente" | "confirmado" | "recusado";
}

const statusConfig = {
  pendente: { label: "Pendente", className: "bg-warning/15 text-warning border-warning/30" },
  confirmado: { label: "Confirmado", className: "bg-success/15 text-success border-success/30" },
  recusado: { label: "Recusado", className: "bg-destructive/15 text-destructive border-destructive/30" },
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = statusConfig[status];
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border", config.className)}>
      <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5", {
        "bg-warning": status === "pendente",
        "bg-success": status === "confirmado",
        "bg-destructive": status === "recusado",
      })} />
      {config.label}
    </span>
  );
};

export default StatusBadge;
