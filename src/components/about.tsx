import { type About as AboutType } from "@/cms/blocks/About";
import Image from "next/image";
import { FC } from "react";

export const About: FC<AboutType> = (props) => {
	return (
		<section className="lg:w-5/6 w-full mx-auto py-14" id="about">
			<div className="my-5">
				<div className="text-center text-4xl font-semibold">{props.title}</div>
				<p className="text-center md:text-lg md:w-[50rem] mx-auto mt-3 text-balance text-foreground/60">
					{props.description}
				</p>
			</div>
			<div
				className="text-foreground/80 lg:text-lg content"
				dangerouslySetInnerHTML={{ __html: props.contentHTML || "" }}
			/>
			<div className="mt-5">
				<div className="text-xl font-semibold"> About Me </div>
			</div>
			<div className="mt-4 flex lg:flex-row flex-col gap-10 justify-center items-center">
				<div className="relative md:w-52 md:h-52 w-full h-96">
					<Image
						src={props.image?.url || ""}
						alt="GMCS"
						fill
						className="object-cover float-left rounded-lg shadow"
					/>
				</div>
				<p className="text-foreground/80 lg:text-lg flex-1 text-justify">
					{props.aboutMeContent}
				</p>
			</div>
			{Boolean(props.employee?.length) && (
				<div className="mt-5">
					<div className="text-xl font-semibold"> Our Team </div>
					<div className="mt-4 flex lg:flex-row flex-col gap-10 justify-center items-center">
						{props.employee?.map((employee, index) => (
							<div key={index} className="flex flex-col items-center">
								<div className="relative w-52 h-52">
									<Image
										src={employee.image?.url || ""}
										alt="GMCS"
										fill
										className="object-cover rounded-lg shadow"
									/>
								</div>
								<div className="text-lg font-semibold mt-2">
									{employee.name}
								</div>
								<div className="text-sm text-foreground/80">
									{employee.position}
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</section>
	);
};
