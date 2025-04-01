import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  className?: string
  size?: "small" | "medium" | "large"
}

export default function Logo({ className = "", size = "medium" }: LogoProps) {
  const sizes = {
    small: 30,
    medium: 40,
    large: 60,
  }

  const height = sizes[size]
  const width = height * 1.5 // Maintain aspect ratio

  return (
    <Link href="/" className={`block ${className}`}>
      <Image
        src="/logo.png" // Asume que el logo se guardará como 'logo.png' en la carpeta 'public'
        alt="Silver Street Jewelry Logo"
        width={width}
        height={height}
        className="object-contain"
        priority
      />
    </Link>
  )
}

