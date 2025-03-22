import { DateValue } from "@heroui/react";
import { Interface } from "readline";

export interface CardServicesProps {
  title: string;
  description: string;
  imageUrl: string;
  color: string;
}
export interface QuestionInterface {
  Question: string;
  Answer?: React.ReactNode;
}
export interface PanelProps {
  estado: boolean;
  setEstado: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface UserInterface {
  name: string | null;
  email: string | null;
  lastname: string | null;
  photo: string | null;
  iniciales: string | null;
}
export interface UpdateUserProps {
  task: any;
}
export interface FAQ {
  Question: string;
  Answer: string;
}

// Definición de las propiedades del componente AccordionQuest
export interface AccordionQuestProps {
  faqs: FAQ[];
}
//interface Services para el componente ServicesStructure No le mueva nada caracho
export interface ServicesStructureProps {
  title: string;
  edad: string;
  motto: string;
  background: string;
  bgdown: string;
  bgup: string;
  description: string;
  tittleIcon: string;
  iconos: {
    id: number;
    text: string;
    iconImage: string;
  }[];
  tittlecards: string;
  cards: {
    id: number;
    text: string;
    icon: string;
  }[];
  textfooter: string;
}
//Quienes Somos
export interface QuienesSomos {
  quienesSomos: string;
  mision: string;
  vision: string;
  valor1: string;
  valor2: string;
  valor3: string;
}

export interface NavItem {
  name: string;
  link: string;
  isButton?: boolean;
}

//interface for the component Creacion de usuario

export interface Genero {

  label: number;
  genero: string;
}

export interface FormData {
  name: string;
  apellido: string;
  fecha_nacimiento: DateValue | string;
  edad: number;
  genero: string;
  pais: string;
  email: string;
  password: string;
  introduccion: string;
  imagen: string;
  experiencia: number;
  especialidades: number[];
  horario: {
    [key: string]: string[][];
  };
}

//interface for the component EspecialidadGet BlogUsuarioCrear
export interface Especialidad {
  idEspecialidad: number;
  nombre: string;
}

export interface Contact {
  nombre: string,
  apellido: string,
  celular: string,
  email: string,
  comentario: string,
}

export interface BlogApi {

  idCategoria: number | null,
  tema: string,
  contenido: string,
  imagen: string,
  idPsicologo: number | null;

}

export interface BlogApiGEt {
  idBlog: number | null,
  categoria: string,
  tema: string,
  contenido: string,
  imagen: string,
  idPsicologo: number,

}
export interface UsuarioLocalStorage {
  id: number,
  token: string,
  nombre: string,
  apellido: string,
  email: string,
  
  rol: string,
}

//Usuario LocalStorage
export interface UserInterface {
  name: string | null;
  email: string | null;
  lastname: string | null;
  photo: string | null;
  iniciales: string | null;
}

export interface Categoria {
  idCategoria: number;
  nombre: string;

}

export interface NavItems {
  name: string;
  link: string;
  icono: string;
}

// Interface for horarios psicologos

export interface Horarios {
  [dia: string]: [string, string][];
}

export interface Cita {
  fecha: string;
  hora_cita: string;
}

export interface BotonHorarioProps {
  hora: string;
  ocupada: boolean;
}
