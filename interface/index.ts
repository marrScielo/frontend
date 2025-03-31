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
  id: number | null,
  categoria: string,
  tema: string,
  contenido: string,
  imagen: string,
  idPsicologo: number,
}
//BLogs Preview Data
export interface BlogPreviewData {
  idBlog: number,
  tema: string,
  contenido: string,
  imagen: string,
  psicologo: string,
  psicologApellido: string,
  psicologoImagenId: string,
  categoria: string,
  fecha: string,
}

export interface ApiResponseBLogAlone {
  result: BlogPreviewData;
}

export interface ApiResponse {

  result: BlogPreviewData[];
}

//Psicologos Preview Data
export interface PsicologoPreviewData {
  idPsicologo: number,
  nombre: string,
  apellido: string,
  pais: string,
  introduccion: string,
  genero: string,
  experiencia: number,
  correo: string,
  contraseña: string,
  fecha_nacimiento: string,
  especialidades: string[],
  imagen: string,
  horario: Horarios;
}

export interface PsicologoApiResponse {
  status_code: number;
  status_message: string;
  description: string;
  errorBag: any[];
  result: PsicologoPreviewData[];
}

export interface PsicologoApiResponseAlone {
  status_code: number;
  status_message: string;
  description: string;
  errorBag: any[];
  result: PsicologoPreviewData;
}

export interface UsuarioLocalStorage {
  id: number,

  nombre: string,
  apellido: string,
  email: string,
  rol: string,
  imagen: string,
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
export interface CategoriaApi {
  status_code: number;
  status_message: string;
  description: string;
  errorBag: any[];
  result: Categoria[];
}

export interface Authors {
  id: number;
  name: string;
  lastname: string;
  photo: string;
}

export interface AuthorsApi {
  status_code: number;
  status_message: string;
  description: string;
  errorBag: any[];
  result: Authors[];
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

export interface BotonHorarioProps {
  hora: string;
  ocupada: boolean;
  onClick: () => void;
}

export interface CitasPendientes {
  fecha: string;
  hora: string;
}

export interface CitasPendientesApiResponse {
  status_code: number;
  status_message: string;
  description: string;
  errorBag: any[];
  result: CitasPendientes[]; 
}


export interface Paciente {
  idPaciente: number,
  DNI: string,
  nombre: string,
  apellido:string,
  correo: string,
  celular: string,
  fecha_nacimiento: Date,
  imagen: string,
  genero: string,
  ocupacion: string,
  estadoCivil: string,
  direccion: string,
  idPsicologo: number
}
export interface Paciente2 {
  idPaciente: number,
  DNI: string,
  nombre: string,
  apellido:string,
  email: string,
  celular: string,
  fecha_nacimiento: String,
  imagen: string,
  genero: string,
  ocupacion: string,
  estadoCivil: string,
  direccion: string,
}

export interface FormPaciente {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  DNI: string;
  email: string;
  celular: string;
  fecha_nacimiento: string;
  genero: string;
  estadoCivil: string;
  ocupacion: string;
  direccion: string;
  departamento: string| null;
  provincia: string| null;
  pais: string| null;
  antecedentesMedicos: string;
  medicamentosPrescritos: string;
}

export interface DatosPacienteProps {
  idPaciente: number;
}

export interface Country {
  id: number;
  name: string;
}

export interface State {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
}
export interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}
