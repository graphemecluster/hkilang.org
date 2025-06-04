import type { Data } from "@strapi/strapi";

export default function Heading({ children }: { children: Data.Component<"shared.heading"> | Data.ContentType<"api::category.category"> }) {
	return <div className="mx-auto max-w-2xl text-center">
		<h1 className="text-4xl font-serif font-bold text-gray-900 sm:text-5xl">{"title" in children ? children.title : "name" in children ? children.name : ""}</h1>
		<p className="mt-4 text-lg text-gray-600">{"summary" in children ? children.summary : "description" in children ? children.description : ""}</p>
	</div>;
}
