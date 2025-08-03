// components/ProjectPageClient.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaTimes } from "react-icons/fa";
import ReactLenis from "lenis/react";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import projectData from "@/constant/projectData";

interface ProjectPageClientProps {
    project: typeof projectData[0];
}

const ProjectPageClient = ({ project }: ProjectPageClientProps) => {
    const router = useRouter();
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isLaptop = useMediaQuery({ minWidth: 768, maxWidth: 1280 });

    useGSAP(() => {
        if (!project) return;

        if (imageRef.current) gsap.set(imageRef.current, { y: 0 });
        if (titleRef.current) gsap.set(titleRef.current, { opacity: 0, y: -50 });

        const tl = gsap.timeline();

        if (modalRef.current) {
            tl.to(modalRef.current, {
                scale: 1,
                opacity: 1,
                borderRadius: 0,
                duration: 1.2,
                ease: "power4.out",
            });
        }

        if (imageRef.current && !isMobile) {
            // Calculate animation distance based on title height
            let animationDistance = 200; // Default for laptop
            
            if (titleRef.current) {
                const titleHeight = titleRef.current.offsetHeight;
                const titleTop = titleRef.current.offsetTop;
                
                if (isLaptop) {
                    animationDistance = titleTop + titleHeight + 50;
                } else {
                    animationDistance = titleTop + titleHeight + 30;
                }
            }
            
            tl.fromTo(
                imageRef.current,
                { y: 0 },
                { y: animationDistance, duration: 2, ease: "power3.out" },
                "-=0.5"
            );
        }

        if (titleRef.current) {
            tl.to(
                titleRef.current,
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: "power3.out",
                },
                "-=0.8"
            );
        }

        return () => {
            tl.kill();
        };
    }, { dependencies: [project] });

    const handleClose = () => {
        if (modalRef.current) {
            gsap.to(modalRef.current, {
                scale: 0.8,
                opacity: 0,
                borderRadius: "50%",
                duration: 0.8,
                ease: "power4.in",
                onComplete: () => {
                    router.push("/");
                    setTimeout(() => {
                        const element = document.getElementById("project");
                        if (element) element.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                },
            });
        }
    };

    return (
        <div ref={modalRef} className="relative min-h-screen w-full z-50 bg-[#F7F3ED]">
            <button
                onClick={handleClose}
                className="absolute top-4 left-4 md:top-6 md:left-6 z-60 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
                <FaTimes className="text-black text-lg md:text-xl" />
            </button>

            <ReactLenis root>
                <div ref={contentRef} className="w-full min-h-screen scrollbar-hide">
                    <div className="relative">
                        <div className="flex items-start justify-end w-full h-16 sm:h-20 md:h-24 lg:h-32">
                            <div className="p-4 md:p-6 max-w-6xl mx-auto md:ml-[33.333333%] z-20 mt-4 sm:mt-6 md:mt-8 lg:mt-40">
                                <h2 ref={titleRef} className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-[6rem] font-extralight text-center md:text-left leading-tight">
                                    {project.title}
                                </h2>
                            </div>
                        </div>

                        <div
                            ref={imageRef}
                            className="absolute top-0 left-0 w-full h-screen rounded-lg"
                        >
                            <Image src={project.img} alt="Project full image" fill className="object-cover w-full h-full" />
                            <div className="absolute inset-0" />
                        </div>
                    </div>

                    {/* Spacer to push content below the full-screen image */}
                    <div className="h-screen"></div>

                    <div className="p-4 md:p-6 max-w-4xl mx-auto">
                        <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit...
                        </p>
                        <div className="mt-10 h-[100vh] md:h-[200vh]">
                            <p className="text-gray-500">Scroll down to see more content...</p>
                        </div>
                    </div>
                </div>
            </ReactLenis>
        </div>
    );
};

export default ProjectPageClient;
