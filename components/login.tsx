import { Input } from "@heroui/react";
import { useState } from "react";

export default function Login() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const { login } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(credentials.email, credentials.password);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white h-72 w-96 p-5 rounded-xl shadow-md">
            <div className="flex flex-col items-center justify-center gap-y-5">
                <label className="text-xl font-semibold text-[#634AE2]">Usuario</label>
                <Input 
                    name="email"
                    type="email"
                    placeholder="Email" 
                    className="w-full"
                    value={credentials.email}
                    onChange={handleChange}
                    required 
                />
                <label className="text-xl font-semibold text-[#634AE2]">Contraseña</label>
                <Input 
                    name="password"
                    type="password"
                    placeholder="Contraseña" 
                    className="w-full"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-[#634AE2] text-white py-2 rounded-md hover:bg-[#5339d2] transition-colors"
                >
                    Iniciar Sesión
                </button>
            </div>
        </form>
    );
}

interface AuthState {
    user: { id: number; email: string; rol: string } | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

export const useAuth = () => {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        token: null,
        loading: false,
        error: null
    });

    const login = async (email: string, password: string) => {
        setAuthState({ ...authState, loading: true });
        try {
            const response = await fetch('https://panel.contigo-voy.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Credenciales inválidas');
            }

            const data = await response.json();
            const token = data.result.token;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setAuthState({  ...authState, 
                token: token, 
                loading: false, 
                error: null });
            console.log("Inicio de sesión exitoso");    
            console.log(data.user)
            console.log(data.result.token)

        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Se produjo un error desconocido';
            setAuthState({ ...authState, loading: false, error: errorMessage });
        }
    };

    return { ...authState, login };
};