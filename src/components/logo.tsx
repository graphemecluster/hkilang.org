import Image from "next/image";

export default function Logo() {
	return <div className="flex items-center gap-3">
		<Image
			src="/logo.svg?height=40&width=40"
			alt="香港本土語言保育協會標誌"
			width={40}
			height={40}
			className="h-10 w-auto" />
		<span className="space-y-1 text-xl/none font-serif font-bold text-gray-900 whitespace-nowrap">
			<div>
				香港<span className="text-[#e40000]">本土語言</span>保育協會
			</div>
			<div className="text-[0.5rem] font-sans">
				Association for Conservation of Hong Kong <span className="text-[#e40000]">Indigenous Languages</span>
			</div>
		</span>
	</div>;
}
