"use client";

import StarsBg from "@/constants/stars";
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { works } from "@/constants/works";
import Image from "next/image";
import { fallbackImages, getImageSource } from "@/constants/imageSource";
import { useOverlay } from "./OverlayContext";
import ExpandedProject from "./ExpandedProject";
import { useMediaQuery } from "react-responsive";

import "swiper/css";
import "swiper/css/pagination";

const Work = () => {
    const workRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedWork, setSelectedWork] = useState<number | null>(null);
    const [clonedCard, setClonedCard] = useState<{
        top: number;
        left: number;
        width: number;
        height: number;
    } | null>(null);

    const { setIsOverlayOpen } = useOverlay();

    // Responsive breakpoints
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
    const isDesktop = useMediaQuery({ minWidth: 1024 });
    const isLargeDesktop = useMediaQuery({ minWidth: 1440 });

    // Cleanup effect to reset body styles when component unmounts
    useEffect(() => {
        return () => {
            // Reset body styles when component unmounts
            document.body.classList.remove('overlay-open');
        };
    }, []);

    const handleClick = (index: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.currentTarget.getBoundingClientRect();

        setClonedCard({
            top: target.top,
            left: target.left,
            width: target.width,
            height: target.height,
        });

        setSelectedWork(index);
        setIsOverlayOpen(true);
        // Add class to body for better scroll control
        document.body.classList.add('overlay-open');
    };

    const handleClose = () => {
        setSelectedWork(null);
        setClonedCard(null);
        setIsOverlayOpen(false);
        // Remove overlay class from body
        document.body.classList.remove('overlay-open');
    };

    return (
        <>
            <section
                ref={workRef}
                className={`min-h-screen relative bg-[#0A0A0A] ${
                    isMobile 
                        ? "py-20 px-4" 
                        : isTablet 
                        ? "py-28 px-8" 
                        : isDesktop
                        ? "py-28 px-20"
                        : isLargeDesktop 
                        ? "py-36 px-64" 
                        : "py-32 px-64"
                }`}
                style={{ fontFamily: "Marvel, sans-serif" }}
            >
                <h1 className={`font-bold text-[#5093C7] uppercase ${
                    isMobile 
                        ? "text-sm tracking-[8px] text-center" 
                        : isTablet 
                        ? "text-base tracking-[10px]" 
                        : "text-lg tracking-[12px]"
                }`}>
                    Featured Works
                </h1>

                <div className={`w-full ${
                    isMobile ? "mt-8 flex justify-center" : isTablet ? "mt-12" : "mt-14"
                }`}>
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={isMobile ? 40 : isTablet ? 150 : isLargeDesktop ? 600 : 54}
                        slidesPerView={1}
                        pagination={{ 
                            clickable: true,
                            dynamicBullets: isMobile,
                            dynamicMainBullets: isMobile ? 1 : 3
                        }}
                        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 40,
                            },
                            480: {
                                slidesPerView: 1,
                                spaceBetween: 60,
                            },
                            768: {
                                slidesPerView: 1.5,
                                spaceBetween: 150,
                            },
                            1024: {
                                slidesPerView: 2,
                                spaceBetween: 54,
                            },
                            1440: {
                                slidesPerView: 2.5,
                                spaceBetween: 600,
                            },
                        }}
                        allowTouchMove={!selectedWork}
                    >
                        {works.map((item, index) => {
                            const fallbackImage = fallbackImages[index % fallbackImages.length];
                            const imageSource = getImageSource(item.imageID, fallbackImage);

                            return (
                                <SwiperSlide key={index}>
                                    <div
                                        className={`rounded-lg transition-all duration-500 ease-in-out cursor-pointer ${
                                            index === activeIndex && selectedWork === null
                                                ? "scale-100 brightness-100"
                                                : "scale-90 brightness-50"
                                        } ${
                                            isMobile 
                                                ? "p-3 w-[90vw] max-w-sm h-[60vh] mx-auto" 
                                                : isTablet 
                                                ? "p-3 w-[80vw] h-[60vh]" 
                                                : isLargeDesktop 
                                                ? "p-4 w-[42vw] h-[70vh]" 
                                                : "p-4 w-[45vw] h-[65vh]"
                                        }`}
                                        onClick={(e) => handleClick(index, e)}
                                    >
                                        <div className={`relative w-full rounded-lg overflow-hidden ${
                                            isMobile ? "h-[75%]" : isTablet ? "h-[80%]" : "h-[83%]"
                                        }`}>
                                            <Image
                                                src={imageSource}
                                                alt={item.title}
                                                fill
                                                className="object-cover rounded-lg"
                                            />
                                        </div>
                                        <div className={`text-white uppercase ${
                                            isMobile 
                                                ? "px-2 mt-3 flex flex-col items-center text-center space-y-2" 
                                                : isTablet 
                                                ? "px-2 mt-3 flex justify-between items-center" 
                                                : "px-2 mt-4 flex justify-between items-center"
                                        }`}>
                                            <h2 className={`font-bold ${
                                                isMobile 
                                                    ? "text-2xl" 
                                                    : isTablet 
                                                    ? "text-2xl" 
                                                    : isLargeDesktop 
                                                    ? "text-4xl" 
                                                    : "text-3xl"
                                            }`}>
                                                {item.title}
                                            </h2>
                                            <h4 className={`${
                                                isMobile 
                                                    ? "text-sm" 
                                                    : isTablet 
                                                    ? "text-lg" 
                                                    : isLargeDesktop 
                                                    ? "text-xl" 
                                                    : "text-lg"
                                            }`}>
                                                {item.type}
                                            </h4>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                        <SwiperSlide>
                            <div className={`w-full ${
                                isMobile ? "h-[60vh]" : isTablet ? "h-[60vh]" : isLargeDesktop ? "h-[70vh]" : "h-[65vh]"
                            }`}></div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>

            {/* Expanded Project Overlay */}
            <ExpandedProject
                selectedWork={selectedWork}
                clonedCard={clonedCard}
                onClose={handleClose}
            />

            <StarsBg />
        </>
    );
};

export default Work;
