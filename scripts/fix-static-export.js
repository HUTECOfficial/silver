"use client"

// This is a Node.js script that runs during build time

// Este script se puede ejecutar antes de la compilación para asegurarse de que todas las imágenes estén optimizadas para exportación estática
const fs = require("fs")
const path = require("path")
const { globSync } = require("glob")

// Función para buscar archivos recursivamente
function findFiles(pattern) {
  try {
    return globSync(pattern)
  } catch (error) {
    console.error("Error al buscar archivos:", error)
    return []
  }
}

async function main() {
  console.log("🔍 Buscando archivos que puedan causar problemas en la exportación estática...")

  // Buscar todos los archivos .tsx y .jsx
  const files = findFiles("**/*.{tsx,jsx}")

  let useSearchParamsCount = 0
  let serverComponentsCount = 0

  // Revisar cada archivo
  for (const file of files) {
    const content = fs.readFileSync(file, "utf8")

    // Buscar useSearchParams
    if (content.includes("useSearchParams()") || content.includes("useSearchParams(")) {
      useSearchParamsCount++
      console.log(`⚠️ Encontrado useSearchParams en: ${file}`)
    }

    // Buscar componentes de servidor
    if (content.includes("use server") || (content.includes("export const") && content.includes("Server"))) {
      serverComponentsCount++
      console.log(`⚠️ Posible componente de servidor en: ${file}`)
    }
  }

  console.log("\n📊 Resumen:")
  console.log(`- Archivos con useSearchParams: ${useSearchParamsCount}`)
  console.log(`- Posibles componentes de servidor: ${serverComponentsCount}`)

  if (useSearchParamsCount === 0 && serverComponentsCount === 0) {
    console.log("✅ No se encontraron problemas potenciales para la exportación estática.")
  } else {
    console.log("\n⚠️ Se encontraron posibles problemas. Por favor, revisa los archivos mencionados arriba.")
    console.log("   - Reemplaza useSearchParams() con useStaticSearchParams() de @/components/SearchParamsProvider")
    console.log(
      "   - Convierte los componentes de servidor a componentes de cliente o asegúrate de que sean compatibles con exportación estática",
    )
  }
}

main().catch(console.error)

