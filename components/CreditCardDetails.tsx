import { Button } from "@/components/ui/button"

interface CreditCardDetailsProps {
  id: string
}

export function CreditCardDetails({ id }: CreditCardDetailsProps) {
  // Datos de tarjetas de crédito con todos los IDs posibles
  const cardDetails = {
    "1": { type: "Visa", lastFour: "1234", expiry: "12/24" },
    "2": { type: "Mastercard", lastFour: "5678", expiry: "06/25" },
    "3": { type: "American Express", lastFour: "9012", expiry: "03/26" },
    // Valor predeterminado para cualquier otro ID
    default: { type: "Credit Card", lastFour: "0000", expiry: "01/25" },
  }

  // Usar un valor predeterminado si el ID no existe
  const card = cardDetails[id as keyof typeof cardDetails] || cardDetails.default

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Credit Card Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-xl mb-2">Card Type: {card.type}</p>
        <p className="text-lg mb-2">Card Number: **** **** **** {card.lastFour}</p>
        <p className="text-lg mb-4">Expiry Date: {card.expiry}</p>
        <Button className="mr-2">Edit Card</Button>
        <Button variant="destructive">Remove Card</Button>
      </div>
    </div>
  )
}

