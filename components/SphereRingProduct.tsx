import Image from "next/image"
import { Button } from "@/components/ui/button"

interface SphereRingProductProps {
  id: string
}

export function SphereRingProduct({ id }: SphereRingProductProps) {
  // Definir los detalles de productos con valores predeterminados
  const productDetails = {
    classic: {
      name: "Classic Sphere Ring",
      price: "$199.99",
      description: "Our timeless classic design, perfect for any occasion.",
    },
    deluxe: {
      name: "Deluxe Sphere Ring",
      price: "$299.99",
      description: "An upgraded version with premium materials and intricate details.",
    },
    premium: {
      name: "Premium Sphere Ring",
      price: "$399.99",
      description: "The ultimate sphere ring, featuring rare materials and exquisite craftsmanship.",
    },
    "1": {
      name: "Signature Sphere Ring",
      price: "$249.99",
      description: "Our signature design with a unique twist.",
    },
    "2": {
      name: "Minimalist Sphere Ring",
      price: "$179.99",
      description: "A sleek, minimalist design for everyday wear.",
    },
    "3": {
      name: "Bold Sphere Ring",
      price: "$229.99",
      description: "A bold statement piece that stands out.",
    },
    "4": {
      name: "Elegant Sphere Ring",
      price: "$259.99",
      description: "An elegant design for special occasions.",
    },
    "5": {
      name: "Modern Sphere Ring",
      price: "$219.99",
      description: "A modern take on our classic design.",
    },
  }

  // Usar un valor predeterminado si el ID no existe en nuestro catálogo
  const product = productDetails[id as keyof typeof productDetails] || {
    name: "Sphere Ring",
    price: "$199.99",
    description: "A beautiful customizable ring.",
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          <Image
            src={`/placeholder.svg?height=600&width=600&text=${product.name}`}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl font-semibold mb-4">{product.price}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <Button className="w-full">Add to Cart</Button>
        </div>
      </div>
    </div>
  )
}

