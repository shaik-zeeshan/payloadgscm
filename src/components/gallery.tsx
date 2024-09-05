"use client";
import React, { FC } from "react";
import { Card } from "./ui/card";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./ui/carousel";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { GalleryType } from "@/cms/blocks/Gallery";

export const Gallery: FC<GalleryType> = (props) => {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    if (!props.images?.length) {
        return null;
    }

    return (
        <section
            className="lg:w-5/6 md:w-2/3 w-full mx-auto py-14"
            id={props.section_id || "gallery"}
        >
            <div className="my-5">
                <div className="text-center text-4xl font-semibold ">Gallery</div>
                <p className="text-center md:text-lg lg:w-[40rem] mx-auto mt-3 text-balance text-foreground/60">
                    Showcase of our work
                </p>
            </div>
            <div className="mt-10">
                <Carousel setApi={setApi}>
                    <CarouselContent>
                        {props.images?.map((image, index) => (
                            <CarouselItem key={index}>
                                <Card className="w-full relative overflow-hidden transition-colors duration-200">
                                    <AspectRatio ratio={16 / 9}>
                                        <Image
                                            fill
                                            src={image.image?.url || ""}
                                            alt={image.caption || "Gallery Image"}
                                            className="absolute -z-0 top-0 left-0 w-full h-full rotate-0 object-cover"
                                        />
                                    </AspectRatio>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselNext className="md:top-1/2 top-auto -bottom-14 md:-right-12 right-20" />
                    <CarouselPrevious className="md:top-1/2 top-auto -bottom-14 md:-left-12 left-20" />
                </Carousel>
            </div>
            <div className="py-2 text-center md:text-base text-sm text-muted-foreground">
                Slide <span className="text-primary">{current}</span> of {count}
            </div>
        </section>
    );
};
