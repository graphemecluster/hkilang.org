import Link from "next/link"
import Image from "next/image"
import { Facebook, Youtube, Mail, MapPin, Phone } from "lucide-react"
import { getContactData } from "@/lib/strapi"

export default async function Footer() {
  // Fetch contact data
  const contactData = await getContactData()
  const contactInfo = contactData?.data || {
    address: "香港新界",
    phone: "+852 XXXX XXXX",
    facebookLink: "#",
    youtubeLink: "#",
  }

  return (
    <footer className="bg-gray-50 border-t border-gray-200" id="contact">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
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
            <p className="mt-4 text-sm text-gray-600">
              致力於保育香港本土語言，包括圍頭話、客家話、汀角話及東平洲話，推廣本土語言文化。
            </p>
            <div className="mt-6 flex space-x-4">
              <Link href={contactInfo.facebookLink} className="text-gray-500 hover:text-red-800">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href={contactInfo.youtubeLink} className="text-gray-500 hover:text-red-800">
                <span className="sr-only">YouTube</span>
                <Youtube className="h-6 w-6" />
              </Link>
              <Link
                href={`mailto:${contactInfo.email || "info@hkilang.org"}`}
                className="text-gray-500 hover:text-red-800"
              >
                <span className="sr-only">Email</span>
                <Mail className="h-6 w-6" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-base font-medium text-gray-900">網站連結</h3>
            <ul className="mt-4 space-y-2">
              {[
                { name: "首頁", href: "/" },
                { name: "關於我們", href: "/about" },
                { name: "最新消息", href: "/news" },
                { name: "語言資源", href: "/resources" },
                { name: "語言字典", href: "/dictionary" },
                { name: "常見問題", href: "/faq" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-600 hover:text-red-800">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-base font-medium text-gray-900">聯絡資訊</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <span className="ml-2 text-sm text-gray-600">{contactInfo.address}</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <span className="ml-2 text-sm text-gray-600">{contactInfo.email || "info@hkilang.org"}</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <span className="ml-2 text-sm text-gray-600">{contactInfo.phone}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} 香港本土語言保育協會. 版權所有.
          </p>
        </div>
      </div>
    </footer>
  )
}
