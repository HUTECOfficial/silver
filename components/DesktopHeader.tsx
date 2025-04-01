"use client"
import { ShoppingBag, User, CreditCard } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import { useUser } from "@/contexts/UserContext"
import { CartContent } from "./CartContent"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export default function DesktopHeader() {
  const { getCartCount } = useCart()
  const { user, logout } = useUser()
  const router = useRouter()

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  return (
    <>
      <header className="bg-white shadow-sm py-4 px-6 hidden md:block md:absolute top-0 left-0 right-0 z-50">
        <div className="container mx-auto flex justify-between items-center relative z-10">
          <button onClick={() => handleNavigation("/")} className="text-2xl font-bold">
            Silver Street Jewelry
          </button>
          <nav className="flex-grow">
            <ul className="flex justify-center space-x-8">
              <li>
                <button
                  onClick={() => handleNavigation("/")}
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/all-jewelry")}
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  All Jewelry
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/products/sphere-rings")}
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Sphere Rings
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/about")}
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/contact")}
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <button className="text-gray-600 hover:text-black transition-colors relative">
                  <ShoppingBag size={24} />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {getCartCount()}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Your Cart</SheetTitle>
                  <SheetDescription>Review your items and proceed to checkout</SheetDescription>
                </SheetHeader>
                <CartContent />
              </SheetContent>
            </Sheet>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-gray-600 hover:text-black transition-colors">
                  <User size={24} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {user ? (
                  <>
                    <DropdownMenuItem onSelect={() => handleNavigation("/profile")}>Profile</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/profile/credit-cards")}>
                      <CreditCard className="mr-2" size={16} />
                      Credit Cards
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={logout}>Logout</DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onSelect={() => handleNavigation("/login")}>Login</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleNavigation("/register")}>Register</DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  )
}

