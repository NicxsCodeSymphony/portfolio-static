"use client";
import { useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const containerRef = useRef(null);
    const firstTextRef = useRef<HTMLDivElement>(null);
    const containerRef1 = useRef<HTMLDivElement>(null);

    // 🔹 New Refs for animation targets
    const imageRef = useRef<HTMLDivElement>(null);
    const textRef2 = useRef<HTMLDivElement>(null);

    const sectionTitleRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        // Section 1 background change
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
            duration: 0,
            ease: "power2.out",
        });

        // Section 2 background change
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
            duration: 0,
            ease: "power2.out",
        });

        // Animate "ABOUT ME" heading (in and out)
        ScrollTrigger.create({
            trigger: containerRef1.current,
            start: "top 90%",
            onEnter: () => {
                gsap.fromTo(
                    ".about-heading",
                    { y: 100, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                    }
                );
            },
            onLeaveBack: () => {
                gsap.to(".about-heading", {
                    y: 100,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power3.in",
                });
            },
        });

        ScrollTrigger.create({
            trigger: containerRef1.current,
            start: "top 90%",
            onEnter: () => {
                gsap.fromTo(
                    [imageRef.current, sectionTitleRef.current],
                    {y: 100, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.3,
                        ease: "power3.out"
                    }
                )
            }
        })

        // Animate image and text (in and out)
        ScrollTrigger.create({
            trigger: containerRef1.current,
            start: "top 85%",
            onEnter: () => {
                gsap.fromTo(
                    [imageRef.current, textRef2.current],
                    { y: 100, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.3,
                        ease: "power3.out",
                    }
                );
            },
            onLeaveBack: () => {
                gsap.to([imageRef.current, textRef2.current, sectionTitleRef.current], {
                    y: 100,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.2,
                    ease: "power3.in",
                });
            },
        });
    }, []);



    return (
        <>
            <section
                ref={containerRef}
                className="h-screen pt-64 bg-[#F9F9F7] about-section transition-colors duration-1000"
            >
                <div className="text-[8rem] leading-[10rem] w-[98%] space-y-6 p-8 first">
                    <h2 ref={firstTextRef}>
                        I create elevating digital experiences that inspire and connect with people through development and design
                    </h2>
                </div>
            </section>

            <section
                ref={containerRef1}
                className="h-[150vh] bg-[#1a1a1a] text-[#ffffff] transition-colors duration-1000"
            >
                <div className="px-8 lg:px-64 py-48">
                    <h1 className="about-heading text-6xl font-bold text-center text-[#7F8166] text-[6rem]" ref={sectionTitleRef}>ABOUT ME</h1>

                    <div className="flex gap-20 h-[65vh] relative mt-24">
                        {/* IMAGE CONTAINER */}
                        <div
                            ref={imageRef}
                            className="relative h-full w-full"
                        >
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
                            className="w-full sticky top-32 self-start"
                        >
                            <h2 className="text-4xl font-bold">A brief Intro, who am I?</h2>

                            <div className="text-xl">
                                <p className="mt-7">
                                    Hi, I&apos;m a fresh graduate and full-stack developer based in Bogo City, Cebu,
                                    Philippines. I&apos;m passionate about building web and application products that
                                    solve real problems and create meaningful user experiences. As a developer, I
                                    enjoy turning ideas into functional and visually engaging digital solutions.
                                </p>
                                <p className="mt-7">
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
