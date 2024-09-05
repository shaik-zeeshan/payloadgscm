import Components from "@/cms/blocks";
import { type Page } from "payload-types";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import configPromise from "@payload-config";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default async function Page() {
	const payload = await getPayloadHMR({ config: configPromise });

	let pages = await payload.find({
		collection: "pages",
		where: { slug: { equals: "home" } },
		limit: 1,
	});

	if (!pages.docs.length) {
		return notFound();
	}

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

	return (
		<div className="w-full h-full p-5">
			<Header />
			<RenderBlocks blocks={page.blocks} />
			<Footer />
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
