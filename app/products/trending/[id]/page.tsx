import Image from "next/image"
import { Button } from "@/components/ui/button"

// Esta función es necesaria para la exportación estática
export function generateStaticParams() {
  // Genera los IDs para los que se crearán páginas estáticas
  return [{ id: "1" }, { id: "2" }, { id: "3" }]
}

export default function TrendingProductPage({ params }: { params: { id: string } }) {
  // Datos de ejemplo basados en el ID
  const products = {
    "1": {
      name: "Sphere Ring Classic",
      price: "$199",
      description: "Our signature ring with customizable spheres",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1770",
    },
    "2": {
      name: "Pearl Necklace",
      price: "$249",
      description: "Elegant pearl necklace for any occasion",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1887",
    },
    "3": {
      name: "Diamond Earrings",
      price: "$299",
      description: "Stunning diamond earrings that sparkle",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1887",
    },
  }

  const product = products[params.id as keyof typeof products] || {
    name: "Product Not Found",
    price: "$0",
    description: "This product does not exist",
    image: "/placeholder.svg?height=600&width=600",
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          <Image
            src={product.image || "/placeholder.svg"}
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

