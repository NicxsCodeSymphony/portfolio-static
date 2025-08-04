"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import services from "@/constant/service";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Check if device is mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768); // 768px is the 'md' breakpoint
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useGSAP(() => {
        // Only apply horizontal scroll animation on non-mobile devices
        if (isMobile) return;

        const panels = gsap.utils.toArray(".panel");

        gsap.to(panels, {
            xPercent: -100 * (panels.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            },
        });
    }, [isMobile]);

    return (
        <section
            id="about"
            ref={containerRef}
            className={`relative ${isMobile ? 'min-h-screen' : 'h-screen'} overflow-hidden`}
        >
            <div
                ref={wrapperRef}
                className={`${isMobile ? 'flex flex-col' : 'flex h-full w-[400vw] md:w-[300vw] sm:w-[200vw]'} panel-wrapper`}
            >
                {/* Panel 1 */}
                <div className={`panel ${isMobile ? 'w-full min-h-screen' : 'w-screen h-full'} px-4 sm:px-6 md:px-10 lg:px-24 xl:px-48 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold py-8 sm:py-12 md:py-16 lg:py-20 pb-20 sm:pb-24 md:pb-32 lg:pb-40`}>
                    <h5 className="text-xs sm:text-sm md:text-base lg:text-lg">My Mission</h5>

                    <div className="flex flex-col lg:flex-row justify-between items-start mt-6 sm:mt-8 md:mt-10 gap-6 sm:gap-8 md:gap-10 h-full">
                        {/* Left Text + Scroll Indicator */}
                        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between lg:w-3/5 gap-4">
                            <p className="font-extralight text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl leading-tight sm:leading-relaxed md:leading-loose lg:leading-normal">
                                I create elevating digital experiences that inspire and connect
                                with people through development and design
                            </p>
                        </div>

                        {/* Right Text + Buttons */}
                        <div className="text-sm sm:text-base md:text-lg lg:text-xl lg:w-1/3 self-end">
                            <p className="font-extralight">
                                From intuitive dashboards to immersive websites, we blend
                                creativity with strategy to deliver elegant, user-centric
                                solutions tailored to your brand&apos;s vision.
                            </p>

                            <div className="flex flex-col sm:flex-row mt-16 sm:mt-24 md:mt-32 lg:mt-48 gap-4 sm:gap-6 md:gap-8 lg:gap-20 text-sm sm:text-base md:text-lg font-medium">
                                <button className="flex items-center gap-2 group hover:text-emerald-600 transition">
                                    Experience the Work
                                    <svg
                                        className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>

                                <button className="flex items-center gap-2 group hover:text-emerald-600 transition">
                                    Inquire
                                    <svg
                                        className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Panel 2 */}
                <div className={`panel ${isMobile ? 'w-full' : 'w-[120vw] md:w-[120vw] sm:w-screen h-full'} flex flex-col sm:flex-row lg:flex-row text-lg sm:text-xl md:text-2xl lg:text-3xl ${isMobile ? '' : 'overflow-y-auto'}`}>
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className={`group relative w-full sm:w-1/2 lg:w-1/4 xl:w-1/4 2xl:w-1/4 ${isMobile ? 'min-h-screen' : 'h-screen sm:h-full lg:h-full'} flex flex-col justify-between border-l border-black px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-10 hover:cursor-pointer hover:text-white transition-all duration-500 overflow-hidden`}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 z-0 overflow-hidden">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out scale-110 group-hover:scale-100"
                                />
                                {/* Dark overlay for better text readability */}
                                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-700 ease-out"></div>
                            </div>

                            {/* Foreground content */}
                            <div className="relative z-10 flex flex-col justify-between h-full">
                                <h1 className="text-[3rem] sm:text-[4rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] 2xl:text-[14rem] leading-none sm:leading-tight md:leading-relaxed lg:leading-64 font-bold">
                                    {service.id}
                                </h1>
                                <h5 className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-light">
                                    {service.title}
                                </h5>
                                <p className="text-sm sm:text-base md:text-lg lg:text-base xl:text-lg 2xl:text-xl 2xl:w-3/4 w-full text-[#c0c0c0] hover:text-white">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default About;