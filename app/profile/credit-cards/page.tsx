"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, CreditCardIcon, Trash2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { useUser } from "@/contexts/UserContext"
import ClientOnly from "@/components/ClientOnly"

export default function CreditCards() {
  return (
    <ClientOnly>
      <CreditCardsContent />
    </ClientOnly>
  )
}

function CreditCardsContent() {
  const router = useRouter()
  const { user, addCreditCard, getCreditCards, deleteCreditCard } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cardholderName: "",
  })

  if (!user) {
    router.push("/login")
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await addCreditCard(formData)
      toast({
        title: "Credit card added",
        description: "Your credit card has been successfully added.",
      })
      setFormData({ cardNumber: "", expiryDate: "", cardholderName: "" })
    } catch (error) {
      console.error("Failed to add credit card:", error)
      toast({
        title: "Failed to add credit card",
        description: "An error occurred while adding your credit card. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (cardId: string) => {
    try {
      await deleteCreditCard(cardId)
      toast({
        title: "Credit card deleted",
        description: "Your credit card has been successfully deleted.",
      })
    } catch (error) {
      console.error("Failed to delete credit card:", error)
      toast({
        title: "Failed to delete credit card",
        description: "An error occurred while deleting your credit card. Please try again.",
        variant: "destructive",
      })
    }
  }

  const creditCards = getCreditCards()

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Manage Credit Cards</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Add New Credit Card</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                value={formData.cardNumber}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                required
                placeholder="MM/YY"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                value={formData.expiryDate}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700">
                Cardholder Name
              </label>
              <input
                type="text"
                id="cardholderName"
                name="cardholderName"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                value={formData.cardholderName}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin mr-2" />
                  Adding Card...
                </>
              ) : (
                "Add Card"
              )}
            </button>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Credit Cards</h2>
          {creditCards.length === 0 ? (
            <p>You haven't added any credit cards yet.</p>
          ) : (
            <ul className="space-y-4">
              {creditCards.map((card) => (
                <li key={card.id} className="flex items-center justify-between bg-gray-100 p-4 rounded-md">
                  <div className="flex items-center">
                    <CreditCardIcon className="mr-2" />
                    <div>
                      <p className="font-medium">**** **** **** {card.cardNumber.slice(-4)}</p>
                      <p className="text-sm text-gray-600">{card.cardholderName}</p>
                      <p className="text-sm text-gray-600">Expires: {card.expiryDate}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(card.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

