import React, { useState } from 'react';

// Definición de las constantes de vista para el estado de navegación
const VIEWS = {
  LANDING: 'landing',
  LOGIN: 'login',
  SIGNUP: 'signup',
} as const; // 'as const' para asegurar tipos string literales

type ViewType = (typeof VIEWS)[keyof typeof VIEWS];

// Implementación básica de SVG para los íconos (Lucide, adaptados para look 8-bit con stroke-width 3)
const Lucide = {
  MessageSquare: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
  ),
  LogIn: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
  ),
  UserPlus: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="22" y1="11" x2="16" y2="11"></line></svg>
  ),
  ArrowLeft: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
  ),
};

// --- Componentes Reutilizables de Estilo ---

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  Icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  colorClass?: string;
  onClick?: () => void;
}

/**
 * Botón primario estilizado con look 8-bit.
 */
const PrimaryButton: React.FC<ButtonProps> = ({ text, onClick, Icon, type = 'button', colorClass = 'bg-blue-500 hover:bg-blue-600', ...rest }) => (
  <button
    type={type}
    onClick={onClick}
    className={`w-full flex items-center justify-center space-x-3 text-white font-bold pixel-button ${colorClass} 
                transition-none border-3 border-[#1f1f1f] shadow-2xl active:shadow-none active:translate-y-[5px]`}
    {...rest}
  >
    {Icon && <Icon className="w-4 h-4 text-white" />}
    <span className="text-xs">{text}</span>
  </button>
);

/**
 * Botón de retroceso para volver a la pantalla principal.
 */
const BackButton: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <button
    onClick={onBack}
    className="absolute top-4 left-4 p-2 text-white bg-red-600 hover:bg-red-700 focus:outline-none w-10 h-10 flex items-center justify-center
               pixel-box pixel-button active:shadow-none active:translate-y-[5px] transition-none"
    aria-label="Volver a la página principal"
  >
    <Lucide.ArrowLeft className="w-4 h-4" />
  </button>
);

interface FormContainerProps {
  title: string;
  onBack: () => void;
  message: string;
  children: React.ReactNode;
}

/**
 * Contenedor de formulario con estilo base de pantalla de consola 8-bit.
 */
const FormContainer: React.FC<FormContainerProps> = ({ title, onBack, message, children }) => (
  <div className="bg-gray-200 p-8 md:p-12 max-w-lg w-full relative pixel-box">
    <BackButton onBack={onBack} />
    <div className="text-center mb-6 mt-4">
      <h2 className="text-xl font-bold text-gray-800 mb-1">{title}</h2>
      <p className="text-xs text-gray-600 mt-2">Introduce tus datos en la pantalla.</p>
    </div>
    
    {/* Contenedor de mensaje de estado/error */}
    {message && (
      <div className="p-3 mb-4 pixel-box bg-green-300 text-gray-800 text-center text-xs">
        {message}
      </div>
    )}

    {children}
  </div>
);

// --- Componentes de Formularios ---

const LoginForm: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('BUSCANDO USUARIO...');
    // Lógica de inicio de sesión simulada
    setTimeout(() => {
        setMessage('¡SESIÓN INICIADA! A CHATEAR.');
    }, 1500);
  };

  return (
    <FormContainer title="Iniciar Sesión" onBack={onBack} message={message}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="emailLogin" className="block text-xs text-gray-800 text-left mb-1">
            Correo E
          </label>
          <input
            type="email"
            id="emailLogin"
            placeholder="ESCRIBE AQUÍ"
            value={email}
            onChange={(e) => {setEmail(e.target.value); setMessage('')}}
            required
            className="w-full pixel-input"
          />
        </div>
        <div>
          <label htmlFor="passwordLogin" className="block text-xs text-gray-800 text-left mb-1">
            Contraseña
          </label>
          <input
            type="password"
            id="passwordLogin"
            placeholder="ESCRIBE AQUÍ"
            value={password}
            onChange={(e) => {setPassword(e.target.value); setMessage('')}}
            required
            className="w-full pixel-input"
          />
        </div>
        <PrimaryButton text="ENTRAR" type="submit" Icon={Lucide.LogIn} colorClass="bg-green-500 hover:bg-green-600" />
      </form>
    </FormContainer>
  );
};

const SignupForm: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('CREANDO CUENTA...');
    // Lógica de creación de cuenta simulada
    setTimeout(() => {
        setMessage(`¡CUENTA CREADA! BIENVENIDO, ${username.toUpperCase()}.`);
    }, 1500);
  };

  return (
    <FormContainer title="Crear Cuenta" onBack={onBack} message={message}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="usernameSignup" className="block text-xs text-gray-800 text-left mb-1">
            Nombre
          </label>
          <input
            type="text"
            id="usernameSignup"
            placeholder="ESCRIBE AQUÍ"
            value={username}
            onChange={(e) => {setUsername(e.target.value); setMessage('')}}
            required
            className="w-full pixel-input"
          />
        </div>
        <div>
          <label htmlFor="emailSignup" className="block text-xs text-gray-800 text-left mb-1">
            Correo E
          </label>
          <input
            type="email"
            id="emailSignup"
            placeholder="ESCRIBE AQUÍ"
            value={email}
            onChange={(e) => {setEmail(e.target.value); setMessage('')}}
            required
            className="w-full pixel-input"
          />
        </div>
        <div>
          <label htmlFor="passwordSignup" className="block text-xs text-gray-800 text-left mb-1">
            Contraseña
          </label>
          <input
            type="password"
            id="passwordSignup"
            placeholder="ESCRIBE AQUÍ"
            value={password}
            onChange={(e) => {setPassword(e.target.value); setMessage('')}}
            required
            minLength={8}
            className="w-full pixel-input"
          />
        </div>
        <PrimaryButton text="REGISTRAR" type="submit" Icon={Lucide.UserPlus} colorClass="bg-red-500 hover:bg-red-600" />
      </form>
    </FormContainer>
  );
};

// --- Componente de la Pantalla de Aterrizaje (Landing) ---

const LandingView: React.FC<{ onLoginClick: () => void; onSignupClick: () => void }> = ({ onLoginClick, onSignupClick }) => (
  <div className="bg-yellow-200 p-8 md:p-12 pixel-box max-w-xl w-full">
    
    {/* Elemento decorativo Animal Crossing: cielo y árboles pixelados */}
    <div className="bg-blue-400 h-20 w-full mb-6 pixel-box border-b-4 border-gray-600 relative overflow-hidden">
        {/* Sol */}
        <div className="absolute w-8 h-8 bg-yellow-300 pixel-box top-2 right-4 text-xs font-bold pt-1 flex items-center justify-center">☀</div>
        {/* Árboles (Círculos para simular hojas) */}
        <div className="absolute w-12 h-12 bg-green-700 pixel-box top-8 left-4 rounded-full"></div>
        <div className="absolute w-10 h-10 bg-green-700 pixel-box top-4 right-10 rounded-full"></div>
    </div>
    
    <div className="flex justify-center mb-6">
      <Lucide.MessageSquare className="w-16 h-16 text-green-700" />
    </div>

    <h1 className="title-text tracking-wider mb-6 text-4xl sm:text-5xl md:text-6xl">
      Talkie Town
    </h1>

    <p className="text-xs text-gray-800 mb-8 p-3 bg-green-300 pixel-box inline-block">
        ¡Bienvenido al pueblo!
    </p>

    <div className="space-y-4">
      <PrimaryButton
        text="Iniciar Sesión"
        onClick={onLoginClick}
        Icon={Lucide.LogIn}
        colorClass="bg-blue-500 hover:bg-blue-600"
      />
      <PrimaryButton
        text="Crear Cuenta"
        onClick={onSignupClick}
        Icon={Lucide.UserPlus}
        colorClass="bg-red-500 hover:bg-red-600"
      />
    </div>

    <p className="text-gray-800 mt-8 text-xs">
        Pulsa un botón para empezar...
    </p>
  </div>
);


// --- Componente Principal de la Aplicación ---

export default function App() {
  // Estado para controlar qué pantalla se muestra
  const [currentView, setCurrentView] = useState<ViewType>(VIEWS.LANDING);

  // Define los estilos CSS personalizados para el look 8-bit (usando template literals)
  const customStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
    
    /* Configuración de la fuente */
    body { font-family: 'Press Start 2P', cursive; }
    
    /* Estilo general para cajas y formularios (look de pantalla de consola) */
    .pixel-box {
        border: 4px solid #1f1f1f;
        box-shadow: 8px 8px 0 0 #1f1f1f;
        border-radius: 0;
        text-align: center;
    }

    /* Styling para los botones 8-bit */
    .pixel-button {
        transition: none;
        border: 3px solid #1f1f1f;
        box-shadow: 0 5px 0 0 #1f1f1f;
        border-radius: 0;
    }

    /* Efecto al hacer click en el botón (se "presiona") */
    .pixel-button:active {
        box-shadow: none !important; 
        transform: translateY(5px) !important; 
    }
    
    /* Estilo para el título de Talkie Town */
    .title-text {
        color: #ffda7a; /* Color interno (amarillo claro) */
        -webkit-text-stroke: 2px #3d2f1f; /* Contorno (marrón oscuro) */
        text-stroke: 2px #3d2f1f;
        line-height: 1.1;
        font-size: 3rem; 
    }
    @media (min-width: 640px) {
        .title-text { font-size: 4rem; }
    }

    /* Estilo para campos de entrada */
    .pixel-input {
        border: 2px solid #1f1f1f;
        box-shadow: inset 0 2px 0 0 #1f1f1f, inset 0 -2px 0 0 #fff; /* Sombra interna para efecto hundido */
        border-radius: 0;
        background-color: #ffffff;
        font-size: 0.7rem;
        padding: 0.5rem 0.75rem;
        -webkit-appearance: none; 
        -moz-appearance: none;
        appearance: none;
        color: #1f1f1f;
    }

    /* Fondo de Animal Crossing */
    .ac-background {
        background-color: #5d8e56; /* Verde/tierra */
        background-image: repeating-linear-gradient(45deg, #4f7847 0, #4f7847 1px, transparent 1px, transparent 2px);
    }
  `;

  // Función para renderizar el contenido basado en el estado
  const renderContent = () => {
    switch (currentView) {
      case VIEWS.LOGIN:
        return <LoginForm onBack={() => setCurrentView(VIEWS.LANDING)} />;
      case VIEWS.SIGNUP:
        return <SignupForm onBack={() => setCurrentView(VIEWS.LANDING)} />;
      case VIEWS.LANDING:
      default:
        return (
          <LandingView
            onLoginClick={() => setCurrentView(VIEWS.LOGIN)}
            onSignupClick={() => setCurrentView(VIEWS.SIGNUP)}
          />
        );
    }
  };

  return (
    // Contenedor principal
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 ac-background">
      {/* Inyección de estilos CSS personalizados */}
      <style>{customStyles}</style>
      
      {renderContent()}
    </div>
  );
}