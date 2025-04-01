"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Menu, ShoppingBag, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter, usePathname } from "next/navigation"
import { useCart } from "@/contexts/CartContext"

export default function DynamicIsland() {
  const [isExpanded, setIsExpanded] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { getCartCount } = useCart()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest(".dynamic-island") && isExpanded) {
        setIsExpanded(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isExpanded])

  useEffect(() => {
    const handleRouteChange = () => {
      setIsExpanded(false)
    }

    window.addEventListener("popstate", handleRouteChange)
    return () => window.removeEventListener("popstate", handleRouteChange)
  }, [])

  useEffect(() => {
    // Cerrar cuando cambie la ruta
    setIsExpanded(false)
  }, [pathname])

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isExpanded) {
        setIsExpanded(false)
      }
    }

    document.addEventListener("keydown", handleEscKey)
    return () => document.removeEventListener("keydown", handleEscKey)
  }, [isExpanded])

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push("/cart")
  }

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsExpanded(!isExpanded)
  }

  const handleNavigation = (href: string) => {
    setIsExpanded(false)
    router.push(href)
  }

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40 md:hidden">
      <motion.div
        initial={false}
        animate={{
          width: isExpanded ? "90vw" : "120px",
          height: isExpanded ? "80vh" : "36px",
          borderRadius: isExpanded ? "24px" : "20px",
          backgroundColor: isExpanded ? "rgba(0, 0, 0, 0.95)" : "rgba(0, 0, 0, 0.85)",
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300,
        }}
        className="dynamic-island relative backdrop-blur-lg overflow-hidden shadow-lg"
      >
        {/* Buttons Container */}
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button
            onClick={handleToggle}
            className="text-white hover:opacity-75 transition-opacity w-8 h-8 flex items-center justify-center z-20"
            aria-label={isExpanded ? "Close menu" : "Open menu"}
          >
            {isExpanded ? <X size={18} /> : <Menu size={18} />}
          </button>
          <button
            onClick={handleCartClick}
            className="text-white hover:opacity-75 transition-opacity w-8 h-8 flex items-center justify-center relative z-20"
            aria-label="View cart"
          >
            <ShoppingBag size={18} />
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </button>
        </div>

        {/* Expanded State */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1 }}
              className="absolute inset-0 pt-16"
            >
              <nav className="h-full flex flex-col items-center justify-center space-y-8">
                {[
                  ["Home", "/"],
                  ["All Jewelry", "/all-jewelry"],
                  ["Sphere Rings", "/products/sphere-rings"],
                  ["Individual Spheres", "/products/spheres"],
                  ["About Us", "/about"],
                  ["Contact", "/contact"],
                ].map(([label, href]) => (
                  <button
                    key={href}
                    onClick={() => handleNavigation(href)}
                    className="text-white text-2xl hover:text-gray-300 transition-colors"
                  >
                    {label}
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

