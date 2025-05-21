"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, Search } from "lucide-react"

const navigation = [
  { name: "首頁", href: "/" },
  { name: "關於我們", href: "/about" },
  { name: "最新消息", href: "/news" },
  { name: "語言介紹", href: "/languages" },
  { name: "語言字典", href: "/dictionary" },
  { name: "常見問題", href: "/faq" },
  { name: "聯絡我們", href: "/#contact" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Handle dictionary search button click
  const handleDictionarySearch = () => {
    router.push("/dictionary")
  }

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">香港本土語言保育協會</span>
            <div className="flex items-center">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="香港本土語言保育協會標誌"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="ml-3 text-xl font-serif font-bold text-gray-900">香港本土語言保育協會</span>
            </div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Open main menu</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-sm">
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                  <span className="sr-only">香港本土語言保育協會</span>
                  <div className="flex items-center">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="香港本土語言保育協會標誌"
                      width={40}
                      height={40}
                      className="h-10 w-auto"
                    />
                    <span className="ml-3 text-xl font-serif font-bold text-gray-900">香港本土語言保育協會</span>
                  </div>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </Button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-200">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "block rounded-lg px-3 py-2 text-base font-medium",
                          pathname === item.href ? "bg-gray-50 text-red-800" : "text-gray-900 hover:bg-gray-50",
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    <Button
                      variant="outline"
                      className="w-full text-red-800 border-red-800 hover:bg-red-50"
                      onClick={() => {
                        setMobileMenuOpen(false)
                        handleDictionarySearch()
                      }}
                    >
                      <Search className="mr-2 h-4 w-4" />
                      字典搜尋
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === item.href || (item.href === "/#contact" && pathname === "/")
                  ? "text-red-800 border-b-2 border-red-800"
                  : "text-gray-700 hover:text-red-800",
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button
            variant="outline"
            className="text-sm font-medium text-red-800 border-red-800 hover:bg-red-50"
            onClick={handleDictionarySearch}
          >
            <Search className="mr-2 h-4 w-4" />
            字典搜尋
          </Button>
        </div>
      </nav>
    </header>
  )
}
