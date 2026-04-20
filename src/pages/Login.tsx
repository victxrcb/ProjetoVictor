import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erros, setErros] = useState<{ usuario?: string; senha?: string }>({});

  const validar = () => {
    const novosErros: typeof erros = {};
    if (!usuario.trim()) novosErros.usuario = "Usuário é obrigatório";
    if (!senha) novosErros.senha = "Senha é obrigatória";
    if (senha && senha.length < 6) novosErros.senha = "Senha deve ter no mínimo 6 caracteres";
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validar()) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    const ok = login(usuario, senha);
    if (ok) {
      toast.success("Login realizado com sucesso!");
      navigate("/dashboard");
    } else {
      toast.error("Usuário ou senha inválidos.");
      setErros({ usuario: " ", senha: "Credenciais inválidas" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col justify-center relative overflow-hidden rounded-3xl">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700" />
          
          {/* Decorative elements */}
          <div className="absolute top-8 right-8 w-20 h-20 border border-purple-400/30 rounded-full" />
          <div className="absolute top-16 right-16 w-3 h-3 bg-purple-300 rounded-full" />
          <div className="absolute bottom-24 right-12 w-2 h-2 bg-purple-300 rounded-full" />
          
          {/* Abstract wave decoration - top right */}
          <div className="absolute top-0 right-0 w-40 h-40 opacity-20">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M0,100 Q50,50 100,100 T200,100" stroke="white" strokeWidth="2" fill="none" />
              <path d="M0,120 Q50,70 100,120 T200,120" stroke="white" strokeWidth="1" fill="none" opacity="0.5" />
              <path d="M0,80 Q50,30 100,80 T200,80" stroke="white" strokeWidth="1" fill="none" opacity="0.3" />
            </svg>
          </div>

          {/* Abstract shapes - bottom left */}
          <div className="absolute bottom-0 left-0 w-48 h-48 opacity-10">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M0,0 Q100,0 100,100 Q100,200 0,200" stroke="white" strokeWidth="2" fill="none" />
              <path d="M20,20 Q100,20 100,100 Q100,180 20,180" stroke="white" strokeWidth="1" fill="none" opacity="0.5" />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 text-white space-y-4 px-8 py-12">
            <h1 className="text-5xl font-bold leading-tight">Seja bem-vindo!</h1>
            <p className="text-purple-100 text-lg max-w-sm">
              Você pode fazer login para acessar com sua conta existente.
            </p>
          </div>

          {/* Decorative grid - bottom right */}
          <div className="absolute bottom-8 right-8 grid grid-cols-4 gap-1.5">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-purple-300 rounded-full opacity-40" />
            ))}
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 max-w-md w-full mx-auto lg:mx-0 animate-fade-in-up">
          {/* Logo/Header */}
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
            <p className="text-sm text-gray-500">Welcome to Dell cred</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Campo Usuário/Email */}
            <div className="space-y-2">
              <label htmlFor="usuario" className="text-sm text-gray-700 font-medium">
                Username or email
              </label>
              <Input
                id="usuario"
                type="text"
                value={usuario}
                onChange={(e) => {
                  setUsuario(e.target.value);
                  if (erros.usuario) setErros({ ...erros, usuario: undefined });
                }}
                placeholder="you@example.com"
                className={`h-11 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 transition-all focus:bg-white focus:border-purple-500 ${
                  erros.usuario ? "border-red-500 bg-red-50/30" : ""
                }`}
                disabled={loading}
              />
              {erros.usuario && <p className="text-xs text-red-500 mt-1">{erros.usuario}</p>}
            </div>

            {/* Campo Senha */}
            <div className="space-y-2">
              <label htmlFor="senha" className="text-sm text-gray-700 font-medium">
                Password
              </label>
              <div className="relative">
                <Input
                  id="senha"
                  type={showPassword ? "text" : "password"}
                  value={senha}
                  onChange={(e) => {
                    setSenha(e.target.value);
                    if (erros.senha) setErros({ ...erros, senha: undefined });
                  }}
                  placeholder="••••••••"
                  className={`h-11 bg-gray-50 border border-gray-200 rounded-lg pr-10 text-gray-900 placeholder:text-gray-400 transition-all focus:bg-white focus:border-purple-500 ${
                    erros.senha ? "border-red-500 bg-red-50/30" : ""
                  }`}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {erros.senha && <p className="text-xs text-red-500 mt-1">{erros.senha}</p>}
            </div>

            {/* Lembrar-me e Esqueceu a senha */}
            <div className="flex items-center justify-between text-sm pt-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  disabled={loading}
                />
                <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer hover:text-gray-900 transition-colors">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-purple-600 hover:text-purple-700 font-medium transition-colors text-xs">
                Forgot password?
              </a>
            </div>

            {/* Botão Login */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-200"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Hint de credenciais */}
          <div className="rounded-lg border border-purple-100 bg-purple-50 p-3 text-xs text-purple-700 space-y-1">
            <p className="font-semibold mb-1">Credenciais de acesso:</p>
            <p><span className="font-medium">Admin:</span> admin@dellcred.com / admin123</p>
            <p><span className="font-medium">Operador:</span> victor@dellcred.com / oper123</p>
            <p><span className="font-medium">Confirmação:</span> carlos@dellcred.com / conf123</p>
          </div>
        </div>
      </div>

      {/* Mobile branding */}
      <div className="absolute top-6 left-6 lg:hidden">
        <h1 className="text-2xl font-bold text-gray-900">Dell cred</h1>
      </div>
    </div>
  );
};

export default Login;
