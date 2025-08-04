"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import services from "@/constant/service";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
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
    }, []);

    return (
        <section
            id="about"
            ref={containerRef}
            className="relative h-screen overflow-hidden bg-white"
        >
            <div
                ref={wrapperRef}
                className="flex h-full w-[400vw] md:w-[300vw] sm:w-[200vw] panel-wrapper"
            >
                {/* Panel 1 */}
                <div className="panel w-screen h-full px-10 md:px-24 lg:px-48 bg-[#F7F3ED] text-3xl font-bold py-20 pb-40">
                    <h5 className="text-sm md:text-base lg:text-lg">My Mission</h5>

                    <div className="flex flex-col lg:flex-row justify-between items-start mt-10 gap-10 h-full">
                        {/* Left Text + Scroll Indicator */}
                        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between lg:w-3/5 gap-4">
                            <p className="font-extralight text-4xl md:text-5xl lg:text-6xl">
                                I create elevating digital experiences that inspire and connect
                                with people through development and design
                            </p>
                        </div>

                        {/* Right Text + Buttons */}
                        <div className="text-base md:text-lg lg:text-xl lg:w-1/3 self-end">
                            <p className="font-extralight">
                                From intuitive dashboards to immersive websites, we blend
                                creativity with strategy to deliver elegant, user-centric
                                solutions tailored to your brand&apos;s vision.
                            </p>

                            <div className="flex flex-col sm:flex-row mt-48 gap-6 sm:gap-20 text-lg font-medium">
                                <button className="flex items-center gap-2 group hover:text-emerald-600 transition">
                                    Experience the Work
                                    <svg
                                        className="w-5 h-5 transform group-hover:translate-x-1 transition"
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
                                        className="w-5 h-5 transform group-hover:translate-x-1 transition"
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
                <div className="panel w-[120vw] md:w-[120vw] sm:w-screen h-full flex flex-wrap bg-[#F7F3ED] text-3xl overflow-y-auto">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="group relative w-full sm:w-1/2 lg:w-1/3 2xl:w-1/4 h-full flex flex-col justify-between border-l border-black px-6 py-10 hover:cursor-pointer hover:text-white transition-all duration-500 overflow-hidden"
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
                                <h1 className="text-[6rem] md:text-[10rem] lg:text-[14rem] xl:text-[20rem] leading-64 font-bold">
                                    {service.id}
                                </h1>
                                <h5 className="text-2xl md:text-3xl lg:text-4xl font-light">
                                    {service.title}
                                </h5>
                                <p className="text-base md:text-lg lg:text-xl 2xl:w-3/4 w-full text-[#c0c0c0] hover:text-white">
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