import Image from "next/image";
import { getStrapiMedia } from "@/lib/strapi";

import type { Data } from "@strapi/strapi";

export default function AboutMembers({ members }: { members: Data.Component<"about-page.member">[] }) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
			{members.map((member, index) => {
				const imageUrl = member.image?.url ? getStrapiMedia(member.image.url) : null;

				return (
					<div key={index} className="flex flex-col items-center text-center">
						<div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-100">
							{imageUrl
								? <Image src={imageUrl || "/placeholder.svg"} alt={member.name} width={0} height={0} className="w-full h-full object-cover" />
								: <div className="w-full h-full flex items-center justify-center bg-red-50 text-red-800 text-2xl font-bold">
									{member.name.charAt(0)}
								</div>}
						</div>
						<h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
						<p className="text-gray-500">{member.position}</p>
					</div>
				);
			})}
		</div>
	);
}
