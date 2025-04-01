"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Mail, Phone, Instagram, Facebook, Twitter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica de suscripción
    setEmail("")
  }

  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Columna 1: Logo e información de la empresa */}
          <div>
            <Image src="/logo.svg" alt="Silver Street Jewelry" width={120} height={40} className="mb-4 invert" />
            <p className="mb-4 text-gray-300">Creating timeless and unique looks since 1994</p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Columna 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/all-jewelry" className="text-gray-300 hover:text-white transition-colors">
                  All Jewelry
                </Link>
              </li>
              <li>
                <Link href="/products/sphere-rings" className="text-gray-300 hover:text-white transition-colors">
                  Sphere Rings
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <MapPin size={16} className="mr-2" />
                <span>Fort Lauderdale, FL</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Phone size={16} className="mr-2" />
                <a href="tel:+19545250073" className="hover:text-white transition-colors">
                  (954) 525-0073
                </a>
              </li>
              <li className="flex items-center text-gray-300">
                <Mail size={16} className="mr-2" />
                <a href="mailto:sales@silverstreetjewelry.com" className="hover:text-white transition-colors">
                  sales@silverstreetjewelry.com
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Stay Updated */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
              <Button type="submit" className="w-full bg-white text-[#0F172A] hover:bg-gray-200">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Espacio adicional antes del copyright */}
        <div className="mt-12"></div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Silver Street Jewelry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

