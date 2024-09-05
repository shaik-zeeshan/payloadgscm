import { SectionType } from "@/cms/blocks/Section";
import { FC } from "react";
import { RichText } from "./richtext";

export const Section: FC<SectionType> = ({
    title,
    description,
    contentHTML,
    section_id,
}) => {
    return (
        <section
            className="lg:w-5/6 md:w-2/3 w-full mx-auto py-14"
            id={section_id || "section"}
        >
            <div className="my-5">
                <div className="text-center text-4xl font-semibold ">{title}</div>
                <p className="text-center md:text-lg lg:w-[40rem] mx-auto mt-3 text-balance text-foreground/60">
                    {description}
                </p>
            </div>
            <div className="mt-10">
                <RichText html={contentHTML || ""} />
            </div>
        </section>
    );
};
