import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Productos de ejemplo para necklaces
const necklaces = [
  {
    id: 1,
    name: "Pearl Strand Necklace",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
    category: "Pearl",
  },
  {
    id: 2,
    name: "Diamond Pendant Necklace",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a",
    category: "Diamond",
  },
  {
    id: 3,
    name: "Gold Chain Necklace",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071",
    category: "Gold",
  },
  {
    id: 4,
    name: "Silver Choker",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1611107683227-e9060eccd846",
    category: "Silver",
  },
  {
    id: 5,
    name: "Gemstone Bib Necklace",
    price: 449.99,
    image: "https://images.unsplash.com/photo-1602283576570-3d0a33288049",
    category: "Gemstone",
  },
  {
    id: 6,
    name: "Layered Chain Necklace",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0",
    category: "Layered",
  },
]

// Categorías de necklaces
const categories = ["All", "Pearl", "Diamond", "Gold", "Silver", "Gemstone", "Layered"]

export default function NecklacesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=2070"
          alt="Necklaces Collection"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Necklaces Collection</h1>
          <p className="text-lg md:text-xl max-w-2xl text-center px-4">
            Elegant necklaces that frame your face and enhance your natural beauty
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Description */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Discover Our Necklaces</h2>
          <p className="text-gray-600">
            Our necklace collection features a variety of styles, from delicate chains to statement pieces. Each
            necklace is crafted with precision and care, using only the finest materials to ensure lasting beauty.
          </p>
        </div>

        {/* Categories/Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {necklaces.map((necklace) => (
            <div key={necklace.id} className="group">
              <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                <Image
                  src={necklace.image || "/placeholder.svg"}
                  alt={necklace.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium">{necklace.name}</h3>
                  <Badge variant="outline">{necklace.category}</Badge>
                </div>
                <p className="text-gray-600 mb-4">${necklace.price.toFixed(2)}</p>
                <Button className="w-full">Add to Cart</Button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Looking for something special?</h3>
          <p className="text-gray-600 mb-6">
            We can create custom necklaces to match your personal style or for a special occasion.
          </p>
          <Link href="/contact">
            <Button variant="outline" size="lg">
              Inquire About Custom Designs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

