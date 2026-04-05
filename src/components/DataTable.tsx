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
    <div className="glass rounded-xl shadow-card animate-fade-in-up overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          {icon}
          {title}
        </h3>
        <div className="relative w-full sm:w-56">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 bg-background/60 text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto scrollbar-styled max-h-[400px] overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 sticky top-0 z-10">
            <tr>
              {columns.map((col) => (
                <th key={String(col.key)} className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider whitespace-nowrap">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-3">
                      <div className="skeleton-loading h-4 rounded w-3/4" />
                    </td>
                  ))}
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-12 text-muted-foreground">
                  Nenhum registro encontrado
                </td>
              </tr>
            ) : (
              filtered.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-border/30 hover:bg-primary/5 transition-colors duration-150 cursor-pointer"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-3 whitespace-nowrap">
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
      <div className="px-5 py-3 border-t border-border/50 text-xs text-muted-foreground">
        {filtered.length} registro{filtered.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
}

export default DataTable;
