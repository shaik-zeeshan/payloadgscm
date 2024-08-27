import { CollectionConfig } from "payload";

export const SocailLinksCollection: CollectionConfig = {
	slug: "socal-links",
	fields: [
		{
			name: "platform",
			type: "select",
			defaultValue: "telephone",
			options: [
				{ label: "Twitter", value: "twitter" },
				{ label: "Facebook", value: "facebook" },
				{ label: "Instagram", value: "instagram" },
				{ label: "LinkedIn", value: "linkedin" },
				{ label: "Telephone", value: "telephone" },
				{ label: "Email", value: "email" },
				{ label: "Other", value: "other" },
			],
		},
		{
			name: "title",
			label: "Title",
			type: "text",
			required: true,
		},
		{
			name: "value",
			type: "text",
			required: true,
		},
	],
};
