import { lexicalHTML } from "@payloadcms/richtext-lexical";
import { Block } from "payload";

const Section: Block = {
    slug: "section",
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
            name: "content",
            label: "Content",
            type: "richText",
        },
        lexicalHTML("content", {
            name: "contentHTML",
        }),
    ],
};

export interface SectionType {
    section_id: string | null;
    title?: string | null;
    description?: string | null;
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
    contentHTML?: string | null;
}

export default Section;
