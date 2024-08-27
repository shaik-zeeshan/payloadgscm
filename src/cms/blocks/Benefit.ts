import { Block } from "payload";

const Benefit: Block = {
	slug: "benefit",
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
			name: "benefits",
			label: "Benefits",
			type: "array",
			minRows: 1,
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
			],
		},
	],
};

export interface BenefitsType {
	title: string | null;
	description: string | null;
	benefits:
		| {
				title?: string | null;
				description?: string | null;
		  }[]
		| null;
}

export default Benefit;
