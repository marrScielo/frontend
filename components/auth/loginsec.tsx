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
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      const token = data.result.token.split("|")[1];

      setCookie(null, "session", token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

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

      window.location.assign("/user/home");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Se produjo un error desconocido";

      setAuthState({ ...authState, loading: false, error: errorMessage });
    }
  };

  const logout = () => {
    destroyCookie(null, "session", { path: "/" });

    fetch(`${process.env.NEXT_PUBLIC_API_URL}api/auth/logout`, {
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
