"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, CreditCard, User, ChevronRight } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useUser } from "@/contexts/UserContext"
import { Textarea } from "@/components/ui/textarea"
import { useStaticSearchParams } from "@/components/SearchParamsProvider"

export default function Checkout() {
  const router = useRouter()
  const searchParams = useStaticSearchParams()
  const { cart, getCartTotal, clearCart, areSphereRingsComplete } = useCart()
  const { user } = useUser()
  const [isProcessing, setIsProcessing] = useState(false)
  const [checkoutMethod, setCheckoutMethod] = useState(user ? "account" : "guest")
  const [showShipping, setShowShipping] = useState(false)

  const [billingData, setBillingData] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    phone: "",
    country: "US",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    subscribeNewsletter: false,
    orderNotes: "",
  })

  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    country: "US",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
  })

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
  })

  useEffect(() => {
    if (cart.length === 0) {
      router.push("/cart")
    }
  }, [cart, router])

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setBillingData({
      ...billingData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShippingData({
      ...shippingData,
      [name]: value,
    })
  }

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Format card number with spaces
    if (name === "cardNumber") {
      const formatted =
        value
          .replace(/\s/g, "")
          .match(/.{1,4}/g)
          ?.join(" ") || value

      setPaymentData({
        ...paymentData,
        [name]: formatted,
      })
      return
    }

    // Format expiry date with slash
    if (name === "expiryDate") {
      const sanitized = value.replace(/[^\d]/g, "")
      if (sanitized.length <= 2) {
        setPaymentData({
          ...paymentData,
          [name]: sanitized,
        })
      } else {
        const formatted = `${sanitized.slice(0, 2)}/${sanitized.slice(2, 4)}`
        setPaymentData({
          ...paymentData,
          [name]: formatted,
        })
      }
      return
    }

    setPaymentData({
      ...paymentData,
      [name]: value,
    })
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

  // Actualizar la función getTaxAmount para que solo aplique impuestos a residentes de Florida
  // basado en la dirección de envío

  // Reemplazar la función getTaxAmount actual con esta:
  const getTaxAmount = () => {
    // Aplicar 7% de impuesto solo para residentes de Florida
    // Usar la dirección de envío si está habilitada, de lo contrario usar la dirección de facturación
    const stateToCheck = showShipping ? shippingData.state : billingData.state
    return stateToCheck === "FL" ? getCartTotal() * 0.07 : 0
  }

  const getFinalTotal = () => {
    return getCartTotal() + getShippingCost() + getTaxAmount()
  }

  const validateForm = () => {
    // Check required billing fields
    const requiredBillingFields = ["firstName", "lastName", "email", "phone", "address", "city", "state", "zip"]
    for (const field of requiredBillingFields) {
      if (!billingData[field as keyof typeof billingData]) {
        toast({
          title: "Missing information",
          description: `Please fill in all required billing fields`,
          variant: "destructive",
        })
        return false
      }
    }

    // Check shipping fields if shipping to different address
    if (showShipping) {
      const requiredShippingFields = ["firstName", "lastName", "address", "city", "state", "zip"]
      for (const field of requiredShippingFields) {
        if (!shippingData[field as keyof typeof shippingData]) {
          toast({
            title: "Missing information",
            description: `Please fill in all required shipping fields`,
            variant: "destructive",
          })
          return false
        }
      }
    }

    // Check payment data
    const requiredPaymentFields = ["cardNumber", "cardholderName", "expiryDate", "cvv"]
    for (const field of requiredPaymentFields) {
      if (!paymentData[field]) {
        toast({
          title: "Missing payment information",
          description: `Please fill in all required payment fields`,
          variant: "destructive",
        })
        return false
      }
    }

    // Validate card number format (simplified validation)
    if (paymentData.cardNumber.replace(/\s/g, "").length < 16) {
      toast({
        title: "Invalid card number",
        description: "Please enter a valid credit card number",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    if (!areSphereRingsComplete()) {
      toast({
        title: "Incomplete Sphere Rings",
        description: "Please select 8 spheres for each Sphere Ring before proceeding to checkout.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      // Here you would typically process the payment and create the order
      // For demo purposes, we'll simulate a payment process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Process order data
      const orderData = {
        items: cart,
        billing: billingData,
        shipping: showShipping ? shippingData : billingData,
        payment: {
          last4: paymentData.cardNumber.slice(-4),
          cardType: getCardType(paymentData.cardNumber),
        },
        total: getFinalTotal(),
        orderNumber: `SS-${Date.now().toString().slice(-6)}`,
        date: new Date().toISOString(),
      }

      // Save order to localStorage for demo purposes
      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")
      localStorage.setItem("orders", JSON.stringify([...existingOrders, orderData]))

      clearCart()

      toast({
        title: "Payment successful!",
        description: "Your order has been processed.",
      })

      router.push(`/order-confirmation?order=${orderData.orderNumber}`)
    } catch (error) {
      console.error("Payment failed:", error)
      toast({
        title: "Payment error",
        description: "Unable to process payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  // Helper function to determine card type
  const getCardType = (cardNumber: string) => {
    const firstDigit = cardNumber.charAt(0)
    if (firstDigit === "4") return "Visa"
    if (firstDigit === "5") return "Mastercard"
    if (firstDigit === "3") return "American Express"
    if (firstDigit === "6") return "Discover"
    return "Unknown"
  }

  if (cart.length === 0) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        {!user && (
          <Tabs defaultValue={checkoutMethod} onValueChange={setCheckoutMethod} className="mb-8">
            <TabsList className="grid grid-cols-2 w-full max-w-md">
              <TabsTrigger value="guest">Checkout as Guest</TabsTrigger>
              <TabsTrigger value="account">Login & Checkout</TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="mt-4">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Login to your account</h2>
                <p className="text-gray-600 mb-4">If you already have an account with us, please log in.</p>
                <div className="flex gap-4">
                  <Button onClick={() => router.push("/login?redirect=checkout")}>
                    <User className="mr-2 h-4 w-4" /> Log In
                  </Button>
                  <Button variant="outline" onClick={() => router.push("/register?redirect=checkout")}>
                    Create Account
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}

        {(checkoutMethod === "guest" || user) && (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Billing & Shipping */}
              <div className="lg:col-span-2 space-y-8">
                {/* Billing Information */}
                <div className="bg-white p-6 shadow-sm rounded-lg">
                  <h2 className="text-xl font-semibold mb-6">Billing Details</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={billingData.firstName}
                        onChange={handleBillingChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={billingData.lastName}
                        onChange={handleBillingChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="country" className="block text-sm font-medium text-gray-700">
                      Country / Region <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      name="country"
                      value={billingData.country}
                      onValueChange={(value) => setBillingData({ ...billingData, country: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States (US)</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="MX">Mexico</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Street Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      value={billingData.address}
                      onChange={handleBillingChange}
                      placeholder="House number and street name"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="apartment" className="block text-sm font-medium text-gray-700">
                      Apartment, suite, unit, etc. (optional)
                    </Label>
                    <Input
                      id="apartment"
                      name="apartment"
                      value={billingData.apartment}
                      onChange={handleBillingChange}
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <Label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        Town / City <span className="text-red-500">*</span>
                      </Label>
                      <Input id="city" name="city" value={billingData.city} onChange={handleBillingChange} required />
                    </div>
                    <div>
                      <Label htmlFor="state" className="block text-sm font-medium text-gray-700">
                        State <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        name="state"
                        value={billingData.state}
                        onValueChange={(value) => setBillingData({ ...billingData, state: value })}
                      >
                        <SelectTrigger id="state">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AL">Alabama</SelectItem>
                          <SelectItem value="AK">Alaska</SelectItem>
                          <SelectItem value="AZ">Arizona</SelectItem>
                          <SelectItem value="AR">Arkansas</SelectItem>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="CO">Colorado</SelectItem>
                          <SelectItem value="CT">Connecticut</SelectItem>
                          <SelectItem value="DE">Delaware</SelectItem>
                          <SelectItem value="FL">Florida</SelectItem>
                          <SelectItem value="GA">Georgia</SelectItem>
                          <SelectItem value="HI">Hawaii</SelectItem>
                          <SelectItem value="ID">Idaho</SelectItem>
                          <SelectItem value="IL">Illinois</SelectItem>
                          <SelectItem value="IN">Indiana</SelectItem>
                          <SelectItem value="IA">Iowa</SelectItem>
                          <SelectItem value="KS">Kansas</SelectItem>
                          <SelectItem value="KY">Kentucky</SelectItem>
                          <SelectItem value="LA">Louisiana</SelectItem>
                          <SelectItem value="ME">Maine</SelectItem>
                          <SelectItem value="MD">Maryland</SelectItem>
                          <SelectItem value="MA">Massachusetts</SelectItem>
                          <SelectItem value="MI">Michigan</SelectItem>
                          <SelectItem value="MN">Minnesota</SelectItem>
                          <SelectItem value="MS">Mississippi</SelectItem>
                          <SelectItem value="MO">Missouri</SelectItem>
                          <SelectItem value="MT">Montana</SelectItem>
                          <SelectItem value="NE">Nebraska</SelectItem>
                          <SelectItem value="NV">Nevada</SelectItem>
                          <SelectItem value="NH">New Hampshire</SelectItem>
                          <SelectItem value="NJ">New Jersey</SelectItem>
                          <SelectItem value="NM">New Mexico</SelectItem>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="NC">North Carolina</SelectItem>
                          <SelectItem value="ND">North Dakota</SelectItem>
                          <SelectItem value="OH">Ohio</SelectItem>
                          <SelectItem value="OK">Oklahoma</SelectItem>
                          <SelectItem value="OR">Oregon</SelectItem>
                          <SelectItem value="PA">Pennsylvania</SelectItem>
                          <SelectItem value="RI">Rhode Island</SelectItem>
                          <SelectItem value="SC">South Carolina</SelectItem>
                          <SelectItem value="SD">South Dakota</SelectItem>
                          <SelectItem value="TN">Tennessee</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                          <SelectItem value="UT">Utah</SelectItem>
                          <SelectItem value="VT">Vermont</SelectItem>
                          <SelectItem value="VA">Virginia</SelectItem>
                          <SelectItem value="WA">Washington</SelectItem>
                          <SelectItem value="WV">West Virginia</SelectItem>
                          <SelectItem value="WI">Wisconsin</SelectItem>
                          <SelectItem value="WY">Wyoming</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                        ZIP Code <span className="text-red-500">*</span>
                      </Label>
                      <Input id="zip" name="zip" value={billingData.zip} onChange={handleBillingChange} required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={billingData.phone}
                        onChange={handleBillingChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={billingData.email}
                        onChange={handleBillingChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex items-top gap-2">
                    <Checkbox
                      id="subscribeNewsletter"
                      name="subscribeNewsletter"
                      checked={billingData.subscribeNewsletter}
                      onCheckedChange={(checked) =>
                        setBillingData({ ...billingData, subscribeNewsletter: checked as boolean })
                      }
                    />
                    <Label htmlFor="subscribeNewsletter" className="text-sm text-gray-600">
                      Subscribe to our newsletter to get updates on new products and special offers
                    </Label>
                  </div>

                  <div className="mt-6">
                    <Label htmlFor="orderNotes" className="block text-sm font-medium text-gray-700">
                      Order notes (optional)
                    </Label>
                    <Textarea
                      id="orderNotes"
                      name="orderNotes"
                      value={billingData.orderNotes}
                      onChange={handleBillingChange}
                      placeholder="Notes about your order, e.g. special notes for delivery"
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-white p-6 shadow-sm rounded-lg">
                  <h2 className="text-xl font-semibold mb-6">Payment Information</h2>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                        Card Number <span className="text-red-500">*</span>
                      </Label>
                      <div className="flex items-center">
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={paymentData.cardNumber}
                          onChange={handlePaymentChange}
                          placeholder="0000 0000 0000 0000"
                          maxLength={19}
                          required
                          className="flex-grow"
                        />
                        <CreditCard className="ml-2 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700">
                        Cardholder Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="cardholderName"
                        name="cardholderName"
                        value={paymentData.cardholderName}
                        onChange={handlePaymentChange}
                        placeholder="Name as it appears on card"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                          Expiry Date <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          value={paymentData.expiryDate}
                          onChange={handlePaymentChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                          CVV <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          value={paymentData.cvv}
                          onChange={handlePaymentChange}
                          type="password"
                          maxLength={4}
                          placeholder="***"
                          required
                        />
                      </div>
                    </div>

                    <div className="mt-2 text-sm text-gray-500">Your payment information is secure and encrypted.</div>
                  </div>
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div>
                <div className="bg-white p-6 shadow-sm rounded-lg sticky top-20">
                  <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                  <div className="divide-y space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-start pt-4 first:pt-0">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          {item.selectedSpheres && item.selectedSpheres.length > 0 && (
                            <div className="text-xs text-gray-500 mt-1">
                              <p>Spheres: {item.selectedSpheres.join(", ")}</p>
                            </div>
                          )}
                        </div>
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-2 mb-6">
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
                    {!qualifiesForFreeShipping() && (
                      <div className="text-xs text-gray-500">
                        Free shipping on orders over $149 or with any ring purchase!
                      </div>
                    )}
                    {/* Actualizar el texto explicativo en la sección de resumen del pedido
                    Buscar la sección donde se muestra el impuesto y reemplazarla con: */}
                    <div className="flex justify-between">
                      <span>Tax {(showShipping ? shippingData.state : billingData.state) === "FL" && "(FL 7%)"}</span>
                      <span>${getTaxAmount().toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    {/* También actualizar el texto informativo sobre el impuesto en la sección del total final
                    Reemplazar la línea que muestra "Total with shipping" con: */}
                    <div className="flex justify-between font-medium mb-4">
                      <span>Subtotal with shipping</span>
                      <span>${(getCartTotal() + getShippingCost()).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-medium mb-4 text-sm text-gray-500">
                      <span>+Tax (only for Florida residents)</span>
                      <span>${getTaxAmount().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mb-6">
                      <span>Total</span>
                      <span>${getFinalTotal().toFixed(2)}</span>
                    </div>

                    <Button type="submit" className="w-full py-6" disabled={isProcessing}>
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processing Order...
                        </>
                      ) : (
                        <>
                          Complete Order <ChevronRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-center text-gray-500 mt-4">
                      By placing your order, you agree to our
                      <a href="/terms" className="underline mx-1">
                        Terms of Service
                      </a>
                      and
                      <a href="/privacy" className="underline mx-1">
                        Privacy Policy
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

