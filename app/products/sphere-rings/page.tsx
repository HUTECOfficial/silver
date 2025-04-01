"use client"

import { useState } from "react"
import Image from "next/image"
import { Info, ShoppingCart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useCart } from "@/contexts/CartContext"
import { toast } from "@/components/ui/use-toast"
import { spheres } from "@/lib/sphereData"
import { IndividualSpheres } from "@/components/IndividualSpheres"
import { motion, AnimatePresence } from "framer-motion"
import ClientOnly from "@/components/ClientOnly"

export default function SphereRings() {
  return (
    <ClientOnly>
      <SphereRingsContent />
    </ClientOnly>
  )
}

function SphereRingsContent() {
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedSpheres, setSelectedSpheres] = useState<string[]>([])
  const { addToCart } = useCart()

  // Añade este estado para controlar qué diálogo está abierto
  const [openSphereDialog, setOpenSphereDialog] = useState<string | null>(null)

  // Actualizar el precio base del anillo
  const basePrice = 148.0

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

  const handleSphereSelection = (sphere: string) => {
    setSelectedSpheres((prev) => {
      if (prev.includes(sphere)) {
        return prev.filter((s) => s !== sphere)
      }
      if (prev.length < 8) {
        return [...prev, sphere]
      }
      return prev
    })
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a ring size",
        description: "You must select your ring size before adding to cart.",
        variant: "destructive",
      })
      return
    }

    if (selectedSpheres.length !== 8) {
      toast({
        title: "Please select 8 spheres",
        description: "You must select exactly 8 spheres for your ring.",
        variant: "destructive",
      })
      return
    }

    addToCart({
      id: Date.now(),
      name: `Silver Street Sphere Ring (Size ${selectedSize})`,
      price: basePrice, // Usando el nuevo precio base
      quantity: 1,
      selectedSpheres,
    })

    toast({
      title: "Added to cart",
      description: "Your customized Sphere Ring has been added to your cart.",
    })

    setSelectedSize("")
    setSelectedSpheres([])
  }

  const SizeGuideContent = () => {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-base font-medium mb-4">
            1. Measure the internal diameter of a ring that fits the desired finger
          </h3>
          <div className="aspect-video w-full mb-4">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Reemplazar con el URL real del video
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        <div>
          <h3 className="text-base font-medium mb-4">2. Use the table below to determine your ring size</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Finger Circumference (mm)</th>
                  <th className="px-4 py-2 text-left">US Size</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { circ: "49.3", size: "5" },
                  { circ: "50.6", size: "5 1/2" },
                  { circ: "51.9", size: "6" },
                  { circ: "53.1", size: "6 1/2" },
                  { circ: "54.4", size: "7" },
                  { circ: "55.7", size: "7 1/2" },
                  { circ: "56.9", size: "8" },
                  { circ: "58.2", size: "8 1/2" },
                  { circ: "59.5", size: "9" },
                  { circ: "60.8", size: "9 1/2" },
                  { circ: "62.1", size: "10" },
                ].map((row, i) => (
                  <tr key={i} className="border-b">
                    <td className="px-4 py-2">{row.circ}</td>
                    <td className="px-4 py-2">{row.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Tips for Finding Your Perfect Fit</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Measure when your fingers are at room temperature</li>
            <li>• Avoid measuring when your hands are cold or swollen</li>
            <li>• Measure at the end of the day when your fingers are largest</li>
            <li>• If between sizes, choose the larger size</li>
          </ul>
        </div>
        <div className="text-sm text-gray-600">
          Need help? Contact{" "}
          <a href="mailto:support@silverstreet.com" className="text-primary hover:underline">
            support@silverstreet.com
          </a>{" "}
          for assistance with finding your perfect size.
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-[1920px] mx-auto px-4 py-8 md:py-16">
      <Tabs defaultValue="ring" className="w-full">
        <TabsList className="w-full mb-8">
          <TabsTrigger value="ring" className="w-1/2">
            Sphere Ring
          </TabsTrigger>
          <TabsTrigger value="individual" className="w-1/2">
            Individual Spheres
          </TabsTrigger>
        </TabsList>
        <TabsContent value="ring">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 md:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="Silver Street Sphere Ring"
                  layout="fill"
                  objectFit="cover"
                  className="w-full"
                />
              </div>
              <div className="grid grid-cols-4 gap-2 md:gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=150&width=150"
                      alt={`Product view ${i}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div>
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h1 className="text-3xl font-bold mb-4">One Ring — Endless Possibilities</h1>
                <p className="text-gray-600">
                  Our signature Silver Street Sphere Ring is designed for effortless elegance and personal expression.
                  It allows you to personalize your look with interchangeable spheres — adapting to your style to suit
                  any moment.
                </p>
                <div className="mt-4">
                  <h2 className="text-xl font-semibold mb-2">What's Included:</h2>
                  <p className="text-gray-600">
                    Your purchase includes your custom selection of 8 spheres from our Basics Spheres Collection.
                  </p>
                </div>
                <div className="mt-4">
                  <h2 className="text-xl font-semibold mb-2">Make It Your Own:</h2>
                  <p className="text-gray-600">
                    Want even more options? Make sure to check out our Sphere Collection and discover different stones,
                    colors, and textures to elevate your look!
                  </p>
                </div>
              </div>
              <p className="text-xl md:text-2xl font-bold mb-4 md:mb-6">${basePrice}</p>

              {/* Size Selection */}
              <div className="mb-6 md:mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-lg font-semibold">Choose your size</h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full">
                        <Info className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[90vw] max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-xl md:text-2xl text-center">
                          Let's find your perfect size
                        </DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="h-[80vh] pr-4">
                        <SizeGuideContent />
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </div>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your ring size" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => i + 3).map((size) => (
                      <SelectItem key={size} value={size.toString()}>
                        Size {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sphere Selection */}
              <div className="mb-6 md:mb-8">
                <h2 className="text-lg font-semibold mb-4">Choose your spheres (8)</h2>
                <ScrollArea className="h-[300px] pr-4">
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 xl:grid-cols-16 gap-2 mb-6">
                    {spheres.map((sphere) => (
                      <motion.button
                        key={sphere.name}
                        className={`p-2 rounded-lg text-sm font-medium relative overflow-hidden ${
                          selectedSpheres.includes(sphere.name)
                            ? "ring-2 ring-black text-white"
                            : "hover:ring-1 hover:ring-gray-400 text-gray-800"
                        } ${
                          selectedSpheres.length >= 8 && !selectedSpheres.includes(sphere.name)
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        disabled={selectedSpheres.length >= 8 && !selectedSpheres.includes(sphere.name)}
                        style={{
                          backgroundColor: getSphereColor(sphere.name),
                        }}
                        onClick={() =>
                          !selectedSpheres.includes(sphere.name) && selectedSpheres.length >= 8
                            ? null
                            : setOpenSphereDialog(sphere.name)
                        }
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <span className="relative z-10 drop-shadow-md font-bold">{sphere.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </ScrollArea>
                <p className="text-sm text-gray-500 mt-2">Selected: {selectedSpheres.length}/8 spheres</p>
              </div>

              {/* Add to Cart */}
              {selectedSpheres.length === 8 && selectedSize && (
                <Button onClick={handleAddToCart} className="w-full py-4 md:py-6 text-base md:text-lg">
                  <ShoppingCart className="mr-2" />
                  Add to Cart
                </Button>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="individual">
          <IndividualSpheres />
        </TabsContent>
      </Tabs>
      <AnimatePresence>
        {openSphereDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              className="fixed inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenSphereDialog(null)}
            />

            <motion.div
              className="bg-white rounded-lg shadow-xl w-[90vw] max-w-[500px] max-h-[90vh] overflow-y-auto z-50 relative"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 z-10"
                onClick={() => setOpenSphereDialog(null)}
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{openSphereDialog} Sphere</h2>
                <p className="text-gray-600 mb-4">Detailed information about this beautiful sphere</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                  <div className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: getSphereColor(openSphereDialog) }}
                    >
                      <span className="text-6xl font-bold text-white drop-shadow-lg">
                        {openSphereDialog?.charAt(0)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm">Description</h4>
                      <p className="text-sm text-gray-600">
                        A beautiful {openSphereDialog?.toLowerCase()} sphere with unique properties and vibrant color.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Properties</h4>
                      <p className="text-sm text-gray-600">
                        Color: {openSphereDialog?.toLowerCase()}
                        <br />
                        Texture: Smooth
                        <br />
                        Origin: Natural
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Price</h4>
                      <p className="text-lg font-semibold">$20.00 per unit</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Status</h4>
                      <p className="text-sm font-semibold">
                        {selectedSpheres.includes(openSphereDialog || "")
                          ? "Selected for your ring"
                          : "Not selected for your ring"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 mt-2">
                  <div className="flex items-center justify-between mt-2">
                    <Button
                      variant={selectedSpheres.includes(openSphereDialog || "") ? "destructive" : "default"}
                      onClick={() => {
                        handleSphereSelection(openSphereDialog || "")
                        setOpenSphereDialog(null)
                      }}
                      disabled={selectedSpheres.length >= 8 && !selectedSpheres.includes(openSphereDialog || "")}
                    >
                      {selectedSpheres.includes(openSphereDialog || "") ? "Remove from ring" : "Add to ring"}
                    </Button>
                    <p className="text-sm text-gray-500">{selectedSpheres.length}/8 spheres selected</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

