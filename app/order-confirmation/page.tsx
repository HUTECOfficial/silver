"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Check, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStaticSearchParams } from "@/components/SearchParamsProvider"

interface OrderData {
  orderNumber: string
  date: string
  items: any[]
  total: number
  billing: {
    firstName: string
    lastName: string
    email: string
    state?: string
  }
}

export default function OrderConfirmation() {
  const searchParams = useStaticSearchParams()
  const orderNumber = searchParams["order"] || ""
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Solo ejecutar en el navegador
    if (typeof window !== "undefined") {
      try {
        // Recuperar pedidos de localStorage para fines de demostración
        const orders = JSON.parse(localStorage.getItem("orders") || "[]")
        const order = orders.find((o: any) => o.orderNumber === orderNumber)

        if (order) {
          setOrderData(order)
        }
      } catch (error) {
        console.error("Error loading order data:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }, [orderNumber])

  // Mostrar un estado de carga inicial para evitar parpadeos
  if (typeof window !== "undefined" && isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="h-16 w-16 bg-gray-200 rounded-full mx-auto mb-6"></div>
          <div className="h-8 bg-gray-200 rounded max-w-md mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded max-w-sm mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>

        {orderData ? (
          <>
            <p className="mb-8 text-gray-600">
              Your order has been successfully processed. We've sent a confirmation email to {orderData.billing.email}.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg text-left mb-8">
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Order Number</p>
                  <p className="font-medium">{orderData.orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p className="font-medium">{new Date(orderData.date).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-500 mb-2">Items</p>
                {orderData.items.map((item, index) => (
                  <div key={index} className="flex justify-between mb-2">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}

                {orderData.billing?.state === "FL" && (
                  <div className="flex justify-between mt-2">
                    <span>Florida State Tax (7%)</span>
                    <span>${(orderData.total * 0.07).toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t mt-4 pt-4 font-semibold flex justify-between">
                  <span>Total {orderData.billing?.state === "FL" ? "(including FL tax)" : ""}</span>
                  <span>
                    $
                    {orderData.billing?.state === "FL"
                      ? (orderData.total * 1.07).toFixed(2)
                      : orderData.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="mb-8 text-gray-600">
            Your order has been successfully processed. You will receive a confirmation email shortly.
          </p>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>

          <Link href="/all-jewelry">
            <Button variant="outline">
              Continue Shopping <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

