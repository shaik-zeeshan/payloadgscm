import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { type Hero } from "@/cms/blocks/Hero";
import { FC } from "react";

export const HeroSection: FC<Hero> = ({ ...props }) => {
	return (
		<section className="bg-secondary overflow-hidden shadow border-2 rounded-lg md:h-[80dvh] h-[60dvh] relative flex">
			<div
				className="w-full bg-primary/30 flex-1 relative z-50 flex lg:p-20 md:p-10 sm:p-5 p-2"
				style={{
					justifyContent: props.textAlignment || "center",
					alignItems:
						props.verticalAlignment === "top"
							? "flex-start"
							: props.verticalAlignment === "center"
								? "center"
								: "flex-end",
					textAlign: props.textAlignment || "center",
				}}
			>
				<div className="space-y-10">
					<div className="space-y-5 text-primary-foreground ">
						<h1 className="md:text-4xl sm:text-2xl text-xl font-semibold">
							{props.title}
						</h1>
						<p className="md:text-lg text-base md:w-[30rem] mx-auto text-primary-foreground/80  text-balance">
							{props.description}
						</p>
					</div>
					<Button variant={"outline"}>
						<Link href={props.button?.link || ""}>{props.button?.text}</Link>
					</Button>
				</div>
			</div>
			<Image
				src={props.image?.url || ""}
				fill
				className="object-cover absolute w-full h-full rounded-lg"
				alt={props.image?.filename || "Hero Image"}
			/>
		</section>
	);
};
