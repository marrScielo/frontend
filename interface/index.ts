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
    vision:string;
    valor1: string;
    valor2:string;
    valor3:string;
  }

  export interface NavItems {
    name: string;
    link: string;
    icono: string;
}