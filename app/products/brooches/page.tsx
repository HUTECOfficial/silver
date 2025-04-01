import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Productos de ejemplo para brooches
const brooches = [
  {
    id: 1,
    name: "Vintage Floral Brooch",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59",
    category: "Vintage",
  },
  {
    id: 2,
    name: "Diamond Butterfly Brooch",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1602283576570-3d0a33288049",
    category: "Diamond",
  },
  {
    id: 3,
    name: "Pearl Cluster Brooch",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
    category: "Pearl",
  },
  {
    id: 4,
    name: "Art Deco Geometric Brooch",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1611107683227-e9060eccd846",
    category: "Art Deco",
  },
  {
    id: 5,
    name: "Sapphire Starburst Brooch",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0",
    category: "Gemstone",
  },
  {
    id: 6,
    name: "Silver Leaf Brooch",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071",
    category: "Silver",
  },
]

// Categorías de brooches
const categories = ["All", "Vintage", "Diamond", "Pearl", "Art Deco", "Gemstone", "Silver"]

export default function BroochesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=2070"
          alt="Brooches Collection"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Brooches Collection</h1>
          <p className="text-lg md:text-xl max-w-2xl text-center px-4">
            Elegant brooches that add sophistication to any outfit
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Description */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Discover Our Brooches</h2>
          <p className="text-gray-600">
            Our brooch collection combines timeless elegance with modern design. From vintage-inspired pieces to
            contemporary statements, our brooches add a touch of sophistication to jackets, scarves, and more.
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
          {brooches.map((brooch) => (
            <div key={brooch.id} className="group">
              <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                <Image
                  src={brooch.image || "/placeholder.svg"}
                  alt={brooch.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium">{brooch.name}</h3>
                  <Badge variant="outline">{brooch.category}</Badge>
                </div>
                <p className="text-gray-600 mb-4">${brooch.price.toFixed(2)}</p>
                <Button className="w-full">Add to Cart</Button>
              </div>
            </div>
          ))}
        </div>

        {/* Styling Tips */}
        <div className="mt-16 bg-gray-50 p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-4 text-center">How to Style Your Brooch</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="relative h-48 mb-4">
                <Image
                  src="/placeholder.svg?height=200&width=200&text=Lapel"
                  alt="Brooch on Lapel"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <h4 className="font-semibold mb-2">On a Lapel</h4>
              <p className="text-gray-600">
                Add a touch of elegance to blazers and jackets by pinning a brooch to the lapel for a sophisticated
                look.
              </p>
            </div>
            <div className="text-center">
              <div className="relative h-48 mb-4">
                <Image
                  src="/placeholder.svg?height=200&width=200&text=Scarf"
                  alt="Brooch on Scarf"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <h4 className="font-semibold mb-2">On a Scarf</h4>
              <p className="text-gray-600">
                Secure a scarf in place while adding a decorative element by using a brooch as both a functional and
                stylish accessory.
              </p>
            </div>
            <div className="text-center">
              <div className="relative h-48 mb-4">
                <Image
                  src="/placeholder.svg?height=200&width=200&text=Collar"
                  alt="Brooch on Collar"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <h4 className="font-semibold mb-2">On a Collar</h4>
              <p className="text-gray-600">
                Transform a simple blouse or dress by adding a brooch to the collar for an instant touch of
                sophistication.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Looking for a unique heirloom piece?</h3>
          <p className="text-gray-600 mb-6">
            Our vintage-inspired brooches make perfect keepsakes to be passed down through generations.
          </p>
          <Link href="/contact">
            <Button variant="outline" size="lg">
              Explore Custom Heirloom Pieces
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

