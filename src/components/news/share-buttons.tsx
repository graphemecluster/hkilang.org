"use client";

import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Link } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
	title: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
	const [copied, setCopied] = useState(false);

	const handleCopyLink = () => {
		navigator.clipboard.writeText(window.location.href);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const shareOnFacebook = () => {
		window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, "_blank");
	};

	const shareOnTwitter = () => {
		window.open(
			`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`,
			"_blank",
		);
	};

	const shareOnLinkedIn = () => {
		window.open(
			`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
			"_blank",
		);
	};

	return (
		<div className="flex items-center space-x-2">
			<span className="text-sm text-gray-500 mr-1">分享：</span>
			<Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={shareOnFacebook}>
				<Facebook className="h-4 w-4" />
				<span className="sr-only">分享到 Facebook</span>
			</Button>
			<Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={shareOnTwitter}>
				<Twitter className="h-4 w-4" />
				<span className="sr-only">分享到 Twitter</span>
			</Button>
			<Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={shareOnLinkedIn}>
				<Linkedin className="h-4 w-4" />
				<span className="sr-only">分享到 LinkedIn</span>
			</Button>
			<Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={handleCopyLink}>
				<Link className="h-4 w-4" />
				<span className="sr-only">複製連結</span>
			</Button>
			{copied && <span className="text-xs text-green-600">已複製連結</span>}
		</div>
	);
}
