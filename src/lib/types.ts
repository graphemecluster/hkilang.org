export type PageProps<T extends string = never> = {
	params: Promise<Record<T, string>>;
	searchParams: Promise<Record<string, string | string[] | undefined>>;
};
