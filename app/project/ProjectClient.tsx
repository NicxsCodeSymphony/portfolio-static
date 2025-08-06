"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaTimes } from "react-icons/fa";
import ReactLenis from "lenis/react";
import { useRouter } from "next/navigation";
import { ProjectData } from "@/constant/FirebaseData";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ClientOnly from "@/components/ui/ClientOnly";
import { useSafeMediaQuery } from "@/app/hooks/useSafeMediaQuery";
import durationDays from "@/hook/durationDays";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ProjectPageClientProps {
    project: ProjectData & { uid: string };
}

interface ImageInfo {
    src: string;
    isPortrait: boolean;
    aspectRatio: number;
}

const ProjectPageClient = ({ project }: ProjectPageClientProps) => {
    const router = useRouter();
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    const isMobile = useSafeMediaQuery('(max-width: 767px)');
    const isLaptop = useSafeMediaQuery('(min-width: 768px) and (max-width: 1280px)');

    const [distance, setDistance] = useState(0);
    const [imageInfos, setImageInfos] = useState<ImageInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Function to check image orientation and get aspect ratio
    const getImageInfo = (src: string): Promise<ImageInfo> => {
        return new Promise((resolve) => {
            const img = new window.Image();
            img.onload = () => {
                const aspectRatio = img.width / img.height;
                const isPortrait = aspectRatio < 1;
                resolve({
                    src,
                    isPortrait,
                    aspectRatio
                });
            };
            img.onerror = () => {
                // Fallback for failed images
                resolve({
                    src: '/sample.jpg',
                    isPortrait: false,
                    aspectRatio: 16/9
                });
            };
            img.src = getImageUrl(src);
        });
    };

    // Load and analyze all images
    useEffect(() => {
        const loadImages = async () => {
            if (project.images && Array.isArray(project.images) && project.images.length > 0) {
                const imagePromises = project.images
                    .filter(img => img && typeof img === 'string') 
                    .map(getImageInfo);
                const infos = await Promise.all(imagePromises);
                setImageInfos(infos);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        };
        
        loadImages();
    }, [project, getImageInfo]);

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
                    router.push("/project");
                    setTimeout(() => {
                        const element = document.getElementById("project");
                        if (element) element.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                },
            });
        }
    };

    const getImageUrl = (img: string | undefined) => {
        if (!img) {
            return '/sample.jpg'; // Fallback image
        }
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
                <FaTimes className="text-white text-lg md:text-xl" />
            </button>

            {/* Smooth scrolling */}
            <ClientOnly>
                <ReactLenis root>
                    <div ref={contentRef} className="w-full scrollbar-hide">

                    {/* Fullscreen Image with Title */}
                    <div className="relative h-screen w-full border-[10px #000 solid]">
                        <div ref={imageRef} className="absolute inset-0 z-10">
                            <Image
                                src={getImageUrl(project.thumbnail)}
                                alt="Project full image"
                                fill
                                className="object-cover w-full h-full"
                                priority
                            />
                        </div>

                        {/* Title Overlay */}
                        <div className="relative z-20 flex items-start justify-end h-full">
                            <div className="p-4 md:p-6 max-w-6xl mx-auto md:ml-[33.333333%] mt-20 lg:mt-40">
                                <h2
                                    ref={titleRef}
                                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-[6rem] font-extralight text-center md:text-left leading-tight  drop-shadow-lg"
                                >
                                    {project.title || 'Project Title'}
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
                                    <p className="text-xs sm:text-sm md:text-base">{project.client || 'N/A'}</p>
                                </div>

                                <div>
                                    <h4 className="text-sm sm:text-base md:text-lg font-semibold mb-2">Role</h4>
                                    <p className="text-xs sm:text-sm md:text-base">{project.role || 'N/A'}</p>
                                </div>

                                <div>
                                    <h4 className="text-sm sm:text-base md:text-lg font-semibold mb-2">Duration</h4>
                                    <p className="text-xs sm:text-sm md:text-base">{durationDays(project?.start_date, project?.end_date)}</p>
                                </div>
                            </div>

                            <div className="pt-1 text-sm sm:text-base md:text-lg lg:text-xl font-light w-full">
                                <p className="text-justify lg:pr-36 leading-relaxed">{project.subtitle || 'No description available.'}</p>
                            </div>
                        </div>

                        {/* Dynamic Image Gallery with Swiper */}
                        <div className="mt-12 sm:mt-16 md:mt-24 lg:mt-48">
                            {!isLoading && project.images && Array.isArray(project.images) && project.images.length > 0 && imageInfos.length > 0 && (
                                <ClientOnly>
                                    <Swiper
                                    modules={[Navigation, Pagination, Autoplay]}
                                    spaceBetween={20}
                                    slidesPerView={1}
                                    navigation={true}
                                    pagination={{ clickable: true }}
                                    autoplay={{
                                        delay: 5000,
                                        disableOnInteraction: false,
                                    }}
                                    breakpoints={{
                                        640: {
                                            slidesPerView: 2,
                                            spaceBetween: 30,
                                        },
                                        1024: {
                                            slidesPerView: 3,
                                            spaceBetween: 40,
                                        },
                                    }}
                                    className="project-swiper"
                                >
                                    {imageInfos.map((imageInfo, index) => (
                                        <SwiperSlide key={index}>
                                            <div 
                                                className={`relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 ${
                                                    imageInfo.isPortrait 
                                                        ? 'h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh]' 
                                                        : 'h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh]'
                                                }`}
                                                style={{
                                                    width: imageInfo.isPortrait 
                                                        ? 'auto' 
                                                        : `${Math.min(100, Math.max(60, imageInfo.aspectRatio * 100))}%`
                                                }}
                                            >
                                                <Image
                                                    src={getImageUrl(imageInfo.src)}
                                                    alt={`Project image ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                />
                                                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                                                        <span className="text-sm font-medium text-gray-800">
                                                            {imageInfo.isPortrait ? 'Portrait' : 'Landscape'} View
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                    </Swiper>
                                </ClientOnly>
                            )}
                            
                            {/* Loading state */}
                            {isLoading && (
                                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-10">
                                    <div className="w-full border h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[80vh] animate-pulse bg-gray-300"></div>
                                    <div className="w-full border h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[80vh] animate-pulse bg-gray-300"></div>
                                    <div className="w-full border h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[80vh] animate-pulse bg-gray-300"></div>
                                </div>
                            )}
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

                        <div
                            className="py-12 sm:py-16 md:py-24 lg:py-32 xl:py-48 px-4 sm:px-6 md:px-8 lg:px-10 rounded-xl mx-auto"
                            style={{ width: '80%' }}
                        >
                            <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-8 sm:mb-12 md:mb-16 lg:mb-20">
                                Tech Stack
                            </h1>

                            {project.tech && Array.isArray(project.tech) && project.tech.length > 0 ? (() => {
                                // Create pairs of tech and type, filtering out empty values
                                const techTypePairs = project.tech
                                    .map((techItem, index) => ({
                                        tech: techItem,
                                        type: project.type?.[index] || 'tool' // fallback to tool if type is missing
                                    }))
                                    .filter(pair => pair.tech && pair.tech.trim());

                                const groupedTech = {
                                    frontend: techTypePairs.filter(item => item.type === 'frontend'),
                                    backend: techTypePairs.filter(item => item.type === 'backend'),
                                    tool: techTypePairs.filter(item => item.type === 'tool'),
                                };

                                const getWidthClass = (index: number) => {
                                    const widths = ['w-2/5', 'w-1/2', 'w-3/5'];
                                    return index === 0 ? 'w-2/5' : widths[Math.floor(Math.random() * widths.length)];
                                };

                                const getMarginClass = (index: number) => {
                                    if (index === 0) return 'ml-0';
                                    const margins = ['ml-4', 'ml-8', 'mr-4', 'mr-8'];
                                    return margins[Math.floor(Math.random() * margins.length)];
                                };

                                return (
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6">
                                        {/* Frontend Column */}
                                        <div className="space-y-6">
                                            <h4 className="text-2xl font-light mb-10">Frontend</h4>
                                            {groupedTech.frontend.map((item, index) => (
                                                <div
                                                    key={`frontend-${index}`}
                                                    className={`px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base md:text-lg font-bold hover:scale-105 transition-transform duration-300 ${getWidthClass(index)} ${getMarginClass(index)}`}
                                                    style={{
                                                        backgroundColor: '#2C274C',
                                                        marginTop: `${index * 20}px`,
                                                    }}
                                                >
                                                    {item.tech}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Backend Column */}
                                        <div className="space-y-6">
                                            <h4 className="text-2xl font-light mb-10">Backend</h4>
                                            {groupedTech.backend.map((item, index) => (
                                                <div
                                                    key={`backend-${index}`}
                                                    className={`px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base md:text-lg font-bold hover:scale-105 transition-transform duration-300 ${getWidthClass(index)} ${getMarginClass(index)}`}
                                                    style={{
                                                        backgroundColor: '#1F382F',
                                                        marginTop: `${index * 20}px`,
                                                    }}
                                                >
                                                    {item.tech}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Tools Column */}
                                        <div className="space-y-6">
                                            <h4 className="text-2xl font-light mb-10">Tools</h4>
                                            {groupedTech.tool.map((item, index) => (
                                                <div
                                                    key={`tool-${index}`}
                                                    className={`px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base md:text-lg font-bold hover:scale-105 transition-transform duration-300 ${getWidthClass(index)} ${getMarginClass(index)}`}
                                                    style={{
                                                        backgroundColor: '#223643',
                                                        marginTop: `${index * 20}px`,
                                                    }}
                                                >
                                                    {item.tech}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })() : (
                                <p className="text-gray-400 text-center">No tech stack information available.</p>
                            )}
                        </div>
                    </div>
                    <div>
                    </div>
                                    </div>
                </ReactLenis>
            </ClientOnly>
        </div>
    );
};

export default ProjectPageClient;
