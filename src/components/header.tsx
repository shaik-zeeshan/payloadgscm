import { Card } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import configPromise from "@payload-config";

export const Header = async () => {
	const payload = await getPayloadHMR({ config: configPromise });

	const header = await payload.findGlobal<"header">({
		slug: "header",
	});

	return (
		<Card className="p-2 lg:w-4/5 w-full mx-auto mb-5">
			<div className="flex h-full flex-wrap justify-between items-center">
				<div className="font-semibold px-5 text-primary md:w-max w-1/2 -order-2">
					<div className="relative">
						<div className="text-xl -tracking-[0.15rem]">{header.logo}</div>
					</div>
				</div>
				<div className="md:-order-1 order-1 md:p-0 p-3 mx-auto">
					<ul className="flex gap-10 text-sm text-secondary-foreground/70 list-none">
						{header?.sections?.map((section, index) => (
							<li key={index}>
								<Link
									href={section.href || ""}
									className="font-semibold  hover:text-primary/80"
								>
									{section.title}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div className="md:w-max w-1/2 flex justify-end">
					<Button variant={"outline-primary"} asChild>
						<Link href={header?.cta?.href || ""}>
							{header?.cta?.text || ""}
						</Link>
					</Button>
				</div>
			</div>
		</Card>
	);
};
