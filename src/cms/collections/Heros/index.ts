import { CollectionConfig } from "payload";

export const HeroCollection: CollectionConfig = {
	slug: "hero",
	fields: [
		{
			name: "title",
			type: "text",
		},
		{
			name: "description",
			type: "text",
		},
		{
			name: "button",
			type: "group",
			fields: [
				{
					name: "text",
					type: "text",
				},
				{
					name: "link",
					type: "text",
				},
			],
		},
		{
			name: "image",
			type: "upload",
			relationTo: "media",
		},
		{
			name: "where",
			type: "select",
			options: [
				{ label: "Home", value: "home" },
				{ label: "Other", value: "other" },
			],
			unique: true,
		},
	],
};
