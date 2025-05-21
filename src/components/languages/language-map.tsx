import Image from "next/image"

interface Village {
  name: string
  population: string
}

interface LanguageMapProps {
  language: string
  title: string
  description: string
  villages: Village[]
  mapImage: string
}

export default function LanguageMap({ language, title, description, villages, mapImage }: LanguageMapProps) {
  return (
    <div className="rounded-lg overflow-hidden border border-gray-200">
      <div className="relative h-64 w-full">
        <Image src={mapImage || "/placeholder.svg?height=400&width=600"} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h3 className="text-white text-xl font-bold">{title}</h3>
        </div>
      </div>
      <div className="p-4 bg-white">
        <p className="text-gray-600 mb-4">{description}</p>
        <h4 className="font-medium text-gray-900 mb-2">主要分佈村落</h4>
        <ul className="space-y-1">
          {villages.map((village, index) => (
            <li key={index} className="flex justify-between">
              <span>{village.name}</span>
              <span className="text-gray-500">{village.population}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
