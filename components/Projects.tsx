"use client"

import Image from "next/image";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import {useRef, useState} from "react";
import projectData from "@/constant/projectData";
import imageGoogleDrive from "@/hook/imageGoogleDrive";
import { useRouter } from "next/navigation";
import ProjectModal from "@/components/modal/ProjectModal";


gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [selectedProject, setSelectedProject] = useState<null | (typeof projectData)[0]>(null);
    const [modalBounds, setModalBounds] = useState<DOMRect | null>(null);
    const [projectIndex, setProjectIndex] = useState<number | null>(null);
    const router = useRouter();

    const modalRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                scrub: 1,
                pin: true,
                start: "top top",
                end: "+=400%"
            }
        });

        gsap.set(projectRefs.current[0], { y: 0, opacity: 1 });
        projectData.forEach((_, index) => {
            if (index > 0) {
                gsap.set(projectRefs.current[index], { y: "100%", opacity: 1 });
            }
        });

        const segmentDuration = 33.33; 
        
        tl.to(projectRefs.current[0], {
            y: "-100%",
            duration: segmentDuration,
            ease: "power2.inOut"
        }, 0)
        .to(projectRefs.current[1], {
            y: 0,
            duration: segmentDuration,
            ease: "power2.inOut"
        }, 0);

        // Project 2 to Project 3 transition
        tl.to(projectRefs.current[1], {
            y: "-100%",
            duration: segmentDuration,
            ease: "power2.inOut"
        }, segmentDuration)
        .to(projectRefs.current[2], {
            y: 0,
            duration: segmentDuration,
            ease: "power2.inOut"
        }, segmentDuration);

    }, []);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            const projectEls = gsap.utils.toArray<HTMLElement>("#projects");
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
    })

    const handleProjectClick = (project: typeof projectData[0], index: number, e: React.MouseEvent) => {
        const bounds = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        setModalBounds(bounds);
        setSelectedProject(project);
        setProjectIndex(index);

        setTimeout(() => {
            router.push(`/project/${index}`);
        }, 1000);
    };

    return (
        <section className="h-screen relative overflow-hidden" id="projects" ref={containerRef}>
            {projectData.map((project, index) => (
                <div
                    key={index}
                    ref={(el) => {
                        projectRefs.current[index] = el;
                    }}
                    className="absolute inset-0"
                    onClick={(e) => handleProjectClick(project,index, e)}
                >
                    {/* Background Image */}
                    <div className="h-full w-full relative">
                        <Image
                            src={imageGoogleDrive(project.image)}
                            alt={project.title}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 z-10" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 z-20 flex items-center px-4 sm:px-6 md:px-8 lg:px-12 w-full md:w-3/4 lg:w-1/2">
                        <div className="space-y-2 sm:space-y-3 md:space-y-4">
                            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extralight leading-tight sm:leading-relaxed md:leading-loose lg:leading-20">
                                {project.title}
                            </h1>
                            <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-sm md:max-w-md">
                                Project {index + 1} of {projectData.length}
                            </p>
                        </div>
                    </div>
                </div>
            ))}

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

export default Projects;