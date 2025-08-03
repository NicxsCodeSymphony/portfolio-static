"use client"

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useMediaQuery } from 'react-responsive';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
    // Removed unused `isDesktop`

    useGSAP(() => {
        const sections = gsap.utils.toArray<HTMLElement>(".animate-on-scroll");

        sections.forEach((section) => {
            gsap.fromTo(
                section,
                {
                    opacity: 0,
                    y: isMobile ? 30 : isTablet ? 40 : 50,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        });

    }, { scope: containerRef });

    return (
        <section className="min-h-[130vh] transition-colors duration-1000" ref={containerRef}>
            <div className="px-4 md:px-20 2xl:px-64 py-20 md:py-36">
                <h1 className="animate-on-scroll text-4xl md:text-5xl lg:text-[6rem] font-bold text-center text-[#7F8166]">SERVICES</h1>

                <div className="flex flex-col md:flex-row gap-12 mt-20">
                    <div className="w-full animate-on-scroll">
                        <h4 className="font-bold text-4xl md:text-5xl">my expertises</h4>
                        <p className="mt-5 text-lg md:text-xl w-full md:w-2/3">
                            I focus on all things design and web related. With each of my services, my goal is to deliver an impactful and elevating digital experience for everyone
                        </p>
                    </div>

                    <div className="w-full space-y-3 animate-on-scroll">
                        {["Web Development", "Application Development", "Backend Development", "API Integration", "UI/UX DESIGN"].map((item, index) => (
                            <h1 key={index} className="text-3xl md:text-5xl font-black text-[#A5A496]">{item}</h1>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-12 mt-20">
                    <div className="w-full animate-on-scroll">
                        <h4 className="font-bold text-4xl md:text-5xl">my technical tools</h4>
                        <p className="mt-5 text-lg md:text-xl w-full md:w-2/3">
                            I focus on all things design and web related. With each of my services, my goal is to deliver an impactful and elevating digital experience for everyone
                        </p>
                    </div>

                    <div className="w-full space-y-3 animate-on-scroll">
                        {[
                            "HTML CSS JavaScript", "TypeScript", "React Next Svelte", "Node Express Nest JS",
                            "MySQL NoSQL Firebase", "PostgreSQL SQLite", "Python Fast API", "GSAP Lenis", "Figma Photoshop"
                        ].map((item, index) => (
                            <h1 key={index} className="text-3xl md:text-5xl font-black text-[#A5A496]">{item}</h1>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
