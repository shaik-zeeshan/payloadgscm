import Link from "next/link";

import { getPayloadHMR } from "@payloadcms/next/utilities";
import configPromise from "@payload-config";

export const Footer = async ({
	section = [],
}: {
	section?: {
		name?: string | null;
		url: string;
	}[];
}) => {
	const payload = await getPayloadHMR({ config: configPromise });

	const socialLinks = await payload.find({
		collection: "socal-links",
	});

	return (
		<div className="w-full min-h-96 bg-primary text-primary-foreground rounded-lg overflow-hidden md:p-20 sm:p-10 p-5">
			<div className="flex lg:flex-row flex-col-reverse gap-y-10  justify-between gap-30">
				<div className="flex flex-col justify-between">
					<h1 className="text-3xl font-semibold">GSCM Consulting</h1>
					<div className="text-sm text-primary-foreground/80">
						&#169;GSCM Consulting {new Date().getFullYear()}. All rights
						reserved.
					</div>
				</div>

				<div className="space-y-5">
					<h1 className="text-xl font-semibold">Sections</h1>
					<ul className="space-y-3">
						{section.map((section, index) => (
							<li key={index}>
								<Link
									href={section.url}
									className="cursor-pointer text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300"
								>
									{section.name}
								</Link>
							</li>
						))}
					</ul>
				</div>

				<div className="space-y-5">
					<h1 className="text-xl font-semibold">Contact Us</h1>
					<ul className="space-y-3">
						{socialLinks.docs.reverse().map((contact, index) => (
							<li key={index}>
								<div>{contact.title}</div>
								<div className="text-primary-foreground/80">
									{contact.value}
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};
