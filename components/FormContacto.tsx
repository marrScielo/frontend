"use client";
import { Button, Form, Input } from "@heroui/react";
import React from "react";


export default function App() {
  const [action, setAction] = React.useState<string | null>(null);
  return (
    <Form
    className="w-full max-w-md bg-[#B8B8FF] rounded-2xl p-6 mr-10 relative z-0"
    validationBehavior="native"
    onReset={() => setAction("reset")}
    onSubmit={(e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.currentTarget));
      setAction(`submit ${JSON.stringify(data)}`);
    }}
  >
    <div className="space-y-3 w-full">
      <Input
        isRequired
        errorMessage="Por favor ingrese un nombre válido"
        name="Nombres"
        placeholder="Nombres"
        type="text"
        className="z-10" // z-index menor que el navbar
      />
      <Input
        isRequired
        errorMessage="Por favor ingrese un apellido válido"
        name="Apellidos"
        placeholder="Apellidos"
        type="text"
        className="z-10"
      />
      <Input
        isRequired
        errorMessage="Por favor ingrese un número de teléfono válido"
        name="phone"
        placeholder="Celular"
        type="tel"
        className="z-10"
      />
      <Input
        isRequired
        errorMessage="Ingrese un correo electrónico válido"
        name="email"
        placeholder="Correo"
        type="email"
        className="z-10"
      />
      <Input 
        name="message" 
        placeholder="Comentario" 
        type="textarea"
        className="z-10" 
      />
      <div className="w-full flex justify-center pt-4">
        <Button
          style={{ backgroundColor: "#634AE3", color: "white" }}
          type="submit"
        >
          Enviar
        </Button>
      </div>
      {action && (
        <div className="text-small text-default-500">
          Action: <code>{action}</code>
        </div>
      )}
    </div>
  </Form>
  );
}
