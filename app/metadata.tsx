// layout-metadata.tsx (o el archivo que prefieras)
import { Metadata } from "next";



export const metadata: Metadata = {
  title: {
    default: "ContigoVoy",
    template: "%s - ContigoVoy",
  },
  description: "ContigoVoy ofrece apoyo emocional y psicológico...",
  // Configuración de iconos
  icons: {
    icon: [
      { url: '/LOGOfeo.png' },
      { url: '/icon.png', type: 'image/png' },
    ],
    
  },
};