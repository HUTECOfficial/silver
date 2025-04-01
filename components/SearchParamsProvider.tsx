"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Create a context for search params
const SearchParamsContext = createContext<Record<string, string>>({})

export function useStaticSearchParams() {
  return useContext(SearchParamsContext)
}

export function SearchParamsProvider({ children }: { children: React.ReactNode }) {
  const [searchParams, setSearchParams] = useState<Record<string, string>>({})

  useEffect(() => {
    // Solo ejecutar en el navegador
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href)
      const params: Record<string, string> = {}

      url.searchParams.forEach((value, key) => {
        params[key] = value
      })

      // Actualizar cuando cambie la URL
      const handleRouteChange = () => {
        const newUrl = new URL(window.location.href)
        const newParams: Record<string, string> = {}

        newUrl.searchParams.forEach((value, key) => {
          newParams[key] = value
        })

        setSearchParams(newParams)
      }

      setSearchParams(params)

      // Escuchar cambios en la URL
      window.addEventListener("popstate", handleRouteChange)

      return () => {
        window.removeEventListener("popstate", handleRouteChange)
      }
    }
  }, [])

  return <SearchParamsContext.Provider value={searchParams}>{children}</SearchParamsContext.Provider>
}

