"use client";

import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import projectData from "@/constant/projectData";
import { useRouter } from "next/navigation";
import ProjectModal from "@/components/modal/ProjectModal";

import getImageUrl from "@/hook/googleDriveFile";

gsap.registerPlugin(ScrollTrigger);

const Project = () => {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [selectedProject, setSelectedProject] = useState<null | (typeof projectData)[0]>(null);
    const [modalBounds, setModalBounds] = useState<DOMRect | null>(null);
    const [projectIndex, setProjectIndex] = useState<number | null>(null);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            if (cursorRef.current) {
                cursorRef.current.style.left = `${e.clientX}px`;
                cursorRef.current.style.top = `${e.clientY}px`;
            }
        };
        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, []);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            const projectEls = gsap.utils.toArray<HTMLElement>(".project");
            projectEls.forEach((el, index) => {
                const fromX = index % 2 === 0 ? -200 : 200;
                gsap.fromTo(
                    el,
                    { x: fromX, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 90%",
                            end: "top 30%",
                            scrub: true,
                        },
                    }
                );
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const handleProjectClick = (project: typeof projectData[0], index: number, e: React.MouseEvent) => {
        const bounds = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        setModalBounds(bounds);
        setSelectedProject(project);
        setProjectIndex(index);

        setTimeout(() => {
            router.push(`/project/${index}`);
        }, 1000);
    };

    const modalRef = useRef<HTMLDivElement>(null);

    return (
        <section id="project" className="min-h-screen bg-[#F7F3ED] py-20 relative overflow-hidden" ref={containerRef}>
            <div
                ref={cursorRef}
                className={`pointer-events-none fixed z-50 flex flex-col items-center justify-center transition-all duration-200 ${
                    isHovering ? "opacity-100 scale-100" : "opacity-0 scale-0"
                }`}
                style={{ transform: "translate(-50%, -50%)" }}
            >
                <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center">
                    <FaArrowRight
                        className={`text-xl transition-transform duration-300 ${
                            isHovering ? "translate-x-0 opacity-100 rotate-0" : "-translate-x-2 opacity-0 -rotate-45"
                        }`}
                    />
                </div>
                <span className="text-xs mt-1 text-white font-medium">View Project</span>
            </div>

            <div className="px-4 md:px-20">
                <h5 className="font-light text-xl">My Projects</h5>
                <h1 className="leading-[1.1] text-center text-[4rem] md:text-[16rem] opacity-[85%]">Web & App</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-20">
                    {projectData.map((project, i) => (
                        <div
                            key={i}
                            className="project group transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-2 cursor-pointer"
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                            onClick={(e) => handleProjectClick(project, i, e)}
                        >
                            <div className="w-full h-[300px] md:h-[73vh] relative overflow-hidden rounded-xl">
                                <Image
                                    src={getImageUrl(project.img)}
                                    alt="Project thumbnail"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <h4 className="mt-8 font-light text-2xl opacity-75">{project.title}</h4>
                            <ul className="flex gap-10 mt-6 text-xl opacity-45 list-disc mb-10">
                                {project.tags.map((tag, j) => (
                                    <li key={j} className={j === 0 ? "list-none" : ""}>
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {selectedProject && (
                <>
                    <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />
                    <div ref={modalRef}>
                        <ProjectModal 
                            project={selectedProject} 
                            bounds={modalBounds!} 
                            onClose={() => {
                                setSelectedProject(null);
                                setModalBounds(null);
                                setProjectIndex(null);
                            }} 
                        />
                    </div>
                </>
            )}
        </section>
    );
};

export default Project;
