import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  title: string;
  icon?: React.ReactNode;
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
}

function DataTable<T extends object>({ title, icon, columns, data, loading }: DataTableProps<T>) {
  const [search, setSearch] = useState("");

  const filtered = data.filter((row) =>
    columns.some((col) => {
      const val = row[col.key];
      return val != null && String(val).toLowerCase().includes(search.toLowerCase());
    })
  );

  return (
    <div className="bg-card border border-border/50 rounded-xl shadow-sm animate-fade-in-up overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center gap-4 justify-between bg-gradient-to-r from-foreground/[0.02] to-transparent">
        <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
          {icon}
          {title}
          <span className="text-xs font-normal text-muted-foreground ml-auto sm:ml-2">({filtered.length})</span>
        </h3>
        <div className="relative w-full sm:w-56">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={16} />
          <Input
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 bg-background/50 text-sm border-border/50 rounded-lg"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto scrollbar-styled max-h-[400px] overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/30 sticky top-0 z-10 border-b border-border/50">
            <tr>
              {columns.map((col) => (
                <th key={String(col.key)} className="text-left px-6 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide whitespace-nowrap">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-border/20">
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-6 py-4">
                      <div className="skeleton-loading h-4 rounded w-3/4 bg-muted" />
                    </td>
                  ))}
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-12 text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <Search size={20} className="text-muted-foreground/50" />
                    <span>Nenhum registro encontrado</span>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-border/20 hover:bg-primary/5 transition-colors duration-150 cursor-pointer group"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-6 py-4 whitespace-nowrap text-foreground/80 group-hover:text-foreground transition-colors">
                      {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-border/50 bg-muted/20 text-xs text-muted-foreground flex items-center justify-between">
        <span>Total de registros: <strong>{data.length}</strong></span>
        <span>Exibindo: <strong>{filtered.length}</strong></span>
      </div>
    </div>
  );
}

export default DataTable;
