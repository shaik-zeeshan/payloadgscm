import { type ClassValue, clsx } from "clsx";
import { FieldHook } from "payload";
import { twMerge } from "tailwind-merge";

const format = (val: string): string =>
	val
		.replace(/ /g, "-")
		.replace(/[^\w-]+/g, "")
		.toLowerCase();

export const formatSlug =
	(fallback: string): FieldHook =>
	({ value, originalDoc, data }) => {
		if (typeof value === "string") {
			return format(value);
		}
		const fallbackData =
			(data && data[fallback]) || (originalDoc && originalDoc[fallback]);

		if (fallbackData && typeof fallbackData === "string") {
			return format(fallbackData);
		}

		return value;
	};
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
