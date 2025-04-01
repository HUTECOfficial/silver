"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src="/logo.svg" alt="Silver Street Jewelry Logo" width={40} height={40} className="mr-2" />
          <span className="text-xl font-serif">Silver Street Jewelry</span>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/all-jewelry" className="text-gray-600 hover:text-black transition-colors">
            All Jewelry
          </Link>
          <Link href="/products/sphere-rings" className="text-gray-600 hover:text-black transition-colors">
            Sphere Rings
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-black transition-colors">
            About Us
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-black transition-colors">
            Contact
          </Link>
        </nav>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden bg-black text-white rounded-full p-2 focus:outline-none"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center md:hidden">
          <nav className="text-center">
            <ul className="space-y-6">
              <li>
                <Link
                  href="/all-jewelry"
                  className="text-white text-2xl hover:text-gray-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  All Jewelry
                </Link>
              </li>
              <li>
                <Link
                  href="/products/sphere-rings"
                  className="text-white text-2xl hover:text-gray-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sphere Rings
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white text-2xl hover:text-gray-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white text-2xl hover:text-gray-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}

