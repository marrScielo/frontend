import { Input } from "@heroui/react";
import React, { useState } from "react";
import { setCookie, destroyCookie } from 'nookies'; 
import { useAuth } from "@/auth/loginsec";

export default function Login() {




  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(credentials.email, credentials.password);
  };

  return (
    <>
    <form
      onSubmit={handleSubmit}
      className="bg-white h-72 w-96 p-5 rounded-xl shadow-md"
    >
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
        <label className="text-xl font-semibold text-[#634AE2]">
          Contraseña
        </label>
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
   
   </>
  );
}

