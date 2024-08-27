import { Block } from "payload";
import { Media } from "payload-types";

const Header: Block = {
	slug: "header",
	fields: [
		{
			name: "logo",
			label: "Logo",
			type: "text",
		},
		{
			name: "sections",
			label: "Sections",
			type: "array",
			fields: [
				{
					name: "title",
					label: "Title",
					type: "text",
				},
				{
					name: "href",
					label: "Href",
					type: "text",
				},
			],
		},
		{
			name: "cta",
			label: "Call to Action",
			type: "group",
			fields: [
				{
					name: "text",
					label: "Text",
					type: "text",
				},
				{
					name: "href",
					label: "Href",
					type: "text",
				},
			],
		},
	],
};

export interface HeaderType {
	logo?: string | null;
	sections?: {
		title?: string | null;
		href?: string | null;
	}[];
	cta?: {
		text?: string | null;
		href?: string | null;
	};
}

export default Header;
