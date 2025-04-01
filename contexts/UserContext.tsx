"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { toast } from "@/components/ui/use-toast"

type User = {
  id: string
  name: string
  email: string
  isVerified: boolean
} | null

type CreditCard = {
  id: string
  cardNumber: string
  expiryDate: string
  cardholderName: string
}

type UserContextType = {
  user: User
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (name: string, email: string, password: string) => Promise<void>
  verifyEmail: (token: string) => Promise<void>
  addCreditCard: (cardData: Omit<CreditCard, "id">) => Promise<void>
  getCreditCards: () => CreditCard[]
  deleteCreditCard: (cardId: string) => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null)
  const [creditCards, setCreditCards] = useState<CreditCard[]>([])

  useEffect(() => {
    // Check for existing user session (e.g., in localStorage)
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    const storedCards = localStorage.getItem("creditCards")
    if (storedCards) {
      setCreditCards(JSON.parse(storedCards))
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Here you would typically call your authentication API
    // For now, we'll simulate a login process
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const newUser = { id: "1", name: "John Doe", email, isVerified: true }
    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const register = async (name: string, email: string, password: string) => {
    // Here you would typically call your registration API
    // For now, we'll simulate a registration process
    await new Promise((resolve) => setTimeout(resolve, 1000))
    // Simulate sending a verification email
    console.log(`Verification email sent to ${email}`)
    toast({
      title: "Verification email sent",
      description: `Please check your email (${email}) to verify your account.`,
    })
  }

  const verifyEmail = async (token: string) => {
    // Here you would typically call your email verification API
    // For now, we'll simulate the verification process
    await new Promise((resolve) => setTimeout(resolve, 1000))
    if (user) {
      const verifiedUser = { ...user, isVerified: true }
      setUser(verifiedUser)
      localStorage.setItem("user", JSON.stringify(verifiedUser))
    }
  }

  const addCreditCard = async (cardData: Omit<CreditCard, "id">) => {
    // Here you would typically call your API to add a credit card
    // For now, we'll simulate adding a card locally
    const newCard: CreditCard = { ...cardData, id: Date.now().toString() }
    const updatedCards = [...creditCards, newCard]
    setCreditCards(updatedCards)
    localStorage.setItem("creditCards", JSON.stringify(updatedCards))
  }

  const getCreditCards = () => {
    return creditCards
  }

  const deleteCreditCard = async (cardId: string) => {
    // Here you would typically call your API to delete a credit card
    // For now, we'll simulate deleting a card locally
    const updatedCards = creditCards.filter((card) => card.id !== cardId)
    setCreditCards(updatedCards)
    localStorage.setItem("creditCards", JSON.stringify(updatedCards))
  }

  return (
    <UserContext.Provider
      value={{ user, login, logout, register, verifyEmail, addCreditCard, getCreditCards, deleteCreditCard }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

