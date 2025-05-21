"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause } from "lucide-react";

interface AudioPhrasesProps {
	language: string;
}

export default function AudioPhrases({ language }: AudioPhrasesProps) {
	const [playingPhrase, setPlayingPhrase] = useState<string | null>(null);

	// This would normally be fetched from Strapi, but we're inlining the content
	const phrasesData = {
		waitau: {
			introduction: "以下是一些圍頭話的常用語句，點擊播放按鈕可以聆聽發音。",
			categories: [
				{
					name: "問候語",
					phrases: [
						{
							phrase: "你好",
							pronunciation: "nei5 hou2",
							meaning: "你好",
							english: "Hello",
							audio: "/audio/sample.mp3",
						},
						{
							phrase: "早晨",
							pronunciation: "zou2 san4",
							meaning: "早上好",
							english: "Good morning",
							audio: "/audio/sample.mp3",
						},
						{
							phrase: "食咗飯未呀",
							pronunciation: "sik9 zo2 faan6 mei6 aa3",
							meaning: "吃過飯了嗎",
							english: "Have you eaten yet?",
							audio: "/audio/sample.mp3",
						},
						{
							phrase: "好耐冇見",
							pronunciation: "hou2 noi6 mou5 gin3",
							meaning: "好久不見",
							english: "Long time no see",
							audio: "/audio/sample.mp3",
						},
					],
				},
				{
					name: "日常對話",
					phrases: [
						{
							phrase: "你叫咩名呀",
							pronunciation: "nei5 giu3 me1 meng2 aa3",
							meaning: "你叫什麼名字",
							english: "What's your name?",
							audio: "/audio/sample.mp3",
						},
						{
							phrase: "你住喺邊度呀",
							pronunciation: "nei5 zyu6 hai2 bin1 dou6 aa3",
							meaning: "你住在哪裡",
							english: "Where do you live?",
							audio: "/audio/sample.mp3",
						},
						{
							phrase: "你做咩工作呀",
							pronunciation: "nei5 zou6 me1 gung1 zok3 aa3",
							meaning: "你做什麼工作",
							english: "What do you do for a living?",
							audio: "/audio/sample.mp3",
						},
						{
							phrase: "我唔明白",
							pronunciation: "ngo5 m4 ming4 baak6",
							meaning: "我不明白",
							english: "I don't understand",
							audio: "/audio/sample.mp3",
						},
					],
				},
				{
					name: "購物用語",
					phrases: [
						{
							phrase: "幾多錢呀",
							pronunciation: "gei2 do1 cin2 aa3",
							meaning: "多少錢",
							english: "How much is it?",
							audio: "/audio/sample.mp3",
						},
						{
							phrase: "貴咗啲",
							pronunciation: "gwai3 zo2 di1",
							meaning: "貴了點",
							english: "It's a bit expensive",
							audio: "/audio/sample.mp3",
						},
						{
							phrase: "平啲得唔得呀",
							pronunciation: "peng4 di1 dak1 m4 dak1 aa3",
							meaning: "便宜點可以嗎",
							english: "Can you make it cheaper?",
							audio: "/audio/sample.mp3",
						},
						{
							phrase: "我要呢個",
							pronunciation: "ngo5 jiu3 ni1 go3",
							meaning: "我要這個",
							english: "I want this one",
							audio: "/audio/sample.mp3",
						},
					],
				},
				{
					name: "農村生活",
					phrases: [
						{
							phrase: "今日天氣好好",
							pronunciation: "gam1 jat6 tin1 hei3 hou2 hou2",
							meaning: "今天天氣很好",
							english: "The weather is nice today",
							audio: "/audio/sample.mp3",
						},
						{
							phrase: "聽日會落雨",
							pronunciation: "ting1 jat6 wui6 lok9 jyu5",
							meaning: "明天會下雨",
							english: "It will rain tomorrow",
							audio: "/audio/sample.mp3",
						},
						{
							phrase: "禾苗生得好",
							pronunciation: "wo4 miu6 saang1 dak1 hou2",
							meaning: "稻苗長得好",
							english: "The rice seedlings are growing well",
							audio: "/audio/sample.mp3",
						},
						{
							phrase: "收成好好",
							pronunciation: "sau1 sing4 hou2 hou2",
							meaning: "收成很好",
							english: "The harvest is good",
							audio: "/audio/sample.mp3",
						},
					],
				},
			],
		},
	};

	const data = phrasesData[language as keyof typeof phrasesData] || phrasesData.waitau;

	// Simulate playing audio
	const playPhrase = (phrase: string) => {
		if (playingPhrase === phrase) {
			setPlayingPhrase(null);
		}
		else {
			setPlayingPhrase(phrase);
			setTimeout(() => setPlayingPhrase(null), 3000);
		}
	};

	return (
		<div>
			<div className="prose prose-red max-w-none mb-6">
				<p>{data.introduction}</p>
			</div>

			<div className="space-y-8">
				{data.categories.map((category, categoryIndex) => (
					<div key={categoryIndex}>
						<h3 className="text-xl font-serif font-bold text-gray-900 mb-4">{category.name}</h3>
						<div className="space-y-4">
							{category.phrases.map((phrase, phraseIndex) => (
								<Card key={phraseIndex}>
									<CardContent className="p-4">
										<div className="flex items-center justify-between">
											<div className="flex-1">
												<div className="flex items-center">
													<span className="text-lg font-medium text-gray-900">{phrase.phrase}</span>
													<Button
														variant="ghost"
														size="sm"
														className="h-8 w-8 p-0 ml-2"
														onClick={() => playPhrase(phrase.phrase)}>
														{playingPhrase === phrase.phrase
															? (
																<Pause className="h-4 w-4 text-red-800" />
															)
															: (
																<Play className="h-4 w-4 text-gray-600 hover:text-red-800" />
															)}
														<span className="sr-only">
															{playingPhrase === phrase.phrase ? "Pause" : "Play"} {phrase.phrase}
														</span>
													</Button>
												</div>
												<div className="text-gray-500 text-sm mt-1">[{phrase.pronunciation}]</div>
											</div>
											<div className="text-right">
												<div className="text-gray-700">{phrase.meaning}</div>
												<div className="text-gray-500 text-sm italic">{phrase.english}</div>
											</div>
										</div>
										{playingPhrase === phrase.phrase && (
											<div className="mt-3 bg-gray-50 p-2 rounded-md">
												<div className="h-2 bg-gray-200 rounded-full overflow-hidden">
													<div
														className="h-full bg-red-800 rounded-full"
														style={{
															width: "60%",
															transition: "width 3s linear",
														}}>
													</div>
												</div>
											</div>
										)}
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
