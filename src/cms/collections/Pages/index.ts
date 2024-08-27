import About from "@/cms/blocks/About";
import Benefit from "@/cms/blocks/Benefit";
import Header from "@/cms/blocks/Header";
import Hero from "@/cms/blocks/Hero";
import { Service } from "@/cms/blocks/Service";
import { formatSlug } from "@/lib/utils";
import { CollectionConfig } from "payload";

export const PagesCollection: CollectionConfig = {
	slug: "pages",
	fields: [
		{
			name: "title",
			label: "Title",
			type: "text",
			required: true,
		},
		{
			name: "viewCount",
			label: "View Count",
			type: "number",
			defaultValue: 0,
			admin: {
				position: "sidebar",
				readOnly: true,
			},
		},
		{
			name: "blocks",
			label: "Blocks",
			type: "blocks",
			blocks: [Hero, About, Service, Header, Benefit],
		},
		{
			name: "slug",
			label: "Slug",
			type: "text",
			admin: {
				position: "sidebar",
			},
			hooks: {
				beforeValidate: [formatSlug("title")],
			},
		},
	],
};
