"use client"

import { useRouter } from "next/navigation"

export default function MobileLogo() {
  const router = useRouter()

  const handleLogoClick = () => {
    router.push("/")
  }

  return (
    <div className="fixed top-4 left-4 z-50 md:hidden">
      <div
        className="w-10 h-10 rounded-full bg-white shadow-md cursor-pointer flex items-center justify-center overflow-hidden"
        onClick={handleLogoClick}
        style={{
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          borderRadius: "9999px", // Explicitly set to ensure it's circular
        }}
      >
        <span className="text-black font-bold text-lg">SS</span>
      </div>
    </div>
  )
}

