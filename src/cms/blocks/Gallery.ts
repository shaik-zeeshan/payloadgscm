import { Block } from "payload";
import { Media } from "payload-types";

const Gallery: Block = {
    slug: "gallery",
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
            name: "images",
            label: "Images",
            type: "array",
            minRows: 1,
            fields: [
                {
                    name: "image",
                    label: "Image",
                    type: "upload",
                    relationTo: "media",
                    required: true,
                },
                {
                    name: "caption",
                    label: "Caption",
                    type: "text",
                },
            ],
        },
    ],
};

export interface GalleryType {
    section_id: string | null;
    title: string | null;
    images:
    | {
        image?: Media | null;
        caption?: string | null;
    }[]
    | null;
}

export default Gallery;
