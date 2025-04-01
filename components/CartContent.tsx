"use client"

import Image from "next/image"
import { useCart } from "@/contexts/CartContext"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { X, Plus, Minus } from "lucide-react"
import { useRouter } from "next/navigation"

export function CartContent() {
  const router = useRouter()
  const { cart, removeFromCart, addToCart, getCartTotal } = useCart()

  if (cart.length === 0) {
    return <p className="text-center py-4">Your cart is empty</p>
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <ScrollArea className="h-[300px] pr-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 py-2">
            <div className="relative w-16 h-16">
              <Image src="/placeholder.svg" alt={item.name} layout="fill" objectFit="cover" className="rounded-md" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium">{item.name}</h3>
              <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => addToCart({ ...item, quantity: 1 })}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="text-sm">{item.quantity}</span>
                <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => removeFromCart(item.id)}>
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFromCart(item.id)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </ScrollArea>
      <div className="mt-4 space-y-4">
        <div className="flex justify-between">
          <span className="font-medium">Total:</span>
          <span className="font-medium">${getCartTotal().toFixed(2)}</span>
        </div>
        <Button className="w-full" onClick={() => router.push("/checkout")}>
          Checkout
        </Button>
      </div>
    </div>
  )
}

