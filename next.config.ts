import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,  // Añade esto
  basePath: '',         // Asegúrate que esto esté vacío si estás en la raíz
};

export default nextConfig;