"use client";

import { useRef, useState } from "react";
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

    const [distance, setDistance] = useState(0);

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
            let animationDistance = 200;

            if (titleRef.current) {
                const titleHeight = titleRef.current.offsetHeight;
                const titleTop = titleRef.current.offsetTop;
                animationDistance = isLaptop
                    ? titleTop + titleHeight + 50
                    : titleTop + titleHeight + 30;
                setDistance(animationDistance);
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

    const getImageUrl = (img: string) => {
        if (!img.includes("/") && img.length >= 25) {
            return `https://drive.google.com/uc?export=view&id=${img}`;
        }
        return img;
    };

    return (
        <div ref={modalRef} className="relative w-full z-50 bg-[#0D0E17] text-white">
        {/* Close Button */}
            <button
                onClick={handleClose}
                className="absolute top-4 left-4 md:top-6 md:left-6 z-60 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
                <FaTimes className="text-black text-lg md:text-xl" />
            </button>

            {/* Smooth scrolling */}
            <ReactLenis root>
                <div ref={contentRef} className="w-full scrollbar-hide">

                    {/* Fullscreen Image with Title */}
                    <div className="relative h-screen w-full border-[10px #000 solid]">
                        {/* Background Image */}
                        <div ref={imageRef} className="absolute inset-0 z-10">
                            <Image
                                src={getImageUrl(project.img)}
                                alt="Project full image"
                                fill
                                className="object-cover w-full h-full"
                            />
                        </div>

                        {/* Title Overlay */}
                        <div className="relative z-20 flex items-start justify-end h-full">
                            <div className="p-4 md:p-6 max-w-6xl mx-auto md:ml-[33.333333%] mt-20 lg:mt-40">
                                <h2
                                    ref={titleRef}
                                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-[6rem] font-extralight text-center md:text-left leading-tight  drop-shadow-lg"
                                >
                                    {project.title}
                                </h2>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div
                        className="relative z-30 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-40 pb-12 sm:pb-16 md:pb-24 lg:pb-32 xl:pb-48"
                        style={{ marginTop: `${distance + 60}px` }}
                    >
                        <div className="flex flex-col lg:flex-row justify-between w-full gap-8 lg:gap-20">
                            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 lg:gap-20 w-full">
                                <div>
                                    <h4 className="text-sm sm:text-base md:text-lg font-semibold mb-2">Client</h4>
                                    <p className="text-xs sm:text-sm md:text-base">Capstone Project</p>
                                </div>

                                <div>
                                    <h4 className="text-sm sm:text-base md:text-lg font-semibold mb-2">Role</h4>
                                    <p className="text-xs sm:text-sm md:text-base">Full Stack Developer</p>
                                </div>

                                <div>
                                    <h4 className="text-sm sm:text-base md:text-lg font-semibold mb-2">Duration</h4>
                                    <p className="text-xs sm:text-sm md:text-base">6 Months</p>
                                </div>
                            </div>

                            <div className="pt-1 text-sm sm:text-base md:text-lg lg:text-xl font-light w-full">
                                <p className="text-justify lg:pr-36 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-10 mt-12 sm:mt-16 md:mt-24 lg:mt-48">
                            <div className="w-full border h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[80vh]"></div>
                            <div className="w-full border h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[80vh]"></div>
                            <div className="w-full border h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[80vh]"></div>
                        </div>

                        <div className="mt-16 sm:mt-24 md:mt-32 lg:mt-64 flex flex-col lg:flex-row gap-8 lg:gap-16">
                            <div className="w-full lg:w-1/2"></div>
                            <div className="w-full lg:w-1/2">
                                <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">LOREM IPSUM DOLOR SIT AMET</h1>
                                <p className="mt-6 sm:mt-8 md:mt-10 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>

                                <div className="h-6 sm:h-8 md:h-10"></div>

                                <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>

                                <div className="h-6 sm:h-8 md:h-10"></div>

                                <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                                </p>
                            </div>
                        </div>

                        <div className="py-12 sm:py-16 md:py-24 lg:py-32 xl:py-48 px-4 sm:px-6 md:px-8 lg:px-10 rounded-xl">
                            <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-8 sm:mb-12 md:mb-16 lg:mb-20">Tech Stack</h1>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
                                {/* Frontend */}
                                <div className="rounded-lg p-4 sm:p-6 md:p-8 lg:p-10 hover:shadow-xl transition-shadow duration-300">
                                    <h4 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6">Frontend</h4>
                                    <ul className="relative min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[350px]">
                                        {project.techStack?.frontend?.map((tech, index) => (
                                            <li 
                                                key={index}
                                                className="bg-[#2C274C] px-3 sm:px-4 md:px-5 py-3 sm:py-4 md:py-6 rounded-xl sm:rounded-2xl text-xs sm:text-sm md:text-base font-bold absolute transform -translate-x-1/2"
                                                style={{ 
                                                    width: isMobile ? '80%' : tech.width,
                                                    left: isMobile ? '50%' : `${50 + (index * 15)}%`,
                                                    top: isMobile ? `${index * 60}px` : `${index * 80}px`,
                                                    zIndex: project.techStack?.frontend?.length - index
                                                }}
                                            >
                                                {tech.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Backend */}
                                <div className="rounded-lg p-4 sm:p-6 md:p-8 lg:p-10 hover:shadow-xl transition-shadow duration-300">
                                    <h4 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6">Backend</h4>
                                    <ul className="relative min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[350px]">
                                        {project.techStack?.backend?.map((tech, index) => (
                                            <li 
                                                key={index}
                                                className="bg-[#1F382F] px-3 sm:px-4 md:px-5 py-3 sm:py-4 md:py-6 rounded-xl sm:rounded-2xl text-xs sm:text-sm md:text-base font-bold absolute transform -translate-x-1/2"
                                                style={{ 
                                                    width: isMobile ? '80%' : tech.width,
                                                    left: isMobile ? '50%' : `${50 + (index * 15)}%`,
                                                    top: isMobile ? `${index * 60}px` : `${index * 80}px`,
                                                    zIndex: project.techStack?.backend?.length - index
                                                }}
                                            >
                                                {tech.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Tools */}
                                <div className="rounded-lg p-4 sm:p-6 md:p-8 lg:p-10 hover:shadow-xl transition-shadow duration-300 md:col-span-2 lg:col-span-1">
                                    <h4 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6">Tools</h4>
                                    <ul className="relative min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[350px]">
                                        {project.techStack?.tools?.map((tech, index) => (
                                            <li 
                                                key={index}
                                                className="bg-[#223643] px-3 sm:px-4 md:px-5 py-3 sm:py-4 md:py-6 rounded-xl sm:rounded-2xl text-xs sm:text-sm md:text-base font-bold absolute transform -translate-x-1/2"
                                                style={{ 
                                                    width: isMobile ? '80%' : tech.width,
                                                    left: isMobile ? '50%' : `${50 + (index * 15)}%`,
                                                    top: isMobile ? `${index * 60}px` : `${index * 80}px`,
                                                    zIndex: project.techStack?.tools?.length - index
                                                }}
                                            >
                                                {tech.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
            </ReactLenis>
        </div>
    );
};

export default ProjectPageClient;
