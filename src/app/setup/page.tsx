"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AddEnvironmentVariables from "@/components/add-environment-variables";

export default function SetupPage() {
	const router = useRouter();
	const [isComplete, setIsComplete] = useState(false);

	const handleSubmit = (variables: Record<string, string>) => {
		// In a real application, this would store the variables securely
		// For now, we'll just simulate success
		console.log("Environment variables set:", Object.keys(variables));
		setIsComplete(true);

		// Redirect after a short delay
		setTimeout(() => {
			router.push("/");
		}, 2000);
	};

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
				<div className="mx-auto max-w-2xl text-center mb-12">
					<h1 className="text-4xl font-serif font-bold tracking-tight text-gray-900 sm:text-5xl">
						{isComplete ? "Setup Complete" : "Setup Your Application"}
					</h1>
					<p className="mt-4 text-lg text-gray-600">
						{isComplete
							? "Your environment variables have been set. Redirecting to homepage..."
							: "Add the required environment variables to connect to Strapi CMS."}
					</p>
				</div>

				{!isComplete && (
					<AddEnvironmentVariables
						onSubmit={handleSubmit}
						requiredVariables={["NEXT_PUBLIC_STRAPI_URL", "STRAPI_API_TOKEN"]} />
				)}
			</div>
		</div>
	);
}
