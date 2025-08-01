"use client"

import StarsBg from "@/constants/stars";
import "../styles/Hero.css"
import {useRef} from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";

const Hero = () => {

    const titleRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const foldRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Responsive breakpoints
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
    const isDesktop = useMediaQuery({ minWidth: 1024 });
    const isLargeDesktop = useMediaQuery({ minWidth: 1440 });

    useGSAP(() => {
        const tl = gsap.timeline({delay: 0.3});

        tl.fromTo(titleRef.current,
            { y: 80, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }
        )
        .fromTo(subtitleRef.current,
            { y: 40, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
            "-=0.8"
        )
        .fromTo(buttonsRef.current,
            { y: 20, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
            "-=0.6"
        );

        gsap.set(containerRef.current, { opacity: 1 });

        const titleElement = titleRef.current;
        if (titleElement) {
            titleElement.addEventListener('mouseenter', () => {
                gsap.to(titleElement, { scale: 1.02, duration: 0.3 });
            });
            
            titleElement.addEventListener('mouseleave', () => {
                gsap.to(titleElement, { scale: 1, duration: 0.3 });
            });
        }

        const buttons = buttonsRef.current?.querySelectorAll('button');
        if (buttons) {
            buttons.forEach((button: Element) => {
                button.addEventListener('mouseenter', () => {
                    gsap.to(button, { 
                        scale: 1.05, 
                        y: -3, 
                        duration: 0.3,
                        boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)"
                    });
                });
                
                button.addEventListener('mouseleave', () => {
                    gsap.to(button, { 
                        scale: 1, 
                        y: 0, 
                        duration: 0.3,
                        boxShadow: "0 0 0 rgba(255, 255, 255, 0)"
                    });
                });
            });
        }

        return () => {
            tl.kill();
            if (titleElement) {
                titleElement.removeEventListener('mouseenter', () => {});
                titleElement.removeEventListener('mouseleave', () => {});
            }
            if (buttons) {
                buttons.forEach((button: Element) => {
                    button.removeEventListener('mouseenter', () => {});
                    button.removeEventListener('mouseleave', () => {});
                });
            }
        };
    }, []);

    return(
        <div
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden bg-[#0A0A0A]"
            style={{ opacity: 0 }}
        >
            <StarsBg />

            <div className="relative z-10 flex items-center justify-center h-full">
                <div className={`text-center ${
                    isMobile 
                        ? "space-y-6 px-4" 
                        : isTablet 
                        ? "space-y-8 px-8" 
                        : "space-y-10 px-12"
                }`}>
                    <div
                        ref={titleRef}
                        className="relative cursor-pointer"
                    >
                        <div className={`glass-text-container ${
                            isMobile 
                                ? "scale-75" 
                                : isTablet 
                                ? "scale-90" 
                                : "scale-100"
                        }`}>
                            <h1 className="glass-text-main">JOHN NICO EDISAN</h1>
                            <h1 className="glass-text-reflection">JOHN NICO EDISAN</h1>
                        </div>
                    </div>

                    <p 
                        ref={subtitleRef}
                        className={`max-w-3xl mx-auto leading-relaxed font-light tracking-wide text-white ${
                            isMobile 
                                ? "text-lg px-4" 
                                : isTablet 
                                ? "text-xl px-6" 
                                : isLargeDesktop 
                                ? "text-3xl" 
                                : "text-2xl"
                        }`}
                        style={{fontFamily: 'Marvel, sans-serif'}}
                    >
                        Website and Mobile Application Developer
                    </p>

                    <div ref={buttonsRef} className={`flex justify-center ${
                        isMobile 
                            ? "flex-col gap-4 px-4" 
                            : isTablet 
                            ? "flex-row gap-4" 
                            : "flex-row gap-6"
                    }`}>
                        <button
                            className={`backdrop-blur-md border rounded-2xl font-semibold shadow-2xl transition-all duration-300 bg-white/10 border-white/20 text-white hover:shadow-white/20 ${
                                isMobile 
                                    ? "px-6 py-4 text-sm" 
                                    : isTablet 
                                    ? "px-8 py-4 text-base" 
                                    : isLargeDesktop 
                                    ? "px-12 py-6 text-lg" 
                                    : "px-10 py-5 text-base"
                            }`}
                            onClick={() => {
                                const link = document.createElement('a');
                                link.href = "/resume.pdf";
                                link.download = 'John_Nico_Edisan_Resume.pdf';
                                link.click();
                            }}
                        >
                            Download Resume
                        </button>

                        <button
                            className={`backdrop-blur-md border rounded-2xl font-semibold shadow-2xl transition-all duration-300 bg-white/10 border-white/20 text-white hover:shadow-white/20 ${
                                isMobile 
                                    ? "px-6 py-4 text-sm" 
                                    : isTablet 
                                    ? "px-8 py-4 text-base" 
                                    : isLargeDesktop 
                                    ? "px-12 py-6 text-lg" 
                                    : "px-10 py-5 text-base"
                            }`}
                            onClick={() => {
                                const link = document.createElement('a');
                                link.href = '/cv.pdf';
                                link.download = 'John_Nico_Edisan_CV.pdf';
                                link.click();
                            }}
                        >
                            Download CV
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;