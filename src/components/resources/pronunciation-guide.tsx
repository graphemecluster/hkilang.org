"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play } from "lucide-react";

interface PronunciationGuideProps {
	language: string;
}

export default function PronunciationGuide({ language }: PronunciationGuideProps) {
	const [playingSound, setPlayingSound] = useState<string | null>(null);

	// This would normally be fetched from Strapi, but we're inlining the content
	const pronunciationData = {
		waitau: {
			introduction: "圍頭話的發音系統保留了許多古粵語的特點，與現代標準粵語有明顯差異。以下是圍頭話的基本發音指南。",
			consonants: [
				{ symbol: "b", example: "巴 (baa1)", description: "如英文的 'b'，但不送氣" },
				{ symbol: "p", example: "怕 (paa3)", description: "如英文的 'p'，送氣" },
				{ symbol: "m", example: "媽 (maa1)", description: "如英文的 'm'" },
				{ symbol: "f", example: "花 (faa1)", description: "如英文的 'f'" },
				{ symbol: "d", example: "打 (daa2)", description: "如英文的 'd'，但不送氣" },
				{ symbol: "t", example: "他 (taa1)", description: "如英文的 't'，送氣" },
				{ symbol: "n", example: "拿 (naa4)", description: "如英文的 'n'" },
				{ symbol: "l", example: "啦 (laa1)", description: "如英文的 'l'" },
				{ symbol: "g", example: "家 (gaa1)", description: "如英文的 'g'，但不送氣" },
				{ symbol: "k", example: "卡 (kaa1)", description: "如英文的 'k'，送氣" },
				{ symbol: "ng", example: "牙 (ngaa4)", description: "如英文 'sing' 中的 'ng'" },
				{ symbol: "h", example: "哈 (haa1)", description: "如英文的 'h'" },
				{ symbol: "z", example: "渣 (zaa1)", description: "如英文的 'j'" },
				{ symbol: "c", example: "叉 (caa1)", description: "如英文的 'ch'，送氣" },
				{ symbol: "s", example: "沙 (saa1)", description: "如英文的 's'" },
				{ symbol: "j", example: "也 (jaa5)", description: "如英文的 'y'" },
				{ symbol: "w", example: "華 (waa4)", description: "如英文的 'w'" },
			],
			vowels: [
				{ symbol: "aa", example: "爸 (baa1)", description: "長元音，如英文 'father' 中的 'a'" },
				{ symbol: "a", example: "不 (bat1)", description: "短元音，如英文 'but' 中的 'u'" },
				{ symbol: "e", example: "爹 (de1)", description: "如英文 'get' 中的 'e'" },
				{ symbol: "i", example: "衣 (ji1)", description: "如英文 'see' 中的 'ee'" },
				{ symbol: "o", example: "波 (bo1)", description: "如英文 'law' 中的 'aw'" },
				{ symbol: "u", example: "夫 (fu1)", description: "如英文 'too' 中的 'oo'" },
				{ symbol: "oe", example: "靴 (hoe1)", description: "圓唇前中低元音，無英文對應" },
				{ symbol: "yu", example: "豬 (zyu1)", description: "圓唇前高元音，無英文對應" },
			],
			tones: [
				{ number: "1", description: "陰平", example: "詩 (si1)", audio: "/audio/sample.mp3" },
				{ number: "2", description: "陰上", example: "史 (si2)", audio: "/audio/sample.mp3" },
				{ number: "3", description: "陰去", example: "試 (si3)", audio: "/audio/sample.mp3" },
				{ number: "4", description: "陽平", example: "時 (si4)", audio: "/audio/sample.mp3" },
				{ number: "5", description: "陽上", example: "市 (si5)", audio: "/audio/sample.mp3" },
				{ number: "6", description: "陽去", example: "事 (si6)", audio: "/audio/sample.mp3" },
				{ number: "7", description: "上陰入", example: "識 (sik7)", audio: "/audio/sample.mp3" },
				{ number: "8", description: "下陰入", example: "錫 (sik8)", audio: "/audio/sample.mp3" },
				{ number: "9", description: "陽入", example: "食 (sik9)", audio: "/audio/sample.mp3" },
			],
			specialFeatures: [
				"圍頭話保留了完整的入聲韻尾 -p、-t、-k，發音清晰",
				"圍頭話有九個聲調，比標準粵語的六個聲調多",
				"圍頭話的陽上聲（第五聲）在標準粵語中已基本消失",
				"圍頭話的某些聲母組合（如 kw-、gw-）在特定環境下有特殊變化",
				"圍頭話保留了一些古老的韻母，如 -eu、-em、-ep 等",
			],
		},
	};

	const data = pronunciationData[language as keyof typeof pronunciationData];

	// Simulate playing audio
	const playSound = (id: string) => {
		setPlayingSound(id);
		setTimeout(() => setPlayingSound(null), 2000);
	};

	return (
		<div>
			<div className="prose prose-red max-w-none mb-6">
				<p>{data.introduction}</p>
			</div>

			<Tabs defaultValue="consonants" className="w-full">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="consonants">聲母 (Consonants)</TabsTrigger>
					<TabsTrigger value="vowels">韻母 (Vowels)</TabsTrigger>
					<TabsTrigger value="tones">聲調 (Tones)</TabsTrigger>
				</TabsList>

				<TabsContent value="consonants" className="mt-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{data.consonants.map((consonant, index) => (
							<Card key={index}>
								<CardContent className="p-4">
									<div className="flex items-center gap-2">
										<span className="text-2xl font-bold text-red-800">{consonant.symbol}</span>
										<span className="text-gray-600">- {consonant.example}</span>
									</div>
									<p className="mt-2 text-gray-600">{consonant.description}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>

				<TabsContent value="vowels" className="mt-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{data.vowels.map((vowel, index) => (
							<Card key={index}>
								<CardContent className="p-4">
									<div className="flex items-center gap-2">
										<span className="text-2xl font-bold text-red-800">{vowel.symbol}</span>
										<span className="text-gray-600">- {vowel.example}</span>
									</div>
									<p className="mt-2 text-gray-600">{vowel.description}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>

				<TabsContent value="tones" className="mt-6">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{data.tones.map((tone, index) => (
							<Card key={index}>
								<CardContent className="p-4">
									<div className="flex items-center justify-between">
										<div>
											<span className="text-2xl font-bold text-red-800">{tone.number}</span>
											<span className="ml-2 text-gray-600">{tone.description}</span>
										</div>
										<Button
											variant="ghost"
											size="sm"
											className="h-8 w-8 p-0"
											onClick={() => playSound(`tone-${tone.number}`)}>
											<Play
												className={`h-4 w-4 ${playingSound === `tone-${tone.number}` ? "text-red-800" : "text-gray-600"}`} />
											<span className="sr-only">Play tone {tone.number}</span>
										</Button>
									</div>
									<p className="mt-2 text-gray-600">例字: {tone.example}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</TabsContent>
			</Tabs>

			<div className="mt-8">
				<h3 className="text-xl font-serif font-bold text-gray-900 mb-4">圍頭話發音特點</h3>
				<ul className="space-y-2">
					{data.specialFeatures.map((feature, index) => (
						<li key={index} className="flex items-start">
							<span className="text-red-800 mr-2">•</span>
							<span>{feature}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
