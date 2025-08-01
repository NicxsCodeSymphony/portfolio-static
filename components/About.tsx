"use client"

import StarsBg from "@/constants/stars"
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";

const About = () => {
    const aboutRef = useRef<HTMLElement>(null);

    // Responsive breakpoints
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
    const isDesktop = useMediaQuery({ minWidth: 1024 });
    const isLargeDesktop = useMediaQuery({ minWidth: 1440 });

    return (
        <>
            <section
                ref={aboutRef}
                className={`relative min-h-screen w-full bg-[#0A0A0A] ${
                    isMobile 
                        ? "py-20 px-4" 
                        : isTablet 
                        ? "py-28 px-8" 
                        : isLargeDesktop 
                        ? "py-36 px-64" 
                        : "py-32 px-12"
                }`}
                id="about"
                style={{ fontFamily: 'Marvel, sans-serif' }}
            >
                <h3 className={`text-[#5093C7] uppercase ${
                    isMobile 
                        ? "text-sm tracking-[8px] mb-8" 
                        : isTablet 
                        ? "text-base tracking-[12px] mb-10" 
                        : "text-lg tracking-[18px] mb-12"
                }`}>
                    About Me
                </h3>

                <div className={`flex ${
                    isMobile 
                        ? "flex-col space-y-8" 
                        : isTablet 
                        ? "flex-col space-y-12" 
                        : "flex-row items-center space-x-16"
                }`}>
                    {/* Image Section */}
                    <div className={`${
                        isMobile 
                            ? "w-full h-[300px]" 
                            : isTablet 
                            ? "w-full h-[400px]" 
                            : "w-1/2 h-[600px]"
                    }`}>
                        <div className={`relative w-full h-full rounded-2xl overflow-hidden ${
                            isMobile ? "p-4" : isTablet ? "p-6" : "p-8"
                        }`}>
                            <Image
                                src="/fallback.png"
                                alt="John Nico Edisan - Web Developer"
                                fill
                                className="object-cover rounded-2xl"
                                priority
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/fallback.png";
                                }}
                            />
                            {/* Professional overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className={`${
                        isMobile 
                            ? "w-full" 
                            : isTablet 
                            ? "w-full" 
                            : "w-1/2"
                    }`}>
                        <div className={`${
                            isMobile 
                                ? "space-y-6" 
                                : isTablet 
                                ? "space-y-8" 
                                : "space-y-10"
                        }`}>
                            <div>
                                <h1 className={`font-bold text-white leading-tight ${
                                    isMobile 
                                        ? "text-2xl mb-4" 
                                        : isTablet 
                                        ? "text-4xl mb-6" 
                                        : isLargeDesktop 
                                        ? "text-6xl mb-8" 
                                        : "text-5xl mb-6"
                                }`}>
                                    I AM JOHN NICO EDISAN 
                                    <span className="text-[#5093C7]"> WEB DEVELOPER </span> 
                                    BORN AND  <br />  RAISED IN  CEBU, PHILIPPINES
                                   
                                </h1>
                            </div>

                            <div>
                                <p className={`text-gray-300 leading-relaxed ${
                                    isMobile 
                                        ? "text-sm" 
                                        : isTablet 
                                        ? "text-lg" 
                                        : isLargeDesktop 
                                        ? "text-xl" 
                                        : "text-lg"
                                }`}>
                                    I am passionate about creating engaging experiences across web and mobile platforms. As a recent graduate, I enjoy turning
                                    ideas into functional and user-friendly designs—starting from user research to final execution.
                                    I am currently working as a freelance web developer for a client. I am helping shape the entire
                                    product experience. I am excited to keep learning and contribute to impactful websites.
                                </p>
                            </div>

                            {/* Stats Section */}
                            <div className={`${
                                isMobile 
                                    ? "mt-8" 
                                    : isTablet 
                                    ? "mt-12" 
                                    : "mt-16"
                            }`}>
                                <div className={`flex ${
                                    isMobile 
                                        ? "flex-wrap gap-4" 
                                        : isTablet 
                                        ? "flex-wrap gap-6" 
                                        : "items-center space-x-8"
                                }`}>
                                    {[
                                        { name: "0.5 yrs exp" },
                                        { name: "15 projects" },
                                        { name: "7 clients" },
                                        { name: "1 companies" }
                                    ].map((company, index) => (
                                        <div key={index} className={`flex items-center ${
                                            isMobile 
                                                ? "flex-col text-center space-y-1" 
                                                : "space-x-4"
                                        }`}>
                                            <div className={`text-white font-semibold ${
                                                isMobile 
                                                    ? "text-base" 
                                                    : isTablet 
                                                    ? "text-lg" 
                                                    : "text-xl"
                                            }`}>
                                                {company.name}
                                            </div>
                                            {index < 3 && !isMobile && (
                                                <div className={`w-px bg-white ${
                                                    isTablet ? "h-6" : "h-8"
                                                }`}></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <StarsBg />
        </>
    );
};

export default About;