import { BenefitsType } from "@/cms/blocks/Benefit";
import { Card, CardTitle } from "@/components/ui/card";
import { FC } from "react";

export const Benefits: FC<BenefitsType> = (props) => {
	return (
		<section className="lg:w-5/6 md:w-2/3 w-full mx-auto py-14" id="benefit">
			<div className="my-5">
				<div className="text-center text-4xl font-semibold ">{props.title}</div>
				<p className="text-center md:text-lg lg:w-[40rem] mx-auto mt-3 text-balance text-foreground/60">
					{props.description}
				</p>
			</div>
			<div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 gap-5 mt-10">
				{props.benefits?.map((item, index) => (
					<Card
						key={index}
						className="p-5 hover:bg-primary/10 overflow-hidden transition-colors duration-200"
					>
						<div className="space-y-2 h-full flex flex-col justify-between">
							<CardTitle className="text-xl">{item.title}</CardTitle>
							<p className="text-foreground/60">{item.description}</p>
						</div>
					</Card>
				))}
			</div>
		</section>
	);
};
