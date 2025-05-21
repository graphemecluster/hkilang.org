"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Search } from "lucide-react"

interface VocabularyListProps {
  language: string
}

export default function VocabularyList({ language }: VocabularyListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [playingWord, setPlayingWord] = useState<string | null>(null)

  // This would normally be fetched from Strapi, but we're inlining the content
  const vocabularyData = {
    waitau: {
      categories: [
        {
          name: "日常用語",
          words: [
            {
              word: "食飯",
              pronunciation: "sik9 faan6",
              meaning: "吃飯",
              english: "to eat",
              audio: "/audio/sample.mp3",
            },
            {
              word: "飲水",
              pronunciation: "jam2 seoi2",
              meaning: "喝水",
              english: "to drink water",
              audio: "/audio/sample.mp3",
            },
            {
              word: "瞓覺",
              pronunciation: "fan3 gaau3",
              meaning: "睡覺",
              english: "to sleep",
              audio: "/audio/sample.mp3",
            },
            {
              word: "行路",
              pronunciation: "haang4 lou6",
              meaning: "走路",
              english: "to walk",
              audio: "/audio/sample.mp3",
            },
            {
              word: "講嘢",
              pronunciation: "gong2 je5",
              meaning: "說話",
              english: "to speak",
              audio: "/audio/sample.mp3",
            },
            {
              word: "聽日",
              pronunciation: "ting1 jat6",
              meaning: "明天",
              english: "tomorrow",
              audio: "/audio/sample.mp3",
            },
            {
              word: "琴日",
              pronunciation: "kam4 jat6",
              meaning: "昨天",
              english: "yesterday",
              audio: "/audio/sample.mp3",
            },
            { word: "今日", pronunciation: "gam1 jat6", meaning: "今天", english: "today", audio: "/audio/sample.mp3" },
          ],
        },
        {
          name: "家庭稱謂",
          words: [
            { word: "阿爸", pronunciation: "aa3 baa1", meaning: "爸爸", english: "father", audio: "/audio/sample.mp3" },
            { word: "阿媽", pronunciation: "aa3 maa1", meaning: "媽媽", english: "mother", audio: "/audio/sample.mp3" },
            {
              word: "阿公",
              pronunciation: "aa3 gung1",
              meaning: "祖父",
              english: "grandfather",
              audio: "/audio/sample.mp3",
            },
            {
              word: "阿婆",
              pronunciation: "aa3 po4",
              meaning: "祖母",
              english: "grandmother",
              audio: "/audio/sample.mp3",
            },
            {
              word: "阿哥",
              pronunciation: "aa3 go1",
              meaning: "哥哥",
              english: "elder brother",
              audio: "/audio/sample.mp3",
            },
            {
              word: "阿姐",
              pronunciation: "aa3 ze2",
              meaning: "姐姐",
              english: "elder sister",
              audio: "/audio/sample.mp3",
            },
            {
              word: "細佬",
              pronunciation: "sai3 lou2",
              meaning: "弟弟",
              english: "younger brother",
              audio: "/audio/sample.mp3",
            },
            {
              word: "細妹",
              pronunciation: "sai3 mui6",
              meaning: "妹妹",
              english: "younger sister",
              audio: "/audio/sample.mp3",
            },
          ],
        },
        {
          name: "數字",
          words: [
            { word: "一", pronunciation: "jat1", meaning: "一", english: "one", audio: "/audio/sample.mp3" },
            { word: "兩", pronunciation: "loeng5", meaning: "二", english: "two", audio: "/audio/sample.mp3" },
            { word: "三", pronunciation: "saam1", meaning: "三", english: "three", audio: "/audio/sample.mp3" },
            { word: "四", pronunciation: "sei3", meaning: "四", english: "four", audio: "/audio/sample.mp3" },
            { word: "五", pronunciation: "ng5", meaning: "五", english: "five", audio: "/audio/sample.mp3" },
            { word: "六", pronunciation: "luk9", meaning: "六", english: "six", audio: "/audio/sample.mp3" },
            { word: "七", pronunciation: "cat1", meaning: "七", english: "seven", audio: "/audio/sample.mp3" },
            { word: "八", pronunciation: "baat3", meaning: "八", english: "eight", audio: "/audio/sample.mp3" },
            { word: "九", pronunciation: "gau2", meaning: "九", english: "nine", audio: "/audio/sample.mp3" },
            { word: "十", pronunciation: "sap9", meaning: "十", english: "ten", audio: "/audio/sample.mp3" },
          ],
        },
        {
          name: "農業詞彙",
          words: [
            {
              word: "耕田",
              pronunciation: "gaang1 tin4",
              meaning: "耕田",
              english: "to farm",
              audio: "/audio/sample.mp3",
            },
            {
              word: "禾苗",
              pronunciation: "wo4 miu6",
              meaning: "稻苗",
              english: "rice seedling",
              audio: "/audio/sample.mp3",
            },
            {
              word: "收成",
              pronunciation: "sau1 sing4",
              meaning: "收穫",
              english: "harvest",
              audio: "/audio/sample.mp3",
            },
            { word: "犁頭", pronunciation: "lai4 tau4", meaning: "犁", english: "plow", audio: "/audio/sample.mp3" },
            { word: "鋤頭", pronunciation: "co4 tau4", meaning: "鋤頭", english: "hoe", audio: "/audio/sample.mp3" },
            {
              word: "水牛",
              pronunciation: "seoi2 ngau4",
              meaning: "水牛",
              english: "water buffalo",
              audio: "/audio/sample.mp3",
            },
            {
              word: "禾埕",
              pronunciation: "wo4 cing4",
              meaning: "曬穀場",
              english: "threshing floor",
              audio: "/audio/sample.mp3",
            },
            {
              word: "穀倉",
              pronunciation: "guk1 cong1",
              meaning: "糧倉",
              english: "granary",
              audio: "/audio/sample.mp3",
            },
          ],
        },
        {
          name: "特色詞彙",
          words: [
            { word: "冇", pronunciation: "mou5", meaning: "沒有", english: "don't have", audio: "/audio/sample.mp3" },
            {
              word: "唔使",
              pronunciation: "m4 sai2",
              meaning: "不用",
              english: "don't need to",
              audio: "/audio/sample.mp3",
            },
            {
              word: "好靚",
              pronunciation: "hou2 leng3",
              meaning: "很漂亮",
              english: "very beautiful",
              audio: "/audio/sample.mp3",
            },
            {
              word: "好味",
              pronunciation: "hou2 mei6",
              meaning: "好吃",
              english: "delicious",
              audio: "/audio/sample.mp3",
            },
            {
              word: "行街",
              pronunciation: "haang4 gaai1",
              meaning: "逛街",
              english: "go shopping",
              audio: "/audio/sample.mp3",
            },
            {
              word: "擠擁",
              pronunciation: "zai1 jung2",
              meaning: "擁擠",
              english: "crowded",
              audio: "/audio/sample.mp3",
            },
            {
              word: "大把",
              pronunciation: "daai6 baa2",
              meaning: "很多",
              english: "plenty",
              audio: "/audio/sample.mp3",
            },
            {
              word: "頂硬上",
              pronunciation: "ding2 ngaang6 soeng5",
              meaning: "硬著頭皮",
              english: "to force oneself",
              audio: "/audio/sample.mp3",
            },
          ],
        },
      ],
    },
  }

  const data = vocabularyData[language as keyof typeof vocabularyData]

  // Simulate playing audio
  const playWord = (word: string) => {
    setPlayingWord(word)
    setTimeout(() => setPlayingWord(null), 2000)
  }

  // Filter words based on search term
  const filterWords = (words: any[]) => {
    if (!searchTerm) return words
    return words.filter(
      (word) =>
        word.word.includes(searchTerm) ||
        word.pronunciation.includes(searchTerm) ||
        word.meaning.includes(searchTerm) ||
        word.english.includes(searchTerm),
    )
  }

  return (
    <div>
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="search"
            placeholder="搜尋詞彙..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {searchTerm ? (
        <div>
          <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">搜尋結果</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.categories.flatMap((category) =>
              filterWords(category.words).map((word, index) => (
                <Card key={`search-${index}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-medium text-gray-900">{word.word}</span>
                        <span className="ml-2 text-gray-500">[{word.pronunciation}]</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => playWord(word.word)}>
                        <Play className={`h-4 w-4 ${playingWord === word.word ? "text-red-800" : "text-gray-600"}`} />
                        <span className="sr-only">Play {word.word}</span>
                      </Button>
                    </div>
                    <div className="mt-2">
                      <p className="text-gray-600">
                        {word.meaning} / {word.english}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )),
            )}
          </div>
        </div>
      ) : (
        <Tabs defaultValue={data.categories[0].name} className="w-full">
          <TabsList className="flex flex-wrap">
            {data.categories.map((category, index) => (
              <TabsTrigger key={index} value={category.name} className="mb-2">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {data.categories.map((category, categoryIndex) => (
            <TabsContent key={categoryIndex} value={category.name} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.words.map((word, wordIndex) => (
                  <Card key={wordIndex}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-medium text-gray-900">{word.word}</span>
                          <span className="ml-2 text-gray-500">[{word.pronunciation}]</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => playWord(word.word)}>
                          <Play className={`h-4 w-4 ${playingWord === word.word ? "text-red-800" : "text-gray-600"}`} />
                          <span className="sr-only">Play {word.word}</span>
                        </Button>
                      </div>
                      <div className="mt-2">
                        <p className="text-gray-600">
                          {word.meaning} / {word.english}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  )
}
