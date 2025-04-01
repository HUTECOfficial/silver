import Link from "next/link"
import Image from "next/image"

// Lista completa de categorías según el mockup
const categories = [
  {
    name: "Sphere Rings",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e",
    description: "Our signature customizable rings",
  },
  {
    name: "Spheres",
    image: "https://images.unsplash.com/photo-1616697851009-1be942a5c803",
    description: "Individual spheres for your collection",
  },
  {
    name: "Earrings",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908",
    description: "Classic and statement earrings",
  },
  {
    name: "Necklaces",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
    description: "Elegant necklaces for any occasion",
  },
  {
    name: "Pendants",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a",
    description: "Beautiful pendants to express your style",
  },
  {
    name: "Chains",
    image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071",
    description: "Timeless chains in various styles",
  },
  {
    name: "Brooches",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59",
    description: "Sophisticated brooches to complement your look",
  },
]

export default function AllJewelry() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">All Jewelry</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, i) => (
          <Link key={i} href={`/products/${category.name.toLowerCase().replace(/\s+/g, "-")}`} className="group block">
            <div className="relative aspect-video overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center">
                <h3 className="text-white text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-white text-sm opacity-90 max-w-xs text-center px-4">{category.description}</p>
                <span className="mt-4 px-6 py-2 bg-white text-black rounded-full text-sm font-medium opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Explore Collection
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

