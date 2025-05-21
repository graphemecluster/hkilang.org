"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause } from "lucide-react"

interface DictionaryAudioPlayerProps {
  src: string
  language: string
  small?: boolean
}

export default function DictionaryAudioPlayer({ src, language, small = false }: DictionaryAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(src)
    audioRef.current = audio

    // Set up event listeners
    audio.addEventListener("ended", () => {
      setIsPlaying(false)
    })

    // Clean up event listeners
    return () => {
      audio.pause()
      audio.removeEventListener("ended", () => {})
    }
  }, [src])

  // Handle play/pause
  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <Button
      variant="ghost"
      size={small ? "sm" : "default"}
      className={`${small ? "h-6 w-6 p-0" : "h-8 w-8 p-0"} rounded-full`}
      onClick={togglePlay}
      aria-label={isPlaying ? `Pause ${language} audio` : `Play ${language} audio`}
    >
      {isPlaying ? (
        <Pause className={`${small ? "h-3 w-3" : "h-4 w-4"} text-red-800`} />
      ) : (
        <Play className={`${small ? "h-3 w-3" : "h-4 w-4"} text-gray-600 hover:text-red-800`} />
      )}
    </Button>
  )
}
