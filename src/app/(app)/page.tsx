import Components from "@/cms/blocks";
import { type Page } from "payload-types";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import configPromise from "@payload-config";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";

export default async function Page() {
	const payload = await getPayloadHMR({ config: configPromise });

	let pages = await payload.find({
		collection: "pages",
		where: { slug: { equals: "home" } },
		limit: 1,
	});

	const page = await payload.update({
		collection: "pages",
		id: pages.docs[0].id,
		data: {
			viewCount: (pages.docs[0].viewCount || 0) + 1,
		},
	});

	if (!pages.docs.length) {
		notFound();
	}

	const notSection = ["hero"];

	const sectionFiltered = page.blocks?.filter(
		(block) => !notSection.includes(block.blockType),
	);

	const section = sectionFiltered?.map((block) => ({
		name: block.blockType !== "header" ? block.blockName : "Home",
		url: block.blockType !== "header" ? `/#${block.blockType}` : "/",
	}));

	return (
		<div className="w-full h-full p-5">
			<RenderBlocks blocks={page.blocks} />
			<Footer section={section} />
		</div>
	);
}

const RenderBlocks = ({ blocks }: { blocks: Page["blocks"] }) => {
	return (
		<>
			{blocks?.map((block) => {
				const Component = Components[block.blockType];
				if (!Component) {
					return null;
				}
				// @ts-ignore
				return <Component key={block.id} {...block} />;
			})}
		</>
	);
};
