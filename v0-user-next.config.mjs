/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true, // Necesario para exportación estática
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'export', // Genera la carpeta 'out'
  // Eliminar opciones experimentales incompatibles con exportación estática
  experimental: {
    // Mantener solo opciones compatibles con exportación estática
    webpackBuildWorker: true,
  },
  // Deshabilitar características que no funcionan con exportación estática
  trailingSlash: true, // Mejor para compatibilidad con hosting estático
  // Añadir esta configuración para evitar errores con window/document/location
  env: {
    NEXT_PUBLIC_BASE_URL: 'https://silverstreetjewelry.com',
  }
}

export default nextConfig

