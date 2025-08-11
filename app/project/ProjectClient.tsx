"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaTimes } from "react-icons/fa";
import ReactLenis from "lenis/react";
import { useRouter } from "next/navigation";
import { ProjectData, ProjectImage } from "@/constant/FirebaseData";
import ClientOnly from "@/components/ui/ClientOnly";
import { useSafeMediaQuery } from "@/app/hooks/useSafeMediaQuery";
import durationDays from "@/hook/durationDays";

interface ProjectPageClientProps {
    project: ProjectData & { uid: string };
}

interface ImageInfo {
    src: string;
    isPortrait: boolean;
    aspectRatio: number;
    size?: string;
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

    const [autoPlay, setAutoPlay] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (autoPlay && !isLoading && scrollContainerRef.current && imageInfos.length > 0) {
            autoScrollRef.current = setInterval(() => {
                const container = scrollContainerRef.current;
                if (container) {
                    const scrollAmount = 1;
                    container.scrollLeft += scrollAmount;
                    
                    if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
                        container.scrollLeft = 0;
                    }
                }
            }, 30);
        } else {
            if (autoScrollRef.current) {
                clearInterval(autoScrollRef.current);
            }
        }
    
        return () => {
            if (autoScrollRef.current) {
                clearInterval(autoScrollRef.current);
            }
        };
    }, [autoPlay, isLoading, imageInfos]);
    
    const handleCarouselScroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = container.clientWidth * 0.6;
            
            if (direction === 'left') {
                container.scrollLeft -= scrollAmount;
            } else {
                container.scrollLeft += scrollAmount;
            }
        }
    };
    
    const toggleAutoPlay = () => {
        setAutoPlay(!autoPlay);
    };
    


    const getImageUrl = (img: string | undefined) => {
        if (!img) {
            return '/sample.jpg';
        }
        if (!img.includes("/") && img.length >= 25) {
            const formats = [
                `https://drive.google.com/uc?export=view&id=${img}`,
                `https://drive.google.com/thumbnail?id=${img}&sz=w2048`,
                `https://drive.google.com/thumbnail?id=${img}&sz=w1920`
            ];
            return formats[0];
        }
        return img;
    };

    const getImageInfo = useCallback((src: string): Promise<ImageInfo> => {
        return new Promise((resolve) => {
            const img = new window.Image();
            let finalUrl = getImageUrl(src);
            
            const tryNextFormat = (attempt = 0) => {
                if (!src || !src.includes("/") && src.length < 25) {
                    resolve({
                        src: '/sample.jpg',
                        isPortrait: false,
                        aspectRatio: 16/9
                    });
                    return;
                }

                if (!src.includes("/") && src.length >= 25) {
                    const formats = [
                        `https://drive.google.com/uc?export=view&id=${src}`,
                        `https://drive.google.com/thumbnail?id=${src}&sz=w2048`,
                        `https://drive.google.com/thumbnail?id=${src}&sz=w1920`,
                        `https://drive.google.com/thumbnail?id=${src}&sz=w1600`
                    ];
                    
                    if (attempt < formats.length) {
                        finalUrl = formats[attempt];
                    } else {
                        resolve({
                            src: '/sample.jpg',
                            isPortrait: false,
                            aspectRatio: 16/9
                        });
                        return;
                    }
                }
                
                img.onload = () => {
                    const aspectRatio = img.width / img.height;
                    const isPortrait = aspectRatio < 1;
                    resolve({ src: finalUrl, isPortrait, aspectRatio });
                };
                
                img.onerror = () => {
                    if (!src.includes("/") && src.length >= 25 && attempt < 3) {
                        setTimeout(() => tryNextFormat(attempt + 1), 100);
                    } else {
                        resolve({
                            src: '/sample.jpg',
                            isPortrait: false,
                            aspectRatio: 16/9
                        });
                    }
                };
                
                img.src = finalUrl;
            };
            
            tryNextFormat();
        });
    }, []);

    useEffect(() => {
        const loadImages = async () => {
            if (project.images && Array.isArray(project.images) && project.images.length > 0) {
                const imagePromises = project.images
                    .filter((img: ProjectImage) => img && img.url)
                    .map(async (img: ProjectImage) => {
                        const imageInfo = await getImageInfo(img.url);
                        return {
                            ...imageInfo,
                            size: img.size || 'web'
                        };
                    });
                
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

        const tl = gsap.timeline({ paused: true });

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

        tl.play();

        return () => tl.kill();
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

    const renderTechStack = () => {
        if (!project.tech || !Array.isArray(project.tech) || project.tech.length === 0) {
            return <p className="text-gray-400 text-center">No tech stack information available.</p>;
        }

        const techTypePairs = project.tech
            .filter(techItem => techItem && techItem.tech && typeof techItem.tech === 'string' && techItem.tech.trim())
            .map(techItem => ({
                tech: techItem.tech,
                type: techItem.type || 'tool'
            }));

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

        const renderTechColumn = (title: string, items: { tech: string; type: string }[], bgColor: string) => (
            <div className="space-y-6">
                <h4 className="text-2xl font-light mb-10">{title}</h4>
                {items.map((item, index) => (
                    <div
                        key={`${title.toLowerCase()}-${index}`}
                        className={`px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base md:text-lg font-bold hover:scale-105 transition-transform duration-300 ${getWidthClass(index)} ${getMarginClass(index)}`}
                        style={{
                            backgroundColor: bgColor,
                            marginTop: `${index * 20}px`,
                        }}
                    >
                        {item.tech}
                    </div>
                ))}
            </div>
        );

        return (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6">
                {renderTechColumn('Frontend', groupedTech.frontend, '#2C274C')}
                {renderTechColumn('Backend', groupedTech.backend, '#1F382F')}
                {renderTechColumn('Tools', groupedTech.tool, '#223643')}
            </div>
        );
    };

    return (
        <div ref={modalRef} className="relative w-full z-50 bg-[#0D0E17] text-white">
            <button
                onClick={handleClose}
                className="absolute top-4 left-4 md:top-6 md:left-6 z-60 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
                <FaTimes className="text-white text-lg md:text-xl" />
            </button>

            <ClientOnly>
                <ReactLenis 
                    root 
                    options={{
                        duration: 1.2,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                        smoothWheel: true,
                        wheelMultiplier: 0.8,
                        touchMultiplier: 2,
                        infinite: false,
                    }}
                >
                    <div ref={contentRef} className="w-full scrollbar-hide" style={{ scrollBehavior: 'smooth' }}>
                        <div className="relative h-screen w-full border-[10px #000 solid]">
                            <div ref={imageRef} className="absolute inset-0 z-10">
                                <Image
                                    src={getImageUrl(project.thumbnail)}
                                    alt="Project full image"
                                    fill
                                    className="object-cover w-full h-full"
                                    priority
                                    quality={95}
                                    sizes="100vw"
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                />
                            </div>

                            <div className="relative z-20 flex items-start justify-end h-full">
                                <div className="p-4 md:p-6 max-w-6xl mx-auto md:ml-[33.333333%] mt-20 lg:mt-40">
                                    <h2
                                        ref={titleRef}
                                        className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-[6rem] font-extralight text-center md:text-left leading-tight drop-shadow-lg"
                                    >
                                        {project.title || 'Project Title'}
                                    </h2>
                                </div>
                            </div>
                        </div>

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

                            <div className="mt-16 sm:mt-24 md:mt-32 lg:mt-64 py-16 sm:py-24 md:py-32 lg:py-48 -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-16 xl:-mx-24 2xl:-mx-40">
    {isLoading ? (
        <div className="flex justify-center items-center h-96 sm:h-[32rem] md:h-[40rem] lg:h-[48rem]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
    ) : imageInfos.length > 0 ? (
        <>
            <div className="flex justify-center items-center gap-4 mb-8 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-40">
                <button
                    onClick={() => handleCarouselScroll('left')}
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                
                <button
                    onClick={toggleAutoPlay}
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110"
                >
                    {autoPlay ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6 4h1m4 0h1M7 7h.01M17 7h.01M7 17h.01M17 17h.01" />
                        </svg>
                    )}
                </button>
                
                <button
                    onClick={() => handleCarouselScroll('right')}
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    </button>
                
                <div className="text-sm text-gray-400 ml-4">
                    {imageInfos.length} images
                </div>
            </div>

            <div className="relative">
                <div
                    ref={scrollContainerRef}
                    className="flex gap-5 overflow-x-auto scroll-smooth scrollbar-hide w-full"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                    onMouseEnter={() => setAutoPlay(false)}
                    onMouseLeave={() => setAutoPlay(true)}
                >
                    {imageInfos.map((imageInfo, index) => (
                        <div
                            key={index}
                            className={`relative group overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl flex-shrink-0 h-[80vh] cursor-pointer ${
                                imageInfo.size === 'web' ? 'w-[90vw] sm:w-[40vw] md:w-[60vw]' :
                                imageInfo.size === 'mobile' ? 'w-[40vw] sm:w-[25vw] md:w-[25vw]' :
                                imageInfo.size === 'tablet' ? 'w-[70vw] sm:w-[35vw] md:w-[35vw]' :
                                'w-[90vw] sm:w-[40vw] md:w-[40vw]'
                            }`}
                        >
                            <Image
                                src={imageInfo.src}
                                alt={`Project image ${index + 1}`}
                                fill
                                className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110 rounded-4xl"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 70vw"
                                quality={95}
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                            />
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                                <div className="flex justify-between items-start">
                                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium capitalize">
                                        {imageInfo.size || 'web'}
                                    </span>
                                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                                        {index + 1}/{imageInfos.length}
                                    </span>
                                </div>
                                
                                <div className="text-white">
                                    <p className="text-sm font-medium capitalize mb-1">
                                        {imageInfo.size || 'web'} View
                                    </p>
                                    <p className="text-xs opacity-80">
                                        {imageInfo.isPortrait ? 'Portrait' : 'Landscape'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {imageInfos.map((imageInfo, index) => (
                        <div
                            key={`duplicate-${index}`}
                            className={`relative group overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl flex-shrink-0 h-[80vh] cursor-pointer ${
                                imageInfo.size === 'web' ? 'w-[90vw] sm:w-[40vw] md:w-[60vw]' :
                                imageInfo.size === 'mobile' ? 'w-[40vw] sm:w-[25vw] md:w-[25vw]' :
                                imageInfo.size === 'tablet' ? 'w-[70vw] sm:w-[35vw] md:w-[35vw]' :
                                'w-[90vw] sm:w-[40vw] md:w-[40vw]'
                            }`}
                        >
                            <Image
                                src={imageInfo.src}
                                alt={`Project image ${index + 1} (loop)`}
                                fill
                                className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 70vw"
                                quality={95}
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                            />
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                                <div className="flex justify-between items-start">
                                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium capitalize">
                                        {imageInfo.size || 'web'}
                                    </span>
                                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                                        {index + 1}/{imageInfos.length}
                                    </span>
                                </div>
                                
                                <div className="text-white">
                                    <p className="text-sm font-medium capitalize mb-1">
                                        {imageInfo.size || 'web'} View
                                    </p>
                                    <p className="text-xs opacity-80">
                                        {imageInfo.isPortrait ? 'Portrait' : 'Landscape'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    ) : (
        <div className="text-center text-gray-400 py-32 sm:py-40 md:py-48 lg:py-56">
            <p className="text-lg">No project images available</p>
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
                                {renderTechStack()}
                            </div>
                        </div>
                    </div>
                </ReactLenis>
            </ClientOnly>
            <style jsx>{`
    .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }
`}</style>
        </div>
    );
};

export default ProjectPageClient;
