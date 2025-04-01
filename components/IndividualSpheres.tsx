"use client"

import { useState, useMemo } from "react"
import { Plus, Minus, ShoppingCart, Info, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/CartContext"
import { toast } from "@/components/ui/use-toast"
import { spheres, sphereDetails } from "@/lib/sphereData"
import { Input } from "@/components/ui/input"
import ClientOnly from "@/components/ClientOnly"

export function IndividualSpheres() {
  return (
    <ClientOnly>
      <IndividualSpheresContent />
    </ClientOnly>
  )
}

function IndividualSpheresContent() {
  const [selectedSpheres, setSelectedSpheres] = useState<{ [key: string]: number }>({})
  const [openDialog, setOpenDialog] = useState<string | null>(null)
  const { addToCart } = useCart()

  const totalSelected = useMemo(() => {
    return Object.values(selectedSpheres).reduce((sum, quantity) => sum + quantity, 0)
  }, [selectedSpheres])

  const totalPrice = useMemo(() => {
    return Object.entries(selectedSpheres).reduce((sum, [_, quantity]) => sum + quantity * 20, 0)
  }, [selectedSpheres])

  const handleQuantityChange = (sphereName: string, newQuantity: number) => {
    setSelectedSpheres((prev) => {
      if (newQuantity <= 0) {
        const { [sphereName]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [sphereName]: newQuantity }
    })
  }

  const handleAddToCart = () => {
    if (totalSelected === 0) {
      toast({
        title: "No spheres selected",
        description: "Please select at least one sphere before adding to cart.",
        variant: "destructive",
      })
      return
    }

    Object.entries(selectedSpheres).forEach(([name, quantity]) => {
      addToCart({
        id: Date.now() + Math.random(),
        name: `Individual Sphere - ${name}`,
        price: 20,
        quantity,
      })
    })

    toast({
      title: "Added to cart",
      description: `${totalSelected} individual sphere(s) have been added to your cart.`,
    })

    setSelectedSpheres({})
  }

  const handleAddSingleToCart = (sphereName: string) => {
    const quantity = selectedSpheres[sphereName] || 0
    if (quantity > 0) {
      addToCart({
        id: Date.now() + Math.random(),
        name: `Individual Sphere - ${sphereName}`,
        price: 20,
        quantity,
      })
      toast({
        title: "Added to cart",
        description: `${quantity} ${sphereName} sphere(s) added to your cart.`,
      })
      setSelectedSpheres((prev) => {
        const { [sphereName]: _, ...rest } = prev
        return rest
      })
    } else {
      toast({
        title: "Please select a quantity",
        description: "You must select at least one sphere before adding to cart.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Individual Spheres</h2>
        <Button variant="outline" size="sm" onClick={() => setOpenDialog("info")}>
          <Info className="mr-2 h-4 w-4" />
          How it works
        </Button>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <p className="text-lg font-semibold">Selected: {totalSelected} sphere(s)</p>
        <p className="text-sm text-gray-600">Total Price: ${totalPrice.toFixed(2)}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {spheres.map((sphere) => (
          <motion.div
            key={sphere.name}
            className="bg-white p-4 rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div
              className="relative aspect-square mb-2 cursor-pointer overflow-hidden rounded-md"
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpenDialog(sphere.name)}
            >
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  backgroundColor: sphere.color || "#cccccc",
                  backgroundImage: sphereDetails[sphere.name]?.image
                    ? `url(${sphereDetails[sphere.name].image})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!sphereDetails[sphere.name]?.image && (
                  <span className="text-3xl font-bold text-white drop-shadow-lg">{sphere.name.charAt(0)}</span>
                )}
              </div>
            </motion.div>

            <h3 className="text-sm font-semibold mb-2">{sphere.name}</h3>
            <p className="text-sm text-gray-600 mb-2">$20.00</p>
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(sphere.name, (selectedSpheres[sphere.name] || 0) - 1)}
                disabled={!selectedSpheres[sphere.name]}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                min="0"
                value={selectedSpheres[sphere.name] || 0}
                onChange={(e) => handleQuantityChange(sphere.name, Number.parseInt(e.target.value) || 0)}
                className="w-16 text-center"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(sphere.name, (selectedSpheres[sphere.name] || 0) + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={handleAddToCart} disabled={totalSelected === 0}>
          <ShoppingCart className="mr-2" />
          Add to Cart ({totalSelected} spheres)
        </Button>
      </div>

      {/* Custom Modal/Dialog with Framer Motion */}
      <AnimatePresence>
        {openDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              className="fixed inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenDialog(null)}
            />

            <motion.div
              className="bg-white rounded-lg shadow-xl w-[90vw] max-w-[600px] max-h-[90vh] overflow-y-auto z-50 relative"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 z-10"
                onClick={() => setOpenDialog(null)}
              >
                <X className="h-4 w-4" />
              </Button>

              {openDialog === "info" ? (
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">How to Purchase Individual Spheres</h2>
                  <p className="text-gray-600 mb-4">Here's how you can purchase individual spheres:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Browse our selection of 96 unique sphere types.</li>
                    <li>Choose the quantity you want for each sphere type.</li>
                    <li>Each sphere costs $20.</li>
                    <li>Mix and match different types of spheres as you like.</li>
                    <li>Click on a sphere's image to learn more about it.</li>
                    <li>Use the plus and minus buttons or type directly to adjust quantities.</li>
                    <li>Add to cart when you're ready to purchase.</li>
                  </ul>
                </div>
              ) : (
                <div className="p-6">
                  {spheres.find((s) => s.name === openDialog) && (
                    <>
                      <h2 className="text-2xl font-bold mb-2">{openDialog}</h2>
                      <p className="text-gray-600 mb-6">Detailed information about this beautiful sphere</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                        <div className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                          {sphereDetails[openDialog]?.image ? (
                            <div
                              className="w-full h-full"
                              style={{
                                backgroundImage: `url(${sphereDetails[openDialog].image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                            />
                          ) : (
                            <div
                              className="w-full h-full flex items-center justify-center"
                              style={{
                                backgroundColor: spheres.find((s) => s.name === openDialog)?.color || "#cccccc",
                              }}
                            >
                              <span className="text-6xl font-bold text-white drop-shadow-lg">
                                {openDialog.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h3 className="text-xl font-bold mb-2">{openDialog}</h3>
                            <p className="text-gray-700">
                              {sphereDetails[openDialog]?.description ||
                                `A beautiful ${openDialog.toLowerCase()} sphere with unique properties and vibrant color.`}
                            </p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-sm mb-2">Properties</h4>
                            <p className="text-sm text-gray-600">
                              {sphereDetails[openDialog]?.properties ||
                                `Color: ${spheres.find((s) => s.name === openDialog)?.color || "Various"}, Texture: Smooth, Origin: Natural`}
                            </p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-sm mb-2">Care Instructions</h4>
                            <p className="text-sm text-gray-600">
                              {sphereDetails[openDialog]?.care ||
                                "Clean with mild soap and water. Avoid harsh chemicals and extreme temperatures."}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">Price</h4>
                            <p className="text-lg font-semibold">$20.00 per unit</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t">
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-medium">Quantity:</span>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleQuantityChange(openDialog, (selectedSpheres[openDialog] || 0) - 1)}
                              disabled={!selectedSpheres[openDialog]}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              min="0"
                              value={selectedSpheres[openDialog] || 0}
                              onChange={(e) => handleQuantityChange(openDialog, Number.parseInt(e.target.value) || 0)}
                              className="w-16 text-center"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleQuantityChange(openDialog, (selectedSpheres[openDialog] || 0) + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <Button
                          className="w-full"
                          onClick={() => {
                            handleAddSingleToCart(openDialog)
                            setOpenDialog(null)
                          }}
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

