"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

// This is a mock word of the day data
// In a real application, this data should be fetched from Strapi CMS
const wordOfTheDay = {
  date: "2023年5月5日",
  character: "天光",
  waitau: {
    pronunciation: "tin1 gwong1",
    audio: "/audio/sample.mp3",
  },
  hakka: {
    pronunciation: "tien1 gong1",
    audio: "/audio/sample.mp3",
  },
  mandarin: "天亮",
  english: "dawn, daybreak",
  example: {
    original: "聽日天光就要出發。",
    translation: "明天天亮就要出發。",
    english: "We will depart at dawn tomorrow.",
  },
}

export default function WordOfTheDay() {
  const [isPlayingWaitau, setIsPlayingWaitau] = useState(false)
  const [isPlayingHakka, setIsPlayingHakka] = useState(false)

  // Simulate audio playback functionality
  const playAudio = (type: "waitau" | "hakka") => {
    if (type === "waitau") {
      setIsPlayingWaitau(true)
      setTimeout(() => setIsPlayingWaitau(false), 2000)
    } else {
      setIsPlayingHakka(true)
      setTimeout(() => setIsPlayingHakka(false), 2000)
    }
  }

  return (
    <Card className="overflow-hidden border-2 border-red-100">
      <div className="bg-red-800 px-4 py-2 text-white">
        <div className="text-sm">{wordOfTheDay.date}</div>
      </div>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-2xl font-serif font-bold text-gray-900">{wordOfTheDay.character}</h3>
            <div className="mt-4 space-y-3">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">圍頭話</span>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => playAudio("waitau")}>
                    <Play className={`h-4 w-4 ${isPlayingWaitau ? "text-red-800" : "text-gray-600"}`} />
                    <span className="sr-only">Play Waitau pronunciation</span>
                  </Button>
                </div>
                <div className="text-lg">{wordOfTheDay.waitau.pronunciation}</div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">客家話</span>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => playAudio("hakka")}>
                    <Play className={`h-4 w-4 ${isPlayingHakka ? "text-red-800" : "text-gray-600"}`} />
                    <span className="sr-only">Play Hakka pronunciation</span>
                  </Button>
                </div>
                <div className="text-lg">{wordOfTheDay.hakka.pronunciation}</div>
              </div>
            </div>
          </div>
          <div>
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-gray-500">普通話</span>
                <div>{wordOfTheDay.mandarin}</div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">英文</span>
                <div>{wordOfTheDay.english}</div>
              </div>
              <div className="pt-2">
                <span className="text-sm font-medium text-gray-500">例句</span>
                <div className="mt-1 space-y-1">
                  <p className="text-gray-900">{wordOfTheDay.example.original}</p>
                  <p className="text-gray-600">{wordOfTheDay.example.translation}</p>
                  <p className="text-gray-600 italic">{wordOfTheDay.example.english}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
