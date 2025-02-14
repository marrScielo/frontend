"use client";
import React, { useState } from "react";
import { Button, Form, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { contactoFormSchema } from "@/lib/auth-schema";
import sendMail from "@/utils/envioCorreo";
import { toast } from "react-toastify";

// Definición del modelo para la tabla "contact" en Supabase
interface Contact {
  nombres: string;
  apellidos: string;
  celular: string;
  correo: string;
  comentario: string;
}

const FormContacto = () => {
  const [action, setAction] = useState<string | null>(null);
  const [estado, setEstado] = useState<boolean>(false);

  // Configuración de react-hook-form con Zod
  const form = useForm<z.infer<typeof contactoFormSchema>>({
    resolver: zodResolver(contactoFormSchema),
    defaultValues: {
      email: "",
      name: "",
      lastname: "",
      phone: "",
      message: "",
    },
  });

  // Lógica de envío del formulario
  const onSubmit = async (values: z.infer<typeof contactoFormSchema>) => {
    setEstado(true);
    const { email, name, message, lastname, phone } = values;
    
    // Envía el correo
    const result = await sendMail(
      email,
      "Contacto Contigo Voy",
      message,
      name,
      lastname,
      phone
    );
    
    if (result) {
      toast.success("Mensaje enviado con éxito");
    } else {
      toast.error("Error al enviar el mensaje");
    }
    form.reset();
    setEstado(false);
  };

  return (
    <Form
      className="w-full max-w-md bg-[#B8B8FF] rounded-2xl p-6 mr-10"
      validationBehavior="native"
      onSubmit={form.handleSubmit(onSubmit)}
      onReset={() => setAction("reset")}
    >
      <div className="space-y-3 w-full">
        <Input
          isRequired
          errorMessage={
            form.formState.errors.name?.message?.toString() ||
            "Por favor ingrese un nombre válido"
          }
          {...form.register("name")}
          name="name"
          placeholder="Nombres"
          type="text"
          className="input-placeholder"
        />
        <Input
          isRequired
          errorMessage={
            form.formState.errors.lastname?.message?.toString() ||
            "Por favor ingrese un apellido válido"
          }
          {...form.register("lastname")}
          name="lastname"
          placeholder="Apellidos"
          type="text"
          className="input-placeholder"
        />
        <Input
          isRequired
          errorMessage={
            form.formState.errors.phone?.message?.toString() ||
            "Por favor ingrese un número de teléfono válido"
          }
          {...form.register("phone")}
          name="phone"
          placeholder="Celular"
          type="tel"
          className="input-placeholder"
        />
        <Input
          isRequired
          errorMessage={
            form.formState.errors.email?.message?.toString() ||
            "Ingrese un correo electrónico válido"
          }
          {...form.register("email")}
          name="email"
          placeholder="Correo"
          type="email"
          className="input-placeholder"
        />
        <Input
          isRequired
          errorMessage={
            form.formState.errors.message?.message?.toString() ||
            "Ingrese un mensaje válido"
          }
          {...form.register("message")}
          name="message"
          placeholder="Comentario"
          type="textarea"
          className="input-placeholder"
        />
        <div className="w-full flex justify-center pt-4">
          <Button
            className="bg-[#634AE3] text-white px-8 py-2 rounded-lg hover:bg-[#5339cc] transition-colors"
            type="submit"
            disabled={estado}
          >
            Enviar
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default FormContacto;
