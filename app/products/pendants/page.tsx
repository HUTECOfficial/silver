import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Productos de ejemplo para pendants
const pendants = [
  {
    id: 1,
    name: "Diamond Solitaire Pendant",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a",
    category: "Diamond",
  },
  {
    id: 2,
    name: "Sapphire Halo Pendant",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1602283576570-3d0a33288049",
    category: "Gemstone",
  },
  {
    id: 3,
    name: "Gold Heart Pendant",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071",
    category: "Gold",
  },
  {
    id: 4,
    name: "Pearl Drop Pendant",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
    category: "Pearl",
  },
  {
    id: 5,
    name: "Silver Locket",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0",
    category: "Silver",
  },
  {
    id: 6,
    name: "Emerald Vintage Pendant",
    price: 549.99,
    image: "https://images.unsplash.com/photo-1611107683227-e9060eccd846",
    category: "Gemstone",
  },
]

// Categorías de pendants
const categories = ["All", "Diamond", "Gemstone", "Gold", "Silver", "Pearl", "Vintage"]

export default function PendantsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070"
          alt="Pendants Collection"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Pendants Collection</h1>
          <p className="text-lg md:text-xl max-w-2xl text-center px-4">
            Beautiful pendants that tell your unique story
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Description */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Discover Our Pendants</h2>
          <p className="text-gray-600">
            Our pendant collection features exquisite designs that serve as the perfect focal point for any necklace.
            From classic solitaires to intricate vintage-inspired pieces, each pendant is crafted to be a treasured
            keepsake.
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
          {pendants.map((pendant) => (
            <div key={pendant.id} className="group">
              <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                <Image
                  src={pendant.image || "/placeholder.svg"}
                  alt={pendant.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium">{pendant.name}</h3>
                  <Badge variant="outline">{pendant.category}</Badge>
                </div>
                <p className="text-gray-600 mb-4">${pendant.price.toFixed(2)}</p>
                <Button className="w-full">Add to Cart</Button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Looking for a meaningful gift?</h3>
          <p className="text-gray-600 mb-6">
            Our pendants can be personalized with engravings or custom designs to create a truly special piece.
          </p>
          <Link href="/contact">
            <Button variant="outline" size="lg">
              Inquire About Personalization
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

