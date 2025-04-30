"use client";
import type { FormDataAdmin } from "@/interface";
import React from "react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { Suceesfully } from "./SuccesFull";
import { PersonalForm} from "./DataFormularios";

export const initialFormState: FormDataAdmin = {
  name: "",
  apellido: "",
  fecha_nacimiento: today(getLocalTimeZone()),
  imagen: "",
  email: "",
  password: "",
  rol:"ADMIN",
};

export default function PersonalComponent() {
  const [formData, setFormData] = React.useState<FormDataAdmin>(initialFormState);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (data: FormDataAdmin) => {
    // Aquí iría la lógica para enviar los datos al servidor
    console.log("Datos enviados:", data);
    setIsSubmitted(true); // Marcamos como enviado
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData(initialFormState);
  };

  return (
    <>
    {!isSubmitted ? (
      <PersonalForm 
        onNext={handleSubmit}  
        initialFormData={formData}
      />
    ) : (
      <Suceesfully setIsSend={resetForm} /> 
    )}
  </>
  );
}