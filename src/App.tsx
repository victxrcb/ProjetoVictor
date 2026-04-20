import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Borderos from "./pages/Borderos";
import Agendamentos from "./pages/Agendamentos";
import Chat from "./pages/Chat";
import Usuarios from "./pages/Usuarios";
import Configuracoes from "./pages/Configuracoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Pública */}
            <Route path="/" element={<Index />} />

            {/* Todos os perfis autenticados */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route
              path="/borderos"
              element={
                <ProtectedRoute roles={['admin', 'operador', 'confirmacao']}>
                  <Borderos />
                </ProtectedRoute>
              }
            />
            <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />

            {/* Admin + Op. Confirmação */}
            <Route
              path="/agendamentos"
              element={
                <ProtectedRoute roles={['admin', 'confirmacao', 'operador']}>
                  <Agendamentos />
                </ProtectedRoute>
              }
            />

            {/* Somente Admin */}
            <Route
              path="/usuarios"
              element={
                <ProtectedRoute roles={['admin']}>
                  <Usuarios />
                </ProtectedRoute>
              }
            />
            <Route
              path="/configuracoes"
              element={
                <ProtectedRoute roles={['admin']}>
                  <Configuracoes />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
