import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogIn, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuario || !senha) {
      toast.error("Preencha todos os campos");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Login realizado com sucesso!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen gradient-login animate-gradient-shift flex relative overflow-hidden">
      {/* Animated floating orbs */}
      <div className="absolute top-[10%] left-[5%] w-80 h-80 bg-primary/8 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-float-medium" />
      <div className="absolute top-[50%] left-[40%] w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float-fast" />
      <div className="absolute top-[20%] right-[30%] w-48 h-48 bg-accent/10 rounded-full blur-2xl animate-float-medium" />

      {/* Left side - Branding (vertically centered) */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 relative z-10">
        <div className="animate-fade-in-up space-y-6 max-w-xl">
          <h1
            className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-foreground leading-[0.95]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            CONFIRMAÇÃO
            <br />
            EXATA
          </h1>
          <p className="text-lg text-muted-foreground max-w-md">
            Precisão, eficiência e exatidão.
            <br />
            Seu braço direito na confirmação.
          </p>
        </div>
      </div>

      {/* Right side - Login form (fixed to the right, vertically centered) */}
      <div className="w-full max-w-md flex items-center justify-center px-6 md:px-10 relative z-10">
        <div className="animate-fade-in-up w-full" style={{ animationDelay: "0.2s" }}>
          <form
            onSubmit={handleLogin}
            className="gradient-login-card rounded-2xl p-8 shadow-card space-y-6 w-full"
          >
            <h2 className="text-3xl font-bold text-foreground text-center">Login</h2>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Usuário</label>
              <Input
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Digite seu usuário"
                className="bg-card/80 border-border/50 focus:ring-primary h-11"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Senha</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Digite sua senha"
                  className="bg-card/80 border-border/50 focus:ring-primary h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-base font-semibold btn-ripple bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Entrando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn size={18} />
                  Entrar
                </span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
