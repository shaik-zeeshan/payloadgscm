import About from "@/cms/blocks/About";
import Benefit from "@/cms/blocks/Benefit";
import Gallery from "@/cms/blocks/Gallery";
import Hero from "@/cms/blocks/Hero";
import Section from "@/cms/blocks/Section";
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
            blocks: [Hero, About, Service, Benefit, Gallery, Section],
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
