import { Block } from "payload";
import { Media } from "payload-types";
import { lexicalHTML } from "@payloadcms/richtext-lexical";

const About: Block = {
	slug: "about",
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
			name: "content",
			label: "Content",
			type: "richText",
		},
		{
			name: "image",
			label: "Image",
			type: "upload",
			relationTo: "media",
		},
		{
			name: "aboutMeContent",
			label: "About Me Content",
			type: "textarea",
		},
		lexicalHTML("content", { name: "contentHTML" }),
		{
			name: "employee",
			label: "Employee",
			type: "array",
			fields: [
				{
					name: "name",
					label: "Name",
					type: "text",
					required: true,
				},
				{
					name: "position",
					label: "Position",
					type: "text",
					required: true,
				},
				{
					name: "image",
					label: "Image",
					type: "upload",
					relationTo: "media",
					required: true,
				},
			],
		},
	],
};

export interface About {
	title: string;
	description: string;
	content?: {
		root: {
			type: string;
			children: {
				type: string;
				version: number;
				[k: string]: unknown;
			}[];
			direction: ("ltr" | "rtl") | null;
			format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
			indent: number;
			version: number;
		};
		[k: string]: unknown;
	} | null;
	image?: Media | null;
	contentHTML?: string | null;
	aboutMeContent?: string | null;
	employee?: {
		name: string;
		position: string;
		image?: Media | null;
	}[];
}

export default About;
