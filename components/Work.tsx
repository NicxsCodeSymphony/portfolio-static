"use client";

import StarsBg from "@/constants/stars";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { works } from "@/constants/works";
import Image from "next/image";
import {fallbackImages, getImageSource} from "@/constants/imageSource";

import "swiper/css";
import "swiper/css/pagination";

const Work = () => {
    const workRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);


    return (
        <>
            <section
                ref={workRef}
                className="h-screen relative py-36 px-6 md:px-12 lg:px-48 bg-[#0A0A0A]"
                style={{ fontFamily: "Barlow Condensed, sans-serif" }}
            >
                <h1 className="text-lg tracking-[12px] font-bold text-[#5093C7] uppercase">
                    Featured Works
                </h1>

                <div className="mt-14 w-full">
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={400}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                        breakpoints={{
                            768: {
                                slidesPerView: 1.5,
                            },
                            1024: {
                                slidesPerView: 2,
                            },
                            1440: {
                                slidesPerView: 2.5,
                            },
                        }}
                    >
                        {works.map((item, index) => {
                            const fallbackImage = fallbackImages[index % fallbackImages.length];
                            const imageSource = getImageSource(item.imageID, fallbackImage);

                            return (
                                <SwiperSlide key={index}>
                                    <div
                                        className={`rounded-lg p-4 w-[42vw] h-[70vh] transition-all duration-500 ease-in-out ${
                                            index === activeIndex
                                                ? "scale-100 brightness-100"
                                                : "scale-90 brightness-50"
                                        }`}
                                    >
                                        <div className="relative w-full h-[83%] rounded-lg overflow-hidden">
                                            <Image
                                                src={imageSource}
                                                alt={item.title}
                                                fill
                                                className="object-cover rounded-lg"
                                            />
                                        </div>
                                        <div className="flex justify-between items-center text-white px-2 mt-4 uppercase">
                                            <h2 className="text-4xl font-medium">{item.title}</h2>
                                            <h4 className="text-xl">{item.type}</h4>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                        <SwiperSlide>
                            <div className="h-[70vh] w-full"></div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>
            <StarsBg />
        </>
    );
};

export default Work;
