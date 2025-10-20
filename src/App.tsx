import React, { useState } from 'react';
// Asegúrate de que esta línea esté presente y la ruta sea correcta
import './app.css'; 

// Vistas
const VIEWS = {
  LANDING: 'landing',
  LOGIN: 'login',
  SIGNUP: 'signup',
} as const;
type ViewType = (typeof VIEWS)[keyof typeof VIEWS];

// --- Definiciones de Iconos 8-bit ---
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

// --- Botón primario 8-bit ---
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

// --- Componentes de Formulario (Dejados como placeholders) ---
// NOTA: Si tienes estos componentes, asegúrate de que usen el estilo 
//       <div className="bg-yellow-200 p-3 ac-box w-full" style={{ maxWidth: '320px' }}>
const LoginForm = ({ onBack }: { onBack: () => void }) => <div>Login Form Here</div>;
const SignupForm = ({ onBack }: { onBack: () => void }) => <div>Signup Form Here</div>;


// --- Pantalla de aterrizaje (Landing) SÚPER COMPACTA ---
const LandingView: React.FC<{ onLoginClick: () => void; onSignupClick: () => void }> = ({ onLoginClick, onSignupClick }) => (
  // AJUSTE FINAL DE TAMAÑO: Ancho máximo de 320px y padding mínimo.
  <div className="bg-yellow-200 p-3 ac-box w-full" style={{ maxWidth: '320px' }}> 
    
    {/* Banner Superior Estilo Mundo AC (Altura mínima h-10) */}
    <div className="ac-banner-blue h-10 w-full mb-2 ac-box relative overflow-hidden" style={{ backgroundColor: '#3b82f6' }}>
      {/* Elementos del Banner ajustados */}
      <div className="absolute w-4 h-4 bg-yellow-300 ac-box top-1 right-2 text-xs font-bold flex items-center justify-center border-2 border-gray-800 text-gray-800"></div>
      <div className="absolute w-6 h-6 bg-green-700 ac-box top-3 left-2 rounded-full border-2 border-gray-800"></div>
      <div className="absolute w-5 h-5 bg-green-700 ac-box top-1 right-5 rounded-full border-2 border-gray-800"></div>
    </div>
    
    {/* Icono de Mensaje (tamaño reducido) */}
    <div className="flex justify-center mb-2">
      <Lucide.MessageSquare className="w-7 h-7 text-green-700" style={{ textShadow: '2px 2px 0 #fff' }} />
    </div>
    
    {/* Título (usa el font-size de 2rem de app.css) */}
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

// --- Componente principal ---
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
    // 🟢 CLASE CORRECTA: min-h-screen asegura la altura de la ventana
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 ac-background">
      {renderContent()}
    </div>
  );
}