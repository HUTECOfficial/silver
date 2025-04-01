"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { authService } from "@/lib/services/auth-service"

export default function Logout() {
  const router = useRouter()

  useEffect(() => {
    async function logout() {
      try {
        await authService.signOut()
        router.push("/admin/login")
      } catch (error) {
        console.error("Error logging out:", error)
        router.push("/admin/login")
      }
    }

    logout()
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Cerrando sesión...</p>
    </div>
  )
}

