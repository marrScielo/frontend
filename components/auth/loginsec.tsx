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
        `${process.env.NEXT_PUBLIC_API_URL}api/auth/login`,

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Credenciales inválidas");
      }

      const data = await response.json();
      const token = data.result.token.split("|")[1];

      setCookie(null, "session", token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",

        // Añade secure: true y sameSite: 'strict' en producción sas
      });

      // In your login function:
      const userDataToStore = data.user || {
        id: data.result.id,
        email: data.result.email,
        rol: data.result.rol,
        nombre: data.result.nombre,
        apellido: data.result.apellido,
        imagen: data.result.imagen,
      };

      localStorage.setItem("user", JSON.stringify(userDataToStore));

      setAuthState({
        user: data.user,
        token: token,
        loading: false,
        error: null,
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

  const logout = () => {
    // Eliminar la cookie al cerrar sesión
    destroyCookie(null, "session", { path: "/" });

    fetch("http://127.0.0.1:8000/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    localStorage.removeItem("user");

    window.location.assign("/login");
  };
  return { ...authState, login, logout };
};
