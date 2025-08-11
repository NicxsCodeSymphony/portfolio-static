"use client"

import Image from "next/image";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import {useRef, useState} from "react";
import imageGoogleDrive from "@/hook/imageGoogleDrive";
import { useRouter } from "next/navigation";
import ProjectModal from "@/components/modal/ProjectModal";
import { useProjectData } from "@/app/hooks/useProject";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
    const {data: projectData, loading, error} = useProjectData()

    const containerRef = useRef<HTMLDivElement>(null);
    const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [selectedProject, setSelectedProject] = useState<null | (typeof projectData)[0]>(null);
    const [modalBounds, setModalBounds] = useState<DOMRect | null>(null);
    const [projectIndex, setProjectIndex] = useState<number | null>(null);
    const router = useRouter();

    const modalRef = useRef<HTMLDivElement>(null);

    const featuredProjects = projectData?.filter(project => project.featured) || [];

    console.log(projectData)

    useGSAP(() => {
        if (!containerRef.current || featuredProjects.length === 0) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                scrub: 1,
                pin: true,
                start: "top top",
                end: `+=${(featuredProjects.length - 1) * 100}%`
            }
        });

        gsap.set(projectRefs.current[0], { y: 0, opacity: 1 });
        featuredProjects.forEach((_, index) => {
            if (index > 0) {
                gsap.set(projectRefs.current[index], { y: "100%", opacity: 1 });
            }
        });

        const segmentDuration = 100 / featuredProjects.length;
        
        for (let i = 0; i < featuredProjects.length - 1; i++) {
            tl.to(projectRefs.current[i], {
                y: "-100%",
                duration: segmentDuration,
                ease: "power2.inOut"
            }, i * segmentDuration)
            .to(projectRefs.current[i + 1], {
                y: 0,
                duration: segmentDuration,
                ease: "power2.inOut"
            }, i * segmentDuration);
        }

    }, [featuredProjects]);

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
            router.push(`/project/${project.uid}`);
        }, 1000);
    };

    if (featuredProjects.length === 0) {
        return (
            <section className="h-screen relative overflow-hidden flex items-center justify-center" id="projects" ref={containerRef}>
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-8 text-center">
                        <h2 className="text-2xl font-light text-white mb-4">No Featured Projects</h2>
                        <p className="text-white/70">Check back later for featured projects.</p>
                    </CardContent>
                </Card>
            </section>
        );
    }

    return (
        <section className="h-screen relative overflow-hidden" id="projects" ref={containerRef}>
            {featuredProjects.map((project, index) => (
                <Card
                    key={index}
                    ref={(el) => {
                        projectRefs.current[index] = el;
                    }}
                    className="absolute inset-0 bg-transparent border-0 shadow-none cursor-pointer group"
                    onClick={(e) => handleProjectClick(project, index, e)}
                >
                    <CardContent className="p-0 h-full">
                        <div className="h-full w-full relative">
                            <Image
                                src={imageGoogleDrive(project.thumbnail)}
                                alt={project.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 z-10 group-hover:bg-black/40 transition-colors duration-300" />
                        </div>

                        <div className="absolute inset-0 z-20 flex items-center px-4 sm:px-6 md:px-8 lg:px-12 w-full md:w-3/4 lg:w-1/2">
                            <div className="space-y-2 sm:space-y-3 md:space-y-4">
                                <Badge variant="secondary" className="mb-2 bg-white/20 text-white border-white/30">
                                    Featured Project
                                </Badge>
                                <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extralight leading-tight sm:leading-relaxed md:leading-loose lg:leading-20">
                                    {project.title}
                                </h1>
                                <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-sm md:max-w-md">
                                    Project {index + 1} of {featuredProjects.length}
                                </p>
                                
                                <Button 
                                    variant="outline" 
                                    className="mt-4 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50"
                                >
                                    View Details
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
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