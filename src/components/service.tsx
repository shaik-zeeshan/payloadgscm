import { FC } from "react";
import { Card, CardTitle } from "./ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./ui/carousel";
import Image from "next/image";
import { ServiceType } from "@/cms/blocks/Service";

export const Services: FC<ServiceType> = (props) => {
    return (
        <section
            className="lg:w-5/6 md:w-2/3 w-full mx-auto py-14"
            id={props.section_id || "service"}
        >
            <div className="my-5">
                <div className="text-center text-4xl font-semibold ">{props.title}</div>
                <p className="text-center md:text-lg lg:w-[40rem] mx-auto mt-3 text-balance text-foreground/60">
                    {props.description}
                </p>
            </div>
            <div className="mt-10">
                <Carousel>
                    <CarouselContent>
                        {props.services?.map((service, index) => (
                            <CarouselItem key={index}>
                                <Card className="h-96 relative overflow-hidden transition-colors duration-200">
                                    {service.image ? (
                                        <Image
                                            fill
                                            src={service.image?.url || ""}
                                            alt={service.service || ""}
                                            className="absolute -z-0 top-0 left-0 w-full h-full object-contain"
                                        />
                                    ) : (
                                        <div className="absolute -z-0 top-0 left-0 w-full h-96 bg-primary/20">
                                            <div className="flex items-center justify-center w-full h-full">
                                                <div className="text-foreground/60">
                                                    Image will be uploaded soon
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex p-5 flex-col justify-end relative z-20 bg-black/20  h-full">
                                        <div className="space-y-2 flex flex-col ">
                                            <CardTitle className="text-xl">
                                                {service?.service}
                                            </CardTitle>
                                            <p className="text-foreground/60">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselNext className="md:top-1/2 top-auto -bottom-14 md:-right-12 right-20" />
                    <CarouselPrevious className="md:top-1/2 top-auto -bottom-14 md:-left-12 left-20" />
                </Carousel>
            </div>
        </section>
    );
};
