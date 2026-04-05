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
    // Simulated login
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Login realizado com sucesso!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen gradient-login animate-gradient-shift flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-start pt-[12vh] relative z-10">
        {/* Left side - Branding */}
        <div className="animate-fade-in-up space-y-6 text-center md:text-left">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-foreground leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
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

        {/* Right side - Login form */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <form
            onSubmit={handleLogin}
            className="gradient-login-card rounded-2xl p-8 shadow-card space-y-6 max-w-sm mx-auto md:ml-auto"
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
