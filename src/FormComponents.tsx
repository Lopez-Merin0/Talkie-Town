// FormComponents.tsx

import React, { useState } from 'react';
import './app.css'; // Asegúrate de que el CSS esté importado
// 🟢 Asumimos que LucideIcons está en un archivo separado, sino, copia las definiciones aquí.
import { Lucide } from './LucideIcons'; 
// 🟢 Importa las funciones del backend simulado
import { loginUser, signupUser } from './api'; 

// -------------------------------------------------------------------
// --- Componente de Entrada de Formulario con Label/Placeholder ---
// -------------------------------------------------------------------

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
}

const FormInput: React.FC<FormInputProps> = ({ placeholder, ...rest }) => (
    <div className="ac-input-container w-full">
        <div className="ac-input-header text-xs text-gray-700 tracking-wider">
            {placeholder.toUpperCase()}
        </div>
        <input
            {...rest}
            placeholder="" 
            className="ac-input-field w-full"
        />
    </div>
);


// -------------------------------------------------------------------
// --- Botón Primario ---
// -------------------------------------------------------------------
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    Icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
    bgColor: string; 
    shadowColor: string; 
    textColor?: string;
    iconColor?: string;
}
const PrimaryButton: React.FC<ButtonProps> = ({ text, Icon, bgColor, shadowColor, textColor = 'white', iconColor = 'white', ...rest }) => (
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


// -------------------------------------------------------------------
// --- Componente de Contenedor de Formulario (CORREGIDO) ---
// -------------------------------------------------------------------
interface FormContainerProps {
    title: string;
    onBack: () => void;
    children: React.ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ title, onBack, children }) => (
    <div className="bg-yellow-200 p-3 ac-box w-full relative" style={{ maxWidth: '320px' }}>
        
        {/* Botón de Atrás - POSICIÓN Y ESTILO AJUSTADOS */}
        <button 
            onClick={onBack} 
            // Clase ac-box para el borde/sombra de la imagen
            className="absolute top-3 left-3 p-1 border-none bg-white ac-box flex items-center justify-center" 
            style={{ width: '30px', height: '30px', zIndex: 10 }} // zIndex para asegurar que esté por encima del título
            aria-label="Volver atrás"
        >
            <Lucide.ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>

        {/* Título del Formulario - MARGEN SUPERIOR AJUSTADO */}
        <h2 className="ac-title-text text-center mb-6 text-xl mt-6" style={{ fontSize: '1.5rem', WebkitTextStroke: '1px var(--color-title-stroke)' }}>
            {title.toUpperCase()}
        </h2>
        
        <div className="space-y-4">
            {children}
        </div>
    </div>
);


// -------------------------------------------------------------------
// --- 1. Formulario de Inicio de Sesión ---
// -------------------------------------------------------------------
export const LoginForm: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('Cargando...');
        
        const result = await loginUser(email, password); 
        
        if (result.success) {
            setMessage(`¡Hola, ${result.user.username}! Sesión iniciada.`);
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


// -------------------------------------------------------------------
// --- 2. Formulario de Crear Cuenta ---
// -------------------------------------------------------------------
export const SignupForm: React.FC<{ onBack: () => void }> = ({ onBack }) => {
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
            setMessage(`¡Éxito! Cuenta creada para ${username}. Por favor, inicia sesión.`);
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
                <FormInput 
                    type="text"
                    placeholder="NOMBRE DE USUARIO"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={isLoading}
                />
                <FormInput 
                    type="email"
                    placeholder="CORREO"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                />
                <FormInput 
                    type="password"
                    placeholder="CONTRASEÑA"
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