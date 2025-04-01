import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Productos de ejemplo para earrings
const earrings = [
  {
    id: 1,
    name: "Diamond Studs",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908",
    category: "Studs",
  },
  {
    id: 2,
    name: "Pearl Drop Earrings",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1611107683227-e9060eccd846",
    category: "Drop",
  },
  {
    id: 3,
    name: "Gold Hoops",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59",
    category: "Hoops",
  },
  {
    id: 4,
    name: "Sapphire Studs",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d",
    category: "Studs",
  },
  {
    id: 5,
    name: "Emerald Chandelier Earrings",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1602283576570-3d0a33288049",
    category: "Chandelier",
  },
  {
    id: 6,
    name: "Silver Threader Earrings",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0",
    category: "Threader",
  },
]

// Categorías de earrings
const categories = ["All", "Studs", "Hoops", "Drop", "Chandelier", "Threader"]

export default function EarringsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2070"
          alt="Earrings Collection"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Earrings Collection</h1>
          <p className="text-lg md:text-xl max-w-2xl text-center px-4">
            Elegant and timeless earrings to complement any look
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Description */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Discover Our Earrings</h2>
          <p className="text-gray-600">
            From classic studs to statement chandeliers, our earrings collection offers pieces for every occasion. Each
            pair is crafted with attention to detail and quality materials to ensure both beauty and durability.
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
          {earrings.map((earring) => (
            <div key={earring.id} className="group">
              <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                <Image
                  src={earring.image || "/placeholder.svg"}
                  alt={earring.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium">{earring.name}</h3>
                  <Badge variant="outline">{earring.category}</Badge>
                </div>
                <p className="text-gray-600 mb-4">${earring.price.toFixed(2)}</p>
                <Button className="w-full">Add to Cart</Button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h3>
          <p className="text-gray-600 mb-6">We offer custom designs to match your unique style and preferences.</p>
          <Link href="/contact">
            <Button variant="outline" size="lg">
              Contact Us for Custom Designs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

