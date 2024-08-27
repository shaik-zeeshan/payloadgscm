import { Block } from "payload";
import { Media } from "payload-types";

export const Service: Block = {
	slug: "service",
	fields: [
		{
			name: "title",
			label: "Title",
			type: "text",
			required: true,
		},
		{
			name: "description",
			label: "Description",
			type: "textarea",
			required: true,
		},
		{
			name: "services",
			label: "Services",
			type: "array",
			fields: [
				{
					name: "service",
					label: "Service",
					type: "text",
					required: true,
				},
				{
					name: "description",
					label: "Description",
					type: "textarea",
					required: true,
				},
				{
					name: "image",
					label: "Image",
					type: "upload",
					relationTo: "media",
				},
			],
		},
	],
};

export interface ServiceType {
	title: string;
	description: string;
	services?: {
		service: string | null;
		description: string | null;
		image: Media | null;
	}[];
}
