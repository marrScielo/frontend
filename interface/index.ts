import { DateValue } from "@heroui/react";
import { Interface } from "readline";
import { eliminarBlog } from '../components/blogCrear/listarblog';

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
  textfootermobile:string;
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
  titulo: string;
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
 export interface FormDataAdmin{
 name:string;
 apellido:string;
 fecha_nacimiento:DateValue | string;
 imagen:string; 
 email:string;
 password:string;
 rol:string;
 }

 export interface AdministradorPreviewData {
  idAdministrador: number;
  nombre: string;
  apellido: string;
  email: string;
  password?: string;
  fecha_nacimiento: string;
  imagen?: string;
  estado?: 'A' | 'I';
}

export interface AdministradorApiResponse {
  status_code: number;
  status_message: string;
  description: string;
  errorBag: any[];
  result: AdministradorPreviewData[];
}

export interface AdministradorApiResponseAlone {
  status_code: number;
  status_message: string;
  description: string;
  errorBag: any[];
  result: AdministradorPreviewData;
}

export interface AdministradorFormData {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  fecha_nacimiento: string;
  imagen?: string;
  estado?: 'A' | 'I'; // Opcional para creación/actualización
}

export interface UpdateAdminFormData {
  administrador: {
    imagen?: string;
  };
  user: {
    nombre: string;
    apellido: string;
    email: string;
    password?: string;
    fecha_nacimiento: string;
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
  titulo:string,
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

  horario: {
    [key: string]: [string, string][];
  };
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
  idpsicologo?: number,
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

export interface PrePaciente {
  nombre: string,
  celular: string,
  correo: string,
  fecha_cita: string,
  hora_cita: string,
  idPsicologo: number,
}

export interface Paciente {
  idPaciente: number,
  DNI: string,
  codigo: string,
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


export interface Citas {
  idCita: string;
  idPaciente: string;
  idPsicologo: string;
  paciente: string;
  codigo: string;
  fecha_inicio: string;
  estado: string;
  age: string;
  motivo: string;
  duracion: string;
}

export interface DatePacienteProps {
  idPaciente: number;
  ultimaAtencion : UltimaAtencion | null;
}

export interface AtencionFormData {
  MotivoConsulta: string;
  FormaContacto: string;
  Diagnostico: string;
  Tratamiento: string;
  Observacion: string;
  idEnfermedad: string;
  UltimosObjetivos: string;
  FechaAtencion: string;
  DocumentosAdicionales: string;
  Comentario: string;
  descripcion: string;
  idCita?: number;
}

export interface ListaAtencion{
  hora_inicio: string;
  nombre_completo: string;
  diagnostico: string;
  idCita: string;
  fecha_inicio: string;
  idAtencion: string;
  idPaciente: string;
  codigo: string;
  age:string;
}

export interface Enfermedad {
  idEnfermedad: number;
  nombreEnfermedad: string;
  DSM5: string;
  CEA10: string;
}

export interface DetallesAtencionProps {
  idAtencion: string;
}

export interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}

export interface UltimaAtencion {
  nombre: string;
  apellido: string;
  DNI: string;
  codigo: string;
  celular: string;
  edad: number;
  fecha_completa: string;
  fecha_atencion: string;
  diagnostico: string;
  observacion: string;
  ultimosObjetivos: string;
  comentario: string;
  idAtencion: number;
  tratamiento: string;
}