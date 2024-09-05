import { Block } from "payload";

const Benefit: Block = {
    slug: "benefit",
    fields: [
        {
            name: "section_id",
            label: "Section ID",
            type: "text",
        },
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
    section_id: string | null;
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
