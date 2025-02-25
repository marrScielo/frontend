import { destroyCookie, setCookie } from "nookies";
import { useState } from "react";

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
      error: null,
    });
    const login = async (email: string, password: string) => {
      setAuthState({ ...authState, loading: true });
      try {
        const response = await fetch(
<<<<<<< HEAD
          //loCAL 
          //"http://127.0.0.1:8000/api/auth/login", 

          //HOSTINGUE BACKEND 
          "https://back.contigo-voy.com/api/auth/login",
=======
          `${process.env.NEXT_PUBLIC_API_URL}api/auth/login`,
>>>>>>> 4eb9cbb0f65b172437334b0aa3e21936df005abc
          {
            method: "POST",
            credentials: 'include', // Habilita el envío de credenciales

            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );
        
        if (!response.ok) {
          throw new Error("Credenciales inválidas");
        }
        
        const data = await response.json();
        const token = data.result.token;
        
  
        setCookie(null, 'session', token, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
          
          // Añade secure: true y sameSite: 'strict' en producción
        });
        
     
        localStorage.setItem("user", JSON.stringify(data.user));
        
        setAuthState({ 
          user: data.user, 
          token: token, 
          loading: false, 
          error: null 
        });
        
        console.log("Inicio de sesión exitoso");
        window.location.assign("/user/home");
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Se produjo un error desconocido";
            console.log(errorMessage);
            console.log(process.env.NEXT_PUBLIC_API_URL);
        setAuthState({ ...authState, loading: false, error: errorMessage });
      }
    };
    
    const logout =  () => {
        // Eliminar la cookie al cerrar sesión
        destroyCookie(null, "session", { path: "/" });

        try {
            const response =  fetch(
              "http://127.0.0.1:8000/api/auth/logout",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              
              }
            );
        } catch (error) {
          console.log("Error al intentar cerrar sesión:", error);
        }
      
        localStorage.removeItem("user");
     
       window.location.assign("/login");
      };
    return { ...authState, login, logout };
};