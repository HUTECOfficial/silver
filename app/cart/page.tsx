"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/CartContext"
import { toast } from "@/components/ui/use-toast"

export default function Cart() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const { cart, addToCart, removeFromCart, getCartTotal } = useCart()

  const updateQuantity = (item: any, change: number) => {
    if (change > 0) {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
      })
    } else {
      removeFromCart(item.id)
    }
  }

  const areSphereRingsComplete = () => {
    // Assuming items with name containing "Sphere Ring" need 8 quantity
    for (const item of cart) {
      if (item.name.includes("Sphere Ring") && item.quantity < 8) {
        return false
      }
    }
    return true
  }

  const handleCheckout = () => {
    if (!areSphereRingsComplete()) {
      toast({
        title: "Incomplete Sphere Rings",
        description: "Please select 8 spheres for each Sphere Ring before proceeding to checkout.",
        variant: "destructive",
      })
      return
    }
    setIsProcessing(true)
    router.push("/checkout")
  }

  // Calculate if order qualifies for free shipping
  const qualifiesForFreeShipping = () => {
    // Free shipping if total is over $149 or if there's a ring in the cart
    return getCartTotal() >= 149 || cart.some((item) => item.name.includes("Ring"))
  }

  // Calculate shipping cost
  const getShippingCost = () => {
    return qualifiesForFreeShipping() ? 0 : 9.99
  }

  // Actualizar la función getTaxAmount para aclarar que es solo para residentes de Florida
  const getTaxAmount = () => {
    // Mostramos el potencial impuesto de Florida, pero se aplicará solo a residentes de FL en el checkout
    return getCartTotal() * 0.07
  }

  // Calculate final total with shipping
  const getFinalTotal = () => {
    return getCartTotal() + getShippingCost()
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl mb-8">Shopping Cart</h1>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 mb-6 bg-white p-4 shadow-sm rounded-lg">
                <div className="relative w-24 h-24">
                  <Image
                    src="/placeholder.svg"
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <button
                      onClick={() => updateQuantity(item, -1)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item, 1)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 hover:bg-gray-100 rounded-full text-red-500 ml-4 transition-colors"
                      aria-label="Remove product"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 shadow-sm rounded-lg h-fit">
            <h2 className="text-xl mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                {qualifiesForFreeShipping() ? (
                  <span className="text-green-600">Free</span>
                ) : (
                  <span>${getShippingCost().toFixed(2)}</span>
                )}
              </div>
              <div className="flex justify-between">
                <span>Tax (7% for FL residents only)</span>
                <span>${getTaxAmount().toFixed(2)}</span>
              </div>
              {!qualifiesForFreeShipping() && (
                <div className="text-sm text-gray-500 mt-1">
                  Free shipping on orders over $149 or with any ring purchase!
                </div>
              )}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-medium mb-4">
                <span>Subtotal with shipping</span>
                <span>${getFinalTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium mb-4 text-sm text-gray-500">
                <span>+Tax (if shipping to Florida)</span>
                <span>${(getFinalTotal() * 0.07).toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isProcessing || !areSphereRingsComplete()}
                className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={20} className="animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  "Proceed to Checkout"
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link
            href="/all-jewelry"
            className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  )
}

