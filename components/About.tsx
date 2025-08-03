"use client";
import { useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });

    const containerRef = useRef(null);
    const firstTextRef = useRef<HTMLDivElement>(null);
    const containerRef1 = useRef<HTMLDivElement>(null);

    const imageRef = useRef<HTMLDivElement>(null);
    const textRef2 = useRef<HTMLDivElement>(null);
    const sectionTitleRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // Background transition for first section
            gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom 60%",
                    toggleActions: "play none none reverse",
                },
            }).to(containerRef.current, {
                backgroundColor: "#1a1a1a",
                color: "#ffffff",
                duration: 0.3,
                ease: "power2.out",
            });

            // Background transition for second section
            gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef1.current,
                    start: "top 80%",
                    end: "bottom 60%",
                    toggleActions: "play none none reverse",
                },
            }).to(containerRef1.current, {
                backgroundColor: "#F9F9F7",
                color: "#000000",
                duration: 0.3,
                ease: "power2.out",
            });

            // Combined animations for section title, image, and text
            gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef1.current,
                    start: "top 85%",
                    end: "bottom 60%",
                    toggleActions: "play none none reverse",
                },
            })
                .fromTo(
                    sectionTitleRef.current,
                    { y: 100, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                    }
                )
                .fromTo(
                    imageRef.current,
                    { y: 100, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                    },
                    "-=0.7"
                )
                .fromTo(
                    textRef2.current,
                    { y: 100, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                    },
                    "-=0.7"
                );
        });

        return () => ctx.revert(); // cleanup
    }, []);

    return (
        <>
            <section
                ref={containerRef}
                className="min-h-screen pt-32 md:pt-64 bg-[#F9F9F7] about-section transition-colors duration-1000"
            >
                <div className="text-[2rem] md:text-[5rem] lg:text-[8rem] leading-tight md:leading-[8rem] w-[95%] p-4 md:p-8 space-y-6">
                    <h2 ref={firstTextRef}>
                        I create elevating digital experiences that inspire and connect with people through development and design
                    </h2>
                </div>
            </section>

            <section
                ref={containerRef1}
                className="min-h-[100vh] bg-[#1a1a1a] text-[#ffffff] transition-colors duration-1000"
            >
                <div className="px-4 md:px-20 2xl:px-64 py-20 md:py-48">
                    <h1
                        className="about-heading text-4xl md:text-5xl lg:text-[6rem] font-bold text-center text-[#7F8166]"
                        ref={sectionTitleRef}
                    >
                        ABOUT ME
                    </h1>

                    <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-10 md:gap-20 relative mt-16 md:mt-24`}>
                        {/* IMAGE CONTAINER */}
                        <div ref={imageRef} className="relative h-64 md:h-[65vh] w-full">
                            <Image
                                src="/sample.jpg"
                                alt="sample"
                                fill
                                className="object-cover rounded-xl"
                            />
                        </div>

                        {/* STICKY TEXT */}
                        <div
                            ref={textRef2}
                            className={`w-full ${isMobile ? "static" : "sticky top-32"} self-start`}
                        >
                            <h2 className="text-2xl md:text-4xl font-bold mb-4">A brief Intro, who am I?</h2>
                            <div className="text-base md:text-xl space-y-5">
                                <p>
                                    Hi, I&apos;m a fresh graduate and full-stack developer based in Bogo City, Cebu,
                                    Philippines. I&apos;m passionate about building web and application products that
                                    solve real problems and create meaningful user experiences.
                                </p>
                                <p>
                                    When I&apos;m not coding, you&apos;ll often find me immersed in music—listening,
                                    creating, and exploring new sounds. Music is my creative outlet and a big part of
                                    how I unwind and stay inspired.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;
