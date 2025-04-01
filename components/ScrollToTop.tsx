"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { useStaticSearchParams } from "@/components/SearchParamsProvider"

export default function ScrollToTop() {
  const pathname = usePathname()
  const searchParams = useStaticSearchParams()

  useEffect(() => {
    // Cuando cambia la ruta o los parámetros de búsqueda, hacer scroll hacia arriba
    window.scrollTo({
      top: 0,
      behavior: "instant", // Usar "instant" en lugar de "smooth" para evitar desplazamientos visibles
    })
  }, [pathname, searchParams])

  return null // Este componente no renderiza nada
}

