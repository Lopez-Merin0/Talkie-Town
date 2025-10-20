import React, { useState } from 'react';
import './app.css'; 

// 🟢 Mantenemos la importación del backend simulado (api.js)
import { loginUser, signupUser } from './api'; 

// --- 1. Definiciones Compartidas (Movidas aquí para evitar errores de importación) ---

// Vistas
const VIEWS = {
  LANDING: 'landing',
  LOGIN: 'login',
  SIGNUP: 'signup',
  // FUTURE: 'main'
} as const;
type ViewType = (typeof VIEWS)[keyof typeof VIEWS];

// Definiciones de Iconos SVG (Lucide)
const Lucide = {
  MessageSquare: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  ),
  LogIn: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
      <polyline points="10 17 15 12 10 7"></polyline>
      <line x1="15" y1="12" x2="3" y2="12"></line>
    </svg>
  ),
  UserPlus: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <line x1="19" y1="8" x2="19" y2="14"></line>
      <line x1="22" y1="11" x2="16" y2="11"></line>
    </svg>
  ),
  ArrowLeft: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
  ),
};

// Componente Botón Primario
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  Icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  bgColor: string; 
  shadowColor: string; 
  textColor?: string;
  iconColor?: string;
}
const PrimaryButton: React.FC<ButtonProps> = ({ 
  text, 
  Icon, 
  bgColor, 
  shadowColor, 
  textColor = 'white', 
  iconColor = 'white', 
  ...rest 
}) => (
  <button
    className={`w-full flex items-center justify-center space-x-2 font-bold text-xs ac-button`} 
    style={{
      backgroundColor: bgColor,
      color: textColor,
      boxShadow: `0 4px 0 0 ${shadowColor}`, 
    }}
    {...rest}
  >
    {Icon && <Icon className={`w-4 h-4`} style={{ color: iconColor }} />}
    <span className="text-xs tracking-wide">{text.toUpperCase()}</span> 
  </button>
);


// --- 2. Componentes de Formularios (Lógica y UI) ---

// Contenedor base para todos los formularios
interface FormContainerProps {
  title: string;
  onBack: () => void;
  children: React.ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ title, onBack, children }) => (
  <div className="bg-yellow-200 p-3 ac-box w-full relative" style={{ maxWidth: '320px' }}>
    <button 
        onClick={onBack} 
        className="absolute top-3 left-3 p-1 border-none bg-transparent"
        aria-label="Volver atrás"
    >
        <Lucide.ArrowLeft className="w-5 h-5 text-gray-800" />
    </button>
    <h2 className="ac-title-text text-center mb-4 text-xl mt-6" style={{ fontSize: '1.5rem', WebkitTextStroke: '1px var(--color-title-stroke)' }}>
        {title.toUpperCase()}
    </h2>
    <div className="space-y-4">
        {children}
    </div>
  </div>
);

// Formulario de Inicio de Sesión
const LoginForm: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [email, setEmail] = useState('test@town.com');
  const [password, setPassword] = useState('password123');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setMessage('Cargando...');
      
      const result = await loginUser(email, password); 
      
      if (result.success) {
          setMessage(`¡Hola, ${result.user.username}! Sesión iniciada.`);
          // Aquí se gestionaría la redirección o el estado de la app
      } else {
          setMessage(`Error: ${result.message}`);
      }
      setIsLoading(false);
  };

  return (
      <FormContainer title="Iniciar Sesión" onBack={onBack}>
          <form onSubmit={handleSubmit} className="space-y-3">
              <input
                  type="email"
                  placeholder="CORREO"
                  className="ac-input w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
              />
              <input
                  type="password"
                  placeholder="CONTRASEÑA"
                  className="ac-input w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
              />
              
              <PrimaryButton 
                  type="submit"
                  text={isLoading ? "ESPERA..." : "¡ENTRAR!"}
                  Icon={Lucide.LogIn} 
                  bgColor="#2563eb" 
                  shadowColor="#1e40af" 
                  disabled={isLoading}
              />
          </form>
          {message && <p className="text-xs mt-3 p-1 bg-white ac-box">{message}</p>}
      </FormContainer>
  );
};

// Formulario de Crear Cuenta
const SignupForm: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setMessage('Cargando...');

      const result = await signupUser(username, email, password); 

      if (result.success) {
          setMessage(`¡Éxito! Cuenta creada para ${username}. Por favor, vuelve y entra.`);
          setUsername('');
          setEmail('');
          setPassword('');
      } else {
          setMessage(`Error: ${result.message}`);
      }
      setIsLoading(false);
  };

  return (
      <FormContainer title="Crear Cuenta" onBack={onBack}>
          <form onSubmit={handleSubmit} className="space-y-3">
              <input
                  type="text"
                  placeholder="NOMBRE DE USUARIO"
                  className="ac-input w-full"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={isLoading}
              />
              <input
                  type="email"
                  placeholder="CORREO"
                  className="ac-input w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
              />
              <input
                  type="password"
                  placeholder="CONTRASEÑA"
                  className="ac-input w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
              />
              
              <PrimaryButton 
                  type="submit"
                  text={isLoading ? "ESPERA..." : "REGISTRARME"}
                  Icon={Lucide.UserPlus} 
                  bgColor="#dc2626" 
                  shadowColor="#991b1b" 
                  disabled={isLoading}
              />
          </form>
          {message && <p className="text-xs mt-3 p-1 bg-white ac-box">{message}</p>}
      </FormContainer>
  );
};


// --- 3. Pantalla de aterrizaje (Landing) ---
const LandingView: React.FC<{ onLoginClick: () => void; onSignupClick: () => void }> = ({ onLoginClick, onSignupClick }) => (
  <div className="bg-yellow-200 p-3 ac-box w-full relative" style={{ maxWidth: '320px' }}> 
    
    {/* Banner Superior Estilo Mundo AC */}
    <div className="ac-banner-blue h-10 w-full mb-2 ac-box relative overflow-hidden" style={{ backgroundColor: '#3b82f6' }}>
      <div className="absolute w-6 h-6 bg-green-700 ac-box top-3 left-2 rounded-full border-2 border-gray-800"></div>
      <div className="absolute w-5 h-5 bg-green-700 ac-box top-1 right-5 rounded-full border-2 border-gray-800"></div>
    </div>
    
    {/* Icono de Mensaje */}
    <div className="flex justify-center mb-2">
      <Lucide.MessageSquare className="w-7 h-7 text-green-700" style={{ textShadow: '2px 2px 0 #fff' }} />
    </div>
    
    {/* Título */}
    <h1 className="ac-title-text text-center mb-2">Talkie Town</h1> 
    
    {/* Mensaje de Bienvenida */}
    <p 
      className="text-xs text-white mb-2 p-1 ac-box inline-block tracking-wider font-bold" 
      style={{ backgroundColor: 'var(--color-welcome-bg)', color: 'white' }}
    >
      ¡BIENVENIDO AL PUEBLO!
    </p>
    
    {/* Botones de Acción */}
    <div className="space-y-2"> 
      <PrimaryButton 
        text="Iniciar Sesión" 
        onClick={onLoginClick} 
        Icon={Lucide.LogIn} 
        bgColor="#2563eb" 
        shadowColor="#1e40af" 
      />
      <PrimaryButton 
        text="Crear Cuenta" 
        onClick={onSignupClick} 
        Icon={Lucide.UserPlus} 
        bgColor="#dc2626" 
        shadowColor="#991b1b" 
      />
    </div>
    
    {/* Pie de Página */}
    <p className="text-gray-800 mt-2 text-[0.6rem] text-center tracking-wider">
      Pulsa un botón para empezar...
    </p>
  </div>
);

// --- 4. Componente principal (App) ---
export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>(VIEWS.LANDING);

  const renderContent = () => {
    switch (currentView) {
      case VIEWS.LOGIN: return <LoginForm onBack={() => setCurrentView(VIEWS.LANDING)} />;
      case VIEWS.SIGNUP: return <SignupForm onBack={() => setCurrentView(VIEWS.LANDING)} />;
      default: return <LandingView onLoginClick={() => setCurrentView(VIEWS.LOGIN)} onSignupClick={() => setCurrentView(VIEWS.SIGNUP)} />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 ac-background">
      {renderContent()}
    </div>
  );
}