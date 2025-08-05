"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import TechMarquee from "./ui/marquee";
import { useRef } from "react";
import VideoFrame from "@/components/ui/youtube";
import Link from "next/link";

import {useHeroData} from "@/app/hooks/useHero";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const videoFrameRef = useRef<HTMLDivElement>(null);
    const scrollMessageRef = useRef<HTMLDivElement>(null);

    const {data, loading, error} = useHeroData()
    const heroData = data[0]

    useGSAP(() => {
        // Animate overlay
        gsap.fromTo(
            overlayRef.current,
            { scaleY: 1 },
            {
                scaleY: 0,
                transformOrigin: "top center",
                duration: 1.2,
                ease: "power4.out",
                delay: 0.2,
            }
        );

        // Scroll timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".wrapper",
                start: "top top",
                end: "+=500%",
                pin: true,
                scrub: 1.2,
            },
        });

        tl.fromTo(
            ".yeah",
            { scale: 5, z: 0 },
            {
                scale: 1,
                z: 0,
                transformOrigin: "center center",
                ease: "power2.inOut",
                duration: 3,
            }
        )
            .to(
                ".content",
                { opacity: 0, scale: 0.8, y: -50, ease: "power2.inOut", duration: 1.2 },
                1.5
            )
            .fromTo(
                ".video-container",
                { opacity: 0, scale: 0.3, rotationY: -15, y: 100 },
                { opacity: 1, scale: 1, rotationY: 0, y: 0, ease: "back.out(1.2)", duration: 2 },
                2
            )
            .fromTo(
                ".video-glow",
                { opacity: 0, scale: 0.8 },
                { opacity: 0.6, scale: 1.1, ease: "power2.out", duration: 1.5 },
                2.5
            )
            .fromTo(
                ".video-frame",
                { scale: 0.95, opacity: 0.8 },
                { scale: 1, opacity: 1, ease: "power2.out", duration: 1 },
                3
            );

        // Animate scroll message
        gsap.fromTo(
            scrollMessageRef.current,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "power2.out",
                delay: 1,
                repeat: -1,
                yoyo: true,
            }
        );
    }, []);

    return (
        <>
            <div
                className="absolute top-0 left-0 w-full h-full z-40"
                ref={overlayRef}
                style={{ transform: "scaleY(1)", transformOrigin: "top center" }}
            ></div>

            <section className="wrapper relative">
                <div className="relative w-full h-screen z-20">
                    <Image src="/sample.jpg" alt="hero" fill className="object-cover yeah" />

                    {/* Scroll Message */}
                    <div
                        ref={scrollMessageRef}
                        className="scroll-message absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-sm sm:text-base bg-black/50 px-6 py-2 rounded-full backdrop-blur-md font-medium z-30"
                    >
                        ↓ Scroll to explore ↓
                    </div>

                    {/* Main Content */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4 sm:px-6 md:px-8 lg:px-0 w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[45%] z-10 content flex flex-col items-center justify-center gap-6">
                        <p className="mb-2 text-base sm:text-lg">{heroData?.subtitle}</p>
                        <h1
                            className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl leading-tight font-bold"
                            style={{ fontFamily: "Proxima Nova Regular, sans-serif" }}
                        >
                            I&apos;m {heroData?.personal[0]?.name} <br /> {heroData?.personal[0]?.position} based in Cebu, Philippines
                        </h1>

                        <div className="mt-2 sm:mt-4 md:mt-6 w-4/5">
                            <p className="mb-8 sm:mt-6 md:mt-8 text-xs uppercase tracking-widest text-slate-600">
                                Tech Stacks
                            </p>
                            <TechMarquee />
                        </div>

                        <div className="mt-24 xl:mt-72 2xl:mt-72 flex flex-wrap justify-center gap-4">
                            <button
                                className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-full transition duration-300 shadow-md"
                                onClick={() => window.open(`https://drive.google.com/file/d/${heroData?.cv}`)}
                            >
                                Download CV
                            </button>
                            <Link
                                href="/project"
                                className="bg-neutral-700 hover:bg-neutral-800 text-white font-semibold px-6 py-3 rounded-full transition duration-300 shadow-md"
                            >
                                View Projects
                            </Link>
                        </div>
                    </div>
                </div>

                <div
                    className="video-container absolute top-1/6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 mx-auto px-4 sm:px-6 md:px-8 lg:px-0"
                    ref={videoFrameRef}
                    style={{
                        opacity: 0,
                        transform: "scale(0.3) rotateY(-15deg) translateY(100px)",
                    }}
                >
                    <div
                        className="video-glow absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl"
                        style={{
                            opacity: 0,
                            transform: "scale(0.8)",
                        }}
                    ></div>
                    <VideoFrame />
                </div>
            </section>
        </>
    );
};

export default Hero;
