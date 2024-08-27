import { Block } from "payload";
import { Media } from "payload-types";

const Hero: Block = {
	slug: "hero",
	fields: [
		{
			type: "row",
			fields: [
				{
					name: "textAlignment",
					type: "select",
					options: [
						{ label: "Left", value: "left" },
						{ label: "Center", value: "center" },
						{ label: "Right", value: "right" },
					],
					admin: {
						width: "50%",
					},
				},
				{
					name: "verticalAlignment",
					type: "select",
					options: [
						{ label: "Top", value: "top" },
						{ label: "Center", value: "center" },
						{ label: "Bottom", value: "bottom" },
					],
				},
			],
		},
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
					type: "row",
					fields: [
						{
							name: "text",
							type: "text",
							admin: {
								width: "50%",
							},
						},
						{
							name: "link",
							type: "text",
							admin: {
								width: "50%",
							},
						},
					],
				},
			],
		},
		{
			name: "image",
			type: "upload",
			relationTo: "media",
		},
	],
};

export interface Hero {
	textAlignment?: "left" | "center" | "right" | null;
	verticalAlignment?: "top" | "center" | "bottom" | null;
	title?: string | null;
	description?: string | null;
	button?: {
		text?: string | null;
		link?: string | null;
	};
	image?: Media | null;
}

export default Hero;
