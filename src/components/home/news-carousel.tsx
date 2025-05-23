"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getStrapiMedia } from "@/lib/strapi";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { formatDate } from "@/lib/utils";

import type { EmblaCarouselType, EmblaEventType } from "embla-carousel";
import type { Data } from "@strapi/strapi";

const TWEEN_FACTOR_BASE = 0.1;

export default function NewsCarousel({ articles }: { articles: Data.ContentType<"api::article.article">[] }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const totalSlides = articles.length;

	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ stopOnInteraction: true })]);

	// Slightly shrink the slides as they are on either side of the view
	const tweenFactor = useRef(0);
	const tweenNodes = useRef<HTMLElement[]>([]);

	const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
		tweenNodes.current = emblaApi.slideNodes().map(slideNode => slideNode.firstElementChild as HTMLElement);
	}, []);

	const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
		tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
	}, []);

	const tweenScale = useCallback((emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
		const engine = emblaApi.internalEngine();
		const scrollProgress = emblaApi.scrollProgress();
		const slidesInView = emblaApi.slidesInView();
		const isScrollEvent = eventName === "scroll";

		emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
			let diffToTarget = scrollSnap - scrollProgress;
			const slidesInSnap = engine.slideRegistry[snapIndex]!;

			for (const slideIndex of slidesInSnap) {
				if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

				if (engine.options.loop) {
					engine.slideLooper.loopPoints.forEach(loopItem => {
						const target = loopItem.target();

						if (slideIndex === loopItem.index && target !== 0) {
							const sign = Math.sign(target);

							if (sign === -1) {
								diffToTarget = scrollSnap - (1 + scrollProgress);
							}
							if (sign === 1) {
								diffToTarget = scrollSnap + (1 - scrollProgress);
							}
						}
					});
				}

				const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
				const scale = Math.min(Math.max(tweenValue, 0), 1);
				const tweenNode = tweenNodes.current[slideIndex]!;
				tweenNode.style.transform = `scale(${scale})`;
			}
		});
	}, []);

	useEffect(() => {
		if (!emblaApi) return;

		setTweenNodes(emblaApi);
		setTweenFactor(emblaApi);
		tweenScale(emblaApi);

		emblaApi
			.on("reInit", setTweenNodes)
			.on("reInit", setTweenFactor)
			.on("reInit", tweenScale)
			.on("scroll", tweenScale)
			.on("slideFocus", tweenScale);
	}, [emblaApi, tweenScale]);

	// Handle scroll events to update current index
	const onScroll = useCallback(() => {
		if (!emblaApi) return;
		setCurrentIndex(emblaApi.selectedScrollSnap());
	}, [emblaApi]);

	// Register scroll event handler
	useEffect(() => {
		if (!emblaApi) return;
		emblaApi.on("select", onScroll);
		onScroll();
		return () => {
			emblaApi.off("select", onScroll);
		};
	}, [emblaApi, onScroll]);

	// Scroll to previous slide
	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	// Scroll to next slide
	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	// Scroll to specific slide
	const scrollTo = useCallback((index: number) => {
		if (emblaApi) emblaApi.scrollTo(index);
	}, [emblaApi]);

	// If no articles, show placeholder
	if (totalSlides === 0) {
		return (
			<div className="text-center py-12">
				<p className="text-gray-500">暫無焦點新聞</p>
			</div>
		);
	}

	return (
		<div className="relative py-8">
			{/* Carousel */}
			<div className="mx-auto overflow-hidden" ref={emblaRef}>
				<div className="flex touch-pan-y">
					{articles.map(article => {
						const imageUrl = getStrapiMedia(article.heading?.coverImage?.data?.url);
						return (
							<div key={article.id} className="flex-shrink-0 basis-[75%] min-w-0">
								<div>
									<Link href={`/news/${article.slug}`}>
										<Card className="h-full overflow-hidden hover:shadow-md transition-shadow relative">
											<div className="aspect-w-16 aspect-h-9 relative">
												<Image
													src={imageUrl || "/placeholder.svg"}
													alt={article.heading.title}
													width={0}
													height={0}
													className="w-full h-full max-h-[75vh] object-cover" />
												<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex flex-col justify-end p-6">
													<div className="text-sm lg:text-base xl:text-lg text-white/80 mb-2">{formatDate(article.publishDate)}</div>
													<h3 className="text-xl lg:text-2xl xl:text-3xl font-medium text-white mb-2">{article.heading.title}</h3>
													<p className="text-white/80 text-sm lg:text-base xl:text-lg line-clamp-2">{article.heading.summary || "香港本土語言保育協會"}</p>
												</div>
											</div>
										</Card>
									</Link>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* Navigation Buttons */}
			{totalSlides > 1 && (
				<>
					<Button
						variant="outline"
						size="icon"
						className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 shadow-md"
						onClick={scrollPrev}>
						<ChevronLeft className="!h-6 !w-6" />
						<span className="sr-only">上一頁</span>
					</Button>

					<Button
						variant="outline"
						size="icon"
						className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/80 shadow-md"
						onClick={scrollNext}>
						<ChevronRight className="!h-6 !w-6" />
						<span className="sr-only">下一頁</span>
					</Button>
				</>
			)}

			{/* Pagination indicators */}
			{totalSlides > 1 && (
				<div className="flex justify-center mt-4 gap-2">
					{Array.from({ length: totalSlides }).map((_, idx) => (
						<button
							key={idx}
							className={`h-2 rounded-full transition-all ${idx === currentIndex ? "w-6 bg-red-800" : "w-2 bg-gray-300"}`}
							onClick={() => scrollTo(idx)}
							aria-label={`前往第${idx + 1}頁`} />
					))}
				</div>
			)}
		</div>
	);
}
