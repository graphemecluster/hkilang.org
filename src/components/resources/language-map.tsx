import Image from "next/image"

interface LanguageMapProps {
  language: string
}

export default function LanguageMap({ language }: LanguageMapProps) {
  // This would normally be fetched from Strapi, but we're inlining the content
  const mapData = {
    waitau: {
      title: "圍頭話分佈地區",
      description: "圍頭話主要分佈在香港新界西北部的原居民村落，包括元朗、屯門、天水圍等地區的圍村。",
      villages: [
        { name: "廈村", population: "約2,000人" },
        { name: "屏山", population: "約1,800人" },
        { name: "錦田", population: "約2,500人" },
        { name: "元朗舊墟", population: "約1,200人" },
        { name: "屯門舊墟", population: "約1,000人" },
      ],
    },
  }

  const data = mapData[language as keyof typeof mapData]

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200">
      <div className="relative h-64 w-full">
        <Image src="/placeholder.svg?height=400&width=600" alt={data.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h3 className="text-white text-xl font-bold">{data.title}</h3>
        </div>
      </div>
      <div className="p-4 bg-white">
        <p className="text-gray-600 mb-4">{data.description}</p>
        <h4 className="font-medium text-gray-900 mb-2">主要分佈村落</h4>
        <ul className="space-y-1">
          {data.villages.map((village, index) => (
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
