"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Minus, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { spheres } from "@/lib/sphereData"
import { useCart } from "@/contexts/CartContext"
import { toast } from "@/components/ui/use-toast"

// Categorías de spheres
const categories = ["All", "Precious", "Semi-Precious", "Synthetic", "Organic"]

export default function SpheresPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedQuantities, setSelectedQuantities] = useState<Record<number, number>>({})
  const { addToCart } = useCart()

  // Helper function to get a color based on sphere name
  const getSphereColor = (name: string) => {
    const colors: Record<string, string> = {
      Ruby: "#E0115F",
      Sapphire: "#0F52BA",
      Emerald: "#50C878",
      Diamond: "#B9F2FF",
      Amethyst: "#9966CC",
      Topaz: "#FFC87C",
      Opal: "#A8C3BC",
      Garnet: "#7B1113",
      Peridot: "#AAFF00",
      Aquamarine: "#7FFFD4",
      Citrine: "#E4D00A",
      Tanzanite: "#4D5A9E",
      Tourmaline: "#86A1A9",
      Morganite: "#FFBCD9",
      Alexandrite: "#008000",
      Spinel: "#FF1493",
      Zircon: "#E6E6FA",
      Moonstone: "#F0FFFF",
      Turquoise: "#40E0D0",
      "Lapis Lazuli": "#26619C",
      Onyx: "#353935",
      Pearl: "#FDEEF4",
      Coral: "#FF7F50",
      Jade: "#00A36C",
      Amber: "#FFBF00",
      Quartz: "#FFFFFF",
    }

    return colors[name] || "#CCCCCC" // Default gray if color not found
  }

  // Tomamos solo los primeros 24 spheres para mostrar en la página
  const displaySpheres = spheres.slice(0, 24).map((sphere, index) => ({
    id: index + 1,
    name: sphere.name,
    price: 20.0,
    image: `/placeholder.svg?height=300&width=300&text=${sphere.name}`,
    color: getSphereColor(sphere.name),
    category:
      index % 4 === 0 ? "Precious" : index % 4 === 1 ? "Semi-Precious" : index % 4 === 2 ? "Synthetic" : "Organic",
    description: `A beautiful ${sphere.name.toLowerCase()} sphere with unique properties and vibrant color.`,
    properties: `Color: ${sphere.name.toLowerCase()}, Texture: Smooth, Origin: Natural`,
    care: "Clean with mild soap and water. Avoid harsh chemicals.",
  }))

  const filteredSpheres =
    activeCategory === "All" ? displaySpheres : displaySpheres.filter((sphere) => sphere.category === activeCategory)

  const handleQuantityChange = (sphereId: number, change: number) => {
    setSelectedQuantities((prev) => {
      const currentQuantity = prev[sphereId] || 1
      const newQuantity = Math.max(1, currentQuantity + change)
      return {
        ...prev,
        [sphereId]: newQuantity,
      }
    })
  }

  const handleInputQuantityChange = (sphereId: number, value: string) => {
    const quantity = Number.parseInt(value) || 1
    if (quantity >= 1) {
      setSelectedQuantities((prev) => ({
        ...prev,
        [sphereId]: quantity,
      }))
    }
  }

  const handleAddToCart = (sphere: (typeof displaySpheres)[0], quantity: number) => {
    addToCart({
      id: Date.now() + Math.random(),
      name: `Individual Sphere - ${sphere.name}`,
      price: sphere.price,
      quantity: quantity,
    })

    toast({
      title: "Added to cart",
      description: `${quantity} ${sphere.name} sphere(s) added to your cart.`,
    })
  }

  const handleQuickAddToCart = (sphere: (typeof displaySpheres)[0]) => {
    handleAddToCart(sphere, 1)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1616697851009-1be942a5c803?q=80&w=2070"
          alt="Spheres Collection"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Individual Spheres</h1>
          <p className="text-lg md:text-xl max-w-2xl text-center px-4">
            Customize your jewelry with our collection of individual spheres
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Description */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Discover Our Spheres</h2>
          <p className="text-gray-600">
            Our individual spheres collection allows you to customize your Sphere Rings or create your own unique
            jewelry pieces. Each sphere is carefully crafted from high-quality materials, offering a wide range of
            colors and textures to express your personal style.
          </p>
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p className="font-medium">Free shipping on orders over $149 or with any ring purchase!</p>
          </div>
        </div>

        {/* Categories/Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={activeCategory === category ? "default" : "secondary"}
              className={`px-4 py-2 text-sm cursor-pointer transition-colors`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredSpheres.map((sphere) => (
            <div key={sphere.id} className="group relative">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="cursor-pointer">
                    <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ backgroundColor: sphere.color }}
                      >
                        <span className="text-4xl font-bold text-white drop-shadow-lg">{sphere.name.charAt(0)}</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-medium">{sphere.name}</h3>
                        <Badge variant="outline">{sphere.category}</Badge>
                      </div>
                      <p className="text-gray-600 mb-4">${sphere.price.toFixed(2)}</p>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>{sphere.name} Sphere</DialogTitle>
                    <DialogDescription>View details and add to your cart</DialogDescription>
                  </DialogHeader>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                    <div className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ backgroundColor: sphere.color }}
                      >
                        <span className="text-6xl font-bold text-white drop-shadow-lg">{sphere.name.charAt(0)}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm">Description</h4>
                        <p className="text-sm text-gray-600">{sphere.description}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Properties</h4>
                        <p className="text-sm text-gray-600">{sphere.properties}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Care Instructions</h4>
                        <p className="text-sm text-gray-600">{sphere.care}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Price</h4>
                        <p className="text-lg font-semibold">${sphere.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-medium">Quantity</span>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(sphere.id, -1)}
                          disabled={(selectedQuantities[sphere.id] || 1) <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          min="1"
                          value={selectedQuantities[sphere.id] || 1}
                          onChange={(e) => handleInputQuantityChange(sphere.id, e.target.value)}
                          className="w-16 text-center"
                        />
                        <Button variant="outline" size="icon" onClick={() => handleQuantityChange(sphere.id, 1)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => handleAddToCart(sphere, selectedQuantities[sphere.id] || 1)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Quick Add to Cart Button */}
              <Button
                variant="secondary"
                size="sm"
                className="absolute bottom-16 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation()
                  handleQuickAddToCart(sphere)
                }}
              >
                <ShoppingCart className="h-4 w-4 mr-1" /> Quick Add
              </Button>
            </div>
          ))}
        </div>

        {/* Customization Guide */}
        <div className="mt-16 bg-gray-50 p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-4 text-center">How to Use Our Spheres</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="relative h-48 mb-4">
                <Image
                  src="/placeholder.svg?height=200&width=200&text=Sphere+Rings"
                  alt="Sphere Rings"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <h4 className="font-semibold mb-2">For Sphere Rings</h4>
              <p className="text-gray-600">
                Select 8 spheres to customize your Sphere Ring, creating a unique combination that reflects your
                personal style.
              </p>
            </div>
            <div className="text-center">
              <div className="relative h-48 mb-4">
                <Image
                  src="/placeholder.svg?height=200&width=200&text=DIY+Jewelry"
                  alt="DIY Jewelry"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <h4 className="font-semibold mb-2">For DIY Jewelry</h4>
              <p className="text-gray-600">
                Use our spheres to create your own custom jewelry pieces, from necklaces to bracelets and more.
              </p>
            </div>
            <div className="text-center">
              <div className="relative h-48 mb-4">
                <Image
                  src="/placeholder.svg?height=200&width=200&text=Replacements"
                  alt="Replacements"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <h4 className="font-semibold mb-2">As Replacements</h4>
              <p className="text-gray-600">
                Replace individual spheres in your existing jewelry to refresh your look or repair your favorite pieces.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

