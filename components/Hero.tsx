"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import TechMarquee from "./ui/marquee";
import { useRef, useState, useMemo } from "react";
import VideoFrame from "@/components/ui/youtube";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {useHeroData} from "@/app/hooks/useHero";
import getImageUrl from "@/hook/imageGoogleDrive";

gsap.registerPlugin(ScrollTrigger);

interface Award {
    award: string;
    image?: string;
    url?: string;
}

const Hero = () => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const videoFrameRef = useRef<HTMLDivElement>(null);
    const scrollMessageRef = useRef<HTMLDivElement>(null);
    const awardsContainerRef = useRef<HTMLDivElement>(null);

    // Generate static grid positions for awards (left and right sides only)
    const getGridPosition = (index: number, totalAwards: number) => {
        // Define grid parameters
        const maxColumns = 2; // 2 columns: left and right sides
        const rowHeight = 20; // Height percentage between rows
        const leftSideStart = 8; // Left side starts at 8% from left
        const rightSideStart = 75; // Right side starts at 75% from left
        const columnWidth = 15; // Width percentage for each side
        
        // Calculate grid position
        const row = Math.floor(index / maxColumns);
        const column = index % maxColumns;
        
        // Determine if this award goes on left or right side
        const isLeftSide = column === 0;
        
        // Calculate position
        const top = 15 + (row * rowHeight); // Start from 15% from top
        const left = isLeftSide ? leftSideStart : rightSideStart;
        
        // Add some variation to make it look more natural
        const topVariation = (Math.random() - 0.5) * 6; // ±3% variation
        const leftVariation = (Math.random() - 0.5) * 4; // ±2% variation
        
        // Ensure awards stay on their respective sides
        const finalLeft = isLeftSide 
            ? Math.max(5, Math.min(25, left + leftVariation)) // Left side: 5-25%
            : Math.max(70, Math.min(90, left + leftVariation)); // Right side: 70-90%
        
        return {
            top: Math.max(10, Math.min(75, top + topVariation)), // Keep within 10-75% bounds
            left: finalLeft,
            animationDelay: index * 0.2, // Staggered animation
            scale: 0.9 + (Math.random() * 0.2) // Scale between 0.9 and 1.1
        };
    };

    const {data, loading, error} = useHeroData()
    const heroData = data[0]

    // Generate non-overlapping award positions
    const awardPositions = useMemo(() => {
        if (!heroData?.awards) return [];
        
        const positions: Array<{top: number, left: number, animationDelay: number, scale: number}> = [];
        const awards = Object.values(heroData.awards as Record<string, Award>);
        
        awards.forEach((award, index) => {
            const position = getGridPosition(index, awards.length);
            positions.push(position);
        });
        
        return positions;
    }, [heroData?.awards]);

    const awardColors = [
        'bg-gradient-to-br from-blue-500/30 to-blue-600/40',
        'bg-gradient-to-br from-purple-500/30 to-purple-600/40',
        'bg-gradient-to-br from-green-500/30 to-green-600/40',
        'bg-gradient-to-br from-pink-500/30 to-pink-600/40',
        'bg-gradient-to-br from-yellow-500/30 to-yellow-600/40',
        'bg-gradient-to-br from-orange-500/30 to-orange-600/40',
        'bg-gradient-to-br from-indigo-500/30 to-indigo-600/40',
        'bg-gradient-to-br from-red-500/30 to-red-600/40',
        'bg-gradient-to-br from-teal-500/30 to-teal-600/40'
    ];

    useGSAP(() => {
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

        // Animate awards entrance
        gsap.fromTo(
            ".award-item",
            { 
                opacity: 0, 
                scale: 0, 
                rotation: -180,
                y: 50 
            },
            {
                opacity: 1,
                scale: 1,
                rotation: 0,
                y: 0,
                duration: 1.5,
                ease: "elastic.out(1, 0.3)",
                stagger: 0.2,
                delay: 1.5,
            }
        );

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
            .to(
                ".award-item",
                { opacity: 0, scale: 0.5, y: -100, rotation: 180, ease: "power2.inOut", duration: 1.5 },
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

        // Add floating animation to awards
        gsap.to(".award-item", {
            y: "random(-15, 15)",
            rotation: "random(-5, 5)",
            duration: "random(3, 6)",
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            stagger: {
                amount: 2,
                from: "random"
            }
        });
    }, []);

    return (
        <>
            <div
                className="absolute top-0 left-0 w-full h-full z-40 bg-black"
                ref={overlayRef}
                style={{ transform: "scaleY(1)", transformOrigin: "top center" }}
            ></div>

            <section className="wrapper relative">
                <div className="relative w-full h-screen z-20">
                    <Image src="/sample.jpg" alt="hero" fill className="object-cover yeah" />

                    {/* Enhanced Background Elements */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-20 left-20 w-16 h-16 bg-blue-400/20 rounded-full opacity-60 animate-float-slow backdrop-blur-sm"></div>
                        <div className="absolute top-40 right-32 w-12 h-12 bg-purple-400/20 rounded-full opacity-50 animate-float-medium backdrop-blur-sm"></div>
                        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-green-400/20 rounded-full opacity-40 animate-float-fast backdrop-blur-sm"></div>
                        <div className="absolute bottom-20 right-20 w-8 h-8 bg-pink-400/20 rounded-full opacity-70 animate-float-slow backdrop-blur-sm"></div>
                        <div className="absolute top-1/2 left-10 w-14 h-14 bg-yellow-400/20 rounded-full opacity-50 animate-float-medium backdrop-blur-sm"></div>
                        <div className="absolute top-1/3 right-10 w-10 h-10 bg-orange-400/20 rounded-full opacity-60 animate-float-fast backdrop-blur-sm"></div>
                        
                        {/* Sparkles */}
                        <div className="absolute top-1/4 left-1/3 w-6 h-6 bg-white/30 transform rotate-45 opacity-40 animate-pulse"></div>
                        <div className="absolute bottom-1/3 right-1/4 w-8 h-8 bg-white/30 rounded-lg opacity-50 animate-pulse delay-1000"></div>
                        <div className="absolute top-2/3 left-1/2 w-4 h-4 bg-white/30 transform rotate-12 opacity-60 animate-pulse delay-500"></div>
                    </div>

                    <div ref={awardsContainerRef} className="absolute inset-0 z-30 pointer-events-none">
                        {heroData?.awards && awardPositions.map((position, index) => {
                            const award = Object.values(heroData.awards as Record<string, Award>)[index];
                            const randomColor = awardColors[Math.floor(Math.random() * awardColors.length)];
                            
                            return (
                                <div
                                    key={index}
                                    className="award-item absolute pointer-events-auto cursor-pointer transition-all duration-300 hover:z-50 group"
                                    style={{
                                        top: `${position.top}%`,
                                        left: `${position.left}%`,
                                        animationDelay: `${position.animationDelay}s`,
                                        transform: `scale(${position.scale})`
                                    }}
                                    onClick={() => award.url && window.open(award.url, '_blank')}
                                    onMouseEnter={(e) => {
                                        gsap.to(e.currentTarget, {
                                            scale: position.scale * 1.2,
                                            rotation: 5,
                                            duration: 0.3,
                                            ease: "back.out(1.7)"
                                        });
                                    }}
                                    onMouseLeave={(e) => {
                                        gsap.to(e.currentTarget, {
                                            scale: position.scale,
                                            rotation: 0,
                                            duration: 0.3,
                                            ease: "back.out(1.7)"
                                        });
                                    }}
                                >
                                    <div className="flex flex-col items-center gap-3 relative">
                                        {/* Glow effect */}
                                        <div className="absolute inset-0 bg-white/10 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        
                                                                                 {award.image ? (
                                             <div className="relative">
                                                 <div className="w-24 h-24 rounded-full overflow-hidden relative z-10 ">
                                                     <Image
                                                         src={getImageUrl(award.image)}
                                                         alt={award.award}
                                                         width={64}
                                                         height={64}
                                                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                        placeholder="blur"
                                                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                                        />
                                                 </div>
                                                 {/* Rotating ring */}
                                                 <div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-dashed animate-spin-slow"></div>
                                             </div>
                                         ) : (
                                            <div className="relative group">
                                            <div className="w-32 h-32 flex flex-col items-center justify-center relative z-10  transition-all duration-300 group-hover:scale-110 ">
                                              {/* Trophy Icon in Circle */}
                                              <div className="w-20 h-20 flex items-center justify-center text-5xl mb-3">
                                                🏆
                                              </div>
                                          
                                              {/* Award Name */}
                                              <div className=" text-sm font-bold text-center leading-tight px-2">
                                                {award.award}
                                              </div>
                                            </div>
                                          
                                            {/* Glow effect on hover */}
                                            <div className="absolute inset-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                          </div>
                                         )}
                                        
                                                                                 {award.image && (
                                             <div className="relative">
                                                 <div className="absolute inset-0  rounded-xl blur-sm scale-110"></div>
                                                 <span className={`relative  text-sm font-semibold text-center px-4 py-2 rounded-xl max-w-40 shadow-2xl border group-hover:border-white/40 transition-all duration-300 ${randomColor}`}>
                                                     {award.award}
                                                 </span>
                                             </div>
                                         )}

                                        {/* Hover tooltip */}
                                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                                            <div className="bg-white text-black text-xs px-3 py-1 rounded-lg shadow-lg whitespace-nowrap">
                                                {award.url ? 'Click to view' : (award.image ? 'Achievement unlocked!' : 'Award earned!')}
                                                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div
                        ref={scrollMessageRef}
                        className="scroll-message absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-sm sm:text-base bg-black/60 px-6 py-3 rounded-full backdrop-blur-md font-medium z-30 border  shadow-xl"
                    >
                        <span className="flex items-center gap-2">
                            <span className="animate-bounce">↓</span>
                            Scroll to explore
                            <span className="animate-bounce delay-100">↓</span>
                        </span>
                    </div>

                    <Card className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4 sm:px-6 md:px-8 lg:px-0 w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[45%] z-10 content bg-transparent border-none shadow-none">
                        <CardContent className="p-0 flex flex-col items-center justify-center gap-6">
                            <div className="relative">
                                <div className="absolute inset-0  rounded-lg blur-sm scale-110"></div>
                                <p className="relative mb-2 text-base sm:text-lg px-4 py-2 rounded-lg ">{heroData?.subtitle}</p>
                            </div>
                            
                            <div className="relative">
                                <div className="absolute inset-0  rounded-xl blur-sm scale-105"></div>
                                <h1
                                    className="relative text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl leading-tight font-bold px-6 py-4 rounded-xl"
                                    style={{ fontFamily: "Proxima Nova Regular, sans-serif" }}
                                >
                                    I&apos;m {heroData?.personal[0]?.name} <br /> 
                                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                        {heroData?.personal[0]?.position}
                                    </span> based in Cebu, Philippines
                                </h1>
                            </div>

                            <div className="mt-2 sm:mt-4 md:mt-6 w-4/5">
                                <div className="mb-8 sm:mt-6 md:mt-8 flex justify-center">
                                    <Badge variant="secondary" className="text-xs uppercase tracking-widest bg-black/40 text-white border-white/30 backdrop-blur-md shadow-lg">
                                        Tech Stacks
                                    </Badge>
                                </div>
                                <TechMarquee />
                            </div>

                            <Separator className="w-24 bg-white/30 shadow-lg" />

                            <div className="mt-24 xl:mt-72 2xl:mt-72 flex flex-wrap justify-center gap-4">
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 border  backdrop-blur-md"
                                    onClick={() => window.open(`https://drive.google.com/file/d/${heroData?.cv}`)}
                                >
                                    Download CV
                                </Button>
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    asChild
                                    className="bg-gradient-to-r from-neutral-700 to-neutral-800 hover:from-neutral-800 hover:to-neutral-900 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 border border-white/20 backdrop-blur-md"
                                >
                                    <Link href="/project">
                                        View Projects
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
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

            <style jsx>{`
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                
                @keyframes float-medium {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(-3deg); }
                }
                
                @keyframes float-fast {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-10px) rotate(-10px); }
                }

                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                .animate-float-slow {
                    animation: float-slow 6s ease-in-out infinite;
                }
                
                .animate-float-medium {
                    animation: float-medium 4s ease-in-out infinite;
                }
                
                .animate-float-fast {
                    animation: float-fast 3s ease-in-out infinite;
                }

                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }

                .border-3 {
                    border-width: 3px;
                }
                
                /* Custom scrollbar for webkit browsers */
                ::-webkit-scrollbar {
                    width: 8px;
                }
                
                ::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.1);
                }
                
                ::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 4px;
                }
                
                ::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.5);
                }
            `}</style>
        </>
    );
};

export default Hero;