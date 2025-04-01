"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { GlobalStyles } from "@/components/GlobalStyles"

const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

// Lista completa de categorías según el mockup
const categories = [
  { name: "Sphere Rings", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e" },
  { name: "Spheres", image: "https://images.unsplash.com/photo-1616697851009-1be942a5c803" },
  { name: "Earrings", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908" },
  { name: "Necklaces", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f" },
  { name: "Pendants", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a" },
  { name: "Chains", image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071" },
  { name: "Brooches", image: "https://images.unsplash.com/photo-1630019852942-f89202989a59" },
]

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { scrollY } = useScroll()
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: false, amount: 0.5 })

  // Ajustamos la configuración del spring para un scroll más suave
  const springConfig = {
    stiffness: 50, // Reducido para hacer el movimiento más suave
    damping: 20, // Ajustado para mejor control
    mass: 0.5, // Añadido para dar un poco más de "peso" natural
  }

  // Usamos springs para las transformaciones
  const y1 = useSpring(useTransform(scrollY, [0, 300], [0, 100]), springConfig)

  const y2 = useSpring(useTransform(scrollY, [0, 300], [0, -100]), springConfig)

  const opacity = useSpring(useTransform(scrollY, [0, 300], [1, 0]), springConfig)

  const scaleSpring = useSpring(1, {
    ...springConfig,
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    setIsLoaded(true)
    scaleSpring.set(1.2)
    setTimeout(() => scaleSpring.set(1), 600)
  }, [scaleSpring])

  return (
    <>
      <GlobalStyles />
      <motion.div initial="initial" animate="animate" variants={stagger} className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          variants={fadeInUp}
          className="relative h-screen overflow-hidden"
          style={{ opacity }}
        >
          <motion.div style={{ scale: scaleSpring }} className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070"
              alt="Elegant jewelry display"
              layout="fill"
              objectFit="cover"
              quality={100}
              priority
            />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
            style={{ y: y1 }}
            initial={{ y: 0 }}
          >
            <div className="text-center text-white px-4">
              <motion.h1
                variants={{
                  initial: { opacity: 0, y: 50 },
                  animate: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-4xl md:text-6xl lg:text-7xl mb-4"
              >
                Silver Street Jewelry
              </motion.h1>
              <motion.p
                variants={{
                  initial: { opacity: 0, y: 50 },
                  animate: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="text-lg md:text-xl mb-8"
              >
                Timeless elegance in everyday jewelry
              </motion.p>
              <motion.div
                variants={{
                  initial: { opacity: 0, y: 50 },
                  animate: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              >
                <Link
                  href="/all-jewelry"
                  className="bg-white text-black px-8 py-3 text-lg font-semibold hover:bg-gray-200 transition-colors rounded-full inline-block"
                >
                  Explore Collection
                </Link>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"
            style={{ y: y2 }}
          />
        </motion.section>

        {/* Featured Sphere Ring Section */}
        <motion.section variants={fadeInUp} className="py-16 px-4 bg-white relative z-10">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                variants={fadeInUp}
                className="order-2 md:order-1"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <h2 className="text-3xl font-bold mb-4">One Ring, Endless Possibilities</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Our Signature Sphere Rings let you express your look with interchangeable spheres. Whether you're
                  aiming for subtle sophistication or a bold statement, this ring evolves with you — because elegance is
                  truly personal.
                </p>
                <Link
                  href="/products/sphere-rings/classic"
                  className="bg-black text-white px-8 py-3 text-lg inline-block hover:bg-gray-800 transition-colors rounded-full"
                >
                  Shop Now
                </Link>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="order-1 md:order-2"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <div className="relative aspect-square">
                  <Image
                    src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1770"
                    alt="Silver Street Sphere Ring"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Customize Your Look */}
        <motion.section variants={fadeInUp} className="py-16 px-4 bg-gray-50 relative z-10">
          <div className="container mx-auto text-center">
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-8">
              Customize Your Look
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Create a unique look by choosing spheres that reflect your personal style.
            </motion.p>
            <motion.div variants={stagger} className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
              {["Ruby", "Sapphire", "Emerald", "Diamond", "Amethyst", "Topaz"].map((sphere, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <div className="group block">
                    <div className="relative aspect-square bg-white rounded-full overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                      <Image
                        src={`/placeholder.svg?height=200&width=200&text=${sphere}`}
                        alt={sphere}
                        width={200}
                        height={200}
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <p className="mt-2 text-sm font-medium">{sphere}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Link
                href="/products/spheres"
                className="text-black border border-black px-8 py-3 inline-block hover:bg-black hover:text-white transition-colors rounded-full"
              >
                Find your Spheres
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Browse Categories */}
        <motion.section variants={fadeInUp} className="py-16 px-4 bg-white relative z-10">
          <div className="container mx-auto text-center">
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-12">
              Categories
            </motion.h2>
            <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <Link href={`/products/${category.name.toLowerCase().replace(/\s+/g, "-")}`} className="group block">
                    <div className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <span className="text-white text-lg font-medium">{category.name}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Trending Section */}
        <motion.section variants={fadeInUp} className="py-16 px-4 bg-gray-50 relative z-10">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <motion.h2 variants={fadeInUp} className="text-3xl font-bold">
                Trending
              </motion.h2>
              <Link href="/products/trending" className="text-gray-600 hover:text-black flex items-center">
                View all <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sphere Ring Classic",
                  price: "$199",
                  image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1770",
                },
                {
                  name: "Pearl Necklace",
                  price: "$249",
                  image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1887",
                },
                {
                  name: "Diamond Earrings",
                  price: "$299",
                  image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1887",
                },
              ].map((product, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <Link href={`/products/trending/${i + 1}`} className="group block">
                    <div className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-medium">{product.name}</h3>
                      <p className="text-gray-600">{product.price}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Instagram Feed */}
        <motion.section variants={fadeInUp} className="py-16 px-4 bg-white relative z-10">
          <div className="container mx-auto">
            <motion.h2 variants={fadeInUp} className="text-3xl text-center mb-12">
              @silverstreetjewelry
            </motion.h2>
            <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1854",
                "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1887",
                "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1887",
                "https://images.unsplash.com/photo-1535556116002-6281ff3e9f36?q=80&w=1781",
              ].map((src, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  className="relative aspect-square"
                >
                  <Image
                    src={src || "/placeholder.svg"}
                    alt={`Instagram post ${i + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </motion.div>
    </>
  )
}

