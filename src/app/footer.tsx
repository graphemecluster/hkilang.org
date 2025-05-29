import Link from "next/link";
import { Facebook, Youtube, Mail, MapPin, Phone } from "lucide-react";
import { getContactData } from "@/lib/strapi";
import Logo from "@/components/logo";
import { navigationItems } from "@/lib/consts";

export default async function Footer() {
	const contactData = await getContactData();
	const contactInfo = contactData?.data;

	return (
		<footer className="bg-gray-50 border-t border-gray-200" id="contact">
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="flex flex-col md:flex-row items-start justify-between gap-8">
					<div className="md:flex-grow md:basis-1/3">
						<Logo />
						<p className="mt-4 text-sm text-gray-600">
							{contactInfo.summary}
						</p>
						<div className="mt-6 flex space-x-4">
							<Link href={contactInfo.facebookLink} className="text-gray-500 hover:text-red-800">
								<span className="sr-only">Facebook</span>
								<Facebook className="h-6 w-6" />
							</Link>
							<Link href={contactInfo.youtubeLink} className="text-gray-500 hover:text-red-800">
								<span className="sr-only">YouTube</span>
								<Youtube className="h-6 w-6" />
							</Link>
							<Link
								href={`mailto:${contactInfo.email || "info@hkilang.org"}`}
								className="text-gray-500 hover:text-red-800">
								<span className="sr-only">Email</span>
								<Mail className="h-6 w-6" />
							</Link>
						</div>
					</div>
					<div className="md:flex-grow md:basis-[calc(65%-28rem)]">
						<h3 className="text-base font-medium text-gray-900">網站連結</h3>
						<ul className="mt-4 space-y-2">
							{navigationItems.map(item => (
								<li key={item.name}>
									<Link href={item.href} className="text-sm text-gray-600 hover:text-red-800">
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div className="md:flex-grow md:basis-[30%]">
						<h3 className="text-base font-medium text-gray-900">聯絡資訊</h3>
						<ul className="mt-4 space-y-2">
							<li className="flex items-start">
								<MapPin className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
								<span className="ml-2 text-sm text-gray-600">{contactInfo.address}</span>
							</li>
							<li className="flex items-start">
								<Mail className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
								<span className="ml-2 text-sm text-gray-600">{contactInfo.email || "info@hkilang.org"}</span>
							</li>
							<li className="flex items-start">
								<Phone className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
								<span className="ml-2 text-sm text-gray-600">{contactInfo.phone}</span>
							</li>
						</ul>
					</div>
				</div>
				<div className="mt-12 border-t border-gray-200 pt-8">
					<p className="text-sm text-gray-500 text-center">
						&copy; {new Date().getFullYear()} 香港本土語言保育協會. 版權所有.
					</p>
				</div>
			</div>
		</footer>
	);
}
