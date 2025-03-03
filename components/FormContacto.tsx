"use client";
import { Button, Form, Input } from "@heroui/react";
import React, { useState, useEffect } from "react";

export default function FormContacto() {
  const [action, setAction] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    celular: "",
    email: "",
    comentario: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as Record<string, any>;

    if (data.celular) {
      data.celular = Number(data.celular);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/contactos/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok)
        throw new Error(result.message || "Error al enviar el formulario");

      setAction("¡Mensaje enviado! Nuestro equipo se pondrá en contacto contigo lo antes posible.");
      setFormData({
        nombre: "",
        apellido: "",
        celular: "",
        email: "",
        comentario: "",
      });

      setTimeout(() => {
        setAction(null);
      }, 6000); 
    } catch (err: any) {
      setError(err.message || "No se pudo enviar el formulario.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      className="w-full max-w-md bg-[#B8B8FF] rounded-2xl p-6 mr-10 relative z-0"
      validationBehavior="native"
      onSubmit={handleSubmit}
    >
      {action && (
        <div className="absolute top-0 left-0 w-full h-[90px] flex items-center justify-center bg-[#9494F3] rounded-2xl z-10 mt-[190px]">
          <div className="m-8 text-start">
            <p className="text-white font-light text-base">
              {action}
            </p>
          </div>
        </div>
      )}
      <div className="space-y-3 w-full relative">
        <Input
          isRequired
          name="nombre"
          placeholder="Nombres"
          type="text"
          value={formData.nombre}
          onChange={handleChange}
        />
        <Input
          isRequired
          name="apellido"
          placeholder="Apellidos"
          type="text"
          value={formData.apellido}
          onChange={handleChange}
        />
        <Input
          isRequired
          name="celular"
          placeholder="Celular"
          type="tel"
          value={formData.celular}
          onChange={handleChange}
        />
        <Input
          isRequired
          name="email"
          placeholder="Correo"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          name="comentario"
          placeholder="Comentario"
          type="textarea"
          value={formData.comentario}
          onChange={handleChange}
        />

        <div className="w-full flex justify-center pt-4">
          <Button
            style={{ backgroundColor: "#634AE3", color: "white" }}
            type="submit"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar"}
          </Button>
        </div>

        {error && <div className="text-red-500">{error}</div>}
      </div>
    </Form>
  );
}