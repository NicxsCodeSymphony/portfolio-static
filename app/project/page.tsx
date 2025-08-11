"use client";

import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import ProjectModal from "@/components/modal/ProjectModal";
import Navbar from "@/components/Navbar";
import { useProjectData } from "@/app/hooks/useProject";    
import { ProjectData } from "@/constant/FirebaseData";
import imageGoogleDrive from "@/hook/imageGoogleDrive";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

gsap.registerPlugin(ScrollTrigger);

const Project = () => {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
    const [modalBounds, setModalBounds] = useState<DOMRect | null>(null);

    const {data} = useProjectData();

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
        gsap.set(overlayRef.current, { 
            x: 0, 
            scale: 1,
            rotation: 0,
            opacity: 1 
        });

        const tl = gsap.timeline({ ease: "power3.out" });
        
        tl.to(overlayRef.current, {
            scale: 1.2,
            rotation: 5,
            duration: 0.4,
            ease: "power2.in"
        })
        .to(overlayRef.current, {
            scale: 0.8,
            rotation: -3,
            duration: 0.3,
            ease: "power2.out"
        })
        .to(overlayRef.current, {
            scale: 0,
            rotation: 0,
            duration: 0.5,
            ease: "back.in(1.7)",
            onComplete: () => {
                gsap.set(overlayRef.current, { x: "-100%" });
            }
        });
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline({ delay: 1.2 });

        tl.from(contentRef.current, {
            opacity: 0,
            y: 100,
            duration: 1,
            ease: "power3.out",
        });

        tl.from(
            ".project",
            {
                opacity: 0,
                y: 50,
                stagger: 0.15,
                duration: 0.8,
                ease: "power3.out",
            },
            "-=0.5"
        );
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

    const handleProjectClick = (
        project: ProjectData,
        uid: string,
        e: React.MouseEvent
    ) => {
        const bounds = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        setModalBounds(bounds);
        setSelectedProject(project);

        setTimeout(() => {
            router.push(`/project/${uid}`);
        }, 1000);
    };

    const modalRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <div
                ref={overlayRef}
                className="fixed top-0 left-0 w-full h-full z-[9999]"
                style={{ 
                    backgroundColor: "#E8F4FD", 
                    transformOrigin: "center center"
                }}
            ></div>

            <section
                id="project"
                className="min-h-screen bg-[#F7F3ED] py-10 2xl:py-40 relative overflow-hidden"
                ref={containerRef}
            >
                <Navbar />
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
                                isHovering
                                    ? "translate-x-0 opacity-100 rotate-0"
                                    : "-translate-x-2 opacity-0 -rotate-45"
                            }`}
                        />
                    </div>
                    <span className="text-xs mt-1 text-white font-medium">View Project</span>
                </div>

                <div className="px-4 md:px-20" ref={contentRef}>
                    <Badge variant="outline" className="font-light text-xl border-0 p-0 h-auto mb-2">
                        My Projects
                    </Badge>
                    <h1 className="leading-[1.1] text-center text-[4rem] md:text-[16rem] opacity-[85%]">
                        Web & App
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-20">
                        {data.map((project, i) => (
                            <Card
                                key={i}
                                className="project group transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-2 cursor-pointer bg-transparent border-0 shadow-none"
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                                onClick={(e) => handleProjectClick(project, project.uid, e)}
                            >
                                <CardContent className="p-0">
                                    <div className="w-full h-[300px] md:h-[73vh] relative overflow-hidden rounded-xl">
                                        {project.thumbnail ? (
                                            <Image
                                                src={imageGoogleDrive(project.thumbnail)}
                                                alt="Project thumbnail"
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                                <span className="text-gray-500">No image available</span>
                                            </div>
                                        )}
                                    </div>
                                    <CardHeader className="px-0 pt-8">
                                        <h4 className="font-light text-2xl opacity-75">{project.title}</h4>
                                    </CardHeader>
                                    <div className="px-0 pb-10">
                                        <ul className="flex gap-10 mt-6 text-xl opacity-45 list-disc">
                                            {project.type && Array.isArray(project.type) && project.type.map((tag: string, j: number) => (
                                                <li key={j} className={j === 0 ? "list-none" : ""}>
                                                    {tag}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
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
                                }}
                            />
                        </div>
                    </>
                )}
            </section>
        </>
    );
};

export default Project;
