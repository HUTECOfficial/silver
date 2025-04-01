import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Productos de ejemplo para chains
const chains = [
  {
    id: 1,
    name: "Gold Cuban Link Chain",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071",
    category: "Cuban Link",
  },
  {
    id: 2,
    name: "Silver Box Chain",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0",
    category: "Box",
  },
  {
    id: 3,
    name: "Rose Gold Rope Chain",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1611107683227-e9060eccd846",
    category: "Rope",
  },
  {
    id: 4,
    name: "Platinum Snake Chain",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1602283576570-3d0a33288049",
    category: "Snake",
  },
  {
    id: 5,
    name: "White Gold Figaro Chain",
    price: 449.99,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
    category: "Figaro",
  },
  {
    id: 6,
    name: "Sterling Silver Wheat Chain",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59",
    category: "Wheat",
  },
]

// Categorías de chains
const categories = ["All", "Cuban Link", "Box", "Rope", "Snake", "Figaro", "Wheat"]

export default function ChainsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1598560917505-59a3ad559071?q=80&w=2070"
          alt="Chains Collection"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Chains Collection</h1>
          <p className="text-lg md:text-xl max-w-2xl text-center px-4">
            Timeless chains crafted with precision and elegance
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Description */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Discover Our Chains</h2>
          <p className="text-gray-600">
            Our chain collection features a variety of styles and metals to suit any preference. Whether worn alone as a
            statement piece or paired with a pendant, our chains are designed to be both beautiful and durable for
            everyday wear.
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
          {chains.map((chain) => (
            <div key={chain.id} className="group">
              <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                <Image
                  src={chain.image || "/placeholder.svg"}
                  alt={chain.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium">{chain.name}</h3>
                  <Badge variant="outline">{chain.category}</Badge>
                </div>
                <p className="text-gray-600 mb-4">${chain.price.toFixed(2)}</p>
                <Button className="w-full">Add to Cart</Button>
              </div>
            </div>
          ))}
        </div>

        {/* Chain Length Guide */}
        <div className="mt-16 bg-gray-50 p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-4 text-center">Chain Length Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                Choosing the right chain length is important for comfort and style. Here's a quick guide to help you
                select the perfect length:
              </p>
              <ul className="space-y-2">
                <li>
                  <strong>14-16 inches:</strong> Sits at the base of the neck (choker style)
                </li>
                <li>
                  <strong>18 inches:</strong> Sits at the collarbone (most common length)
                </li>
                <li>
                  <strong>20-22 inches:</strong> Sits below the collarbone
                </li>
                <li>
                  <strong>24 inches:</strong> Sits at the top of the breastbone
                </li>
                <li>
                  <strong>30+ inches:</strong> Long chains that can be doubled up
                </li>
              </ul>
            </div>
            <div className="relative h-64">
              <Image
                src="/placeholder.svg?height=300&width=400&text=Chain+Length+Guide"
                alt="Chain Length Guide"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

