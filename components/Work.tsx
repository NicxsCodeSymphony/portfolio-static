"use client";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".workSection",
                start: "top top",
                end: "+=300%",
                pin: true,
                scrub: true,
                markers: false,
            },
        });

        tl
            .to(".parallax-bg", {
                y: "-50vh",
                ease: "none",
                duration: 1,
            }, 0)
            .to(".floating-shapes", {
                y: "-100vh",
                rotation: 360,
                ease: "none",
                duration: 1,
            }, 0)
            .to(".will-fade", {
                opacity: 0,
                scale: 0.8,
                y: "-50px",
                ease: "power1.in",
                duration: 1,
            }, 0)
            .to("#work-1", {
                y: "-30vh",
                scale: 0.9,
                ease: "power1.out",
                duration: 1.5,
            }, 0.5)
            .to(".work-content", {
                opacity: 0,
                y: "-20px",
                ease: "power1.in",
                duration: 2,
            }, 1)
            .to(".tech-stack", {
                opacity: 1,
                y: 0,
                ease: "power2.out",
                duration: 1.5,
            }, 2.5)
            .to("#work-1", {
                opacity: 0,
                scale: 0.7,
                y: "-50vh",
                ease: "power1.in",
                duration: 1.5
            }, 4)
        gsap.to(".floating-shapes", {
            y: "+=20",
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
        });

    }, []);

    return (
        <>
        <section className="relative bg-[#1C1C1A] h-screen w-full overflow-hidden workSection">
            <div className="parallax-bg absolute inset-0 bg-gradient-to-br from-white/5 via-gray-500/5 to-white/5"></div>
            
            <div className="floating-shapes absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="floating-shapes absolute top-40 right-20 w-32 h-32 bg-gray-400/10 rounded-full blur-xl"></div>
            <div className="floating-shapes absolute bottom-20 left-1/4 w-16 h-16 bg-white/15 rounded-full blur-xl"></div>
            <div className="floating-shapes absolute top-1/2 right-1/3 w-24 h-24 bg-gray-300/10 rounded-full blur-xl"></div>

            <div className="relative z-10 h-full flex flex-col justify-center items-center pt-20 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
                <div className="w-full max-w-7xl mx-auto">
                    <div className="mb-12">
                        <h4 className="will-fade text-gray-400 font-medium text-xs sm:text-sm lg:text-base mb-6">
                            My Work Experiences
                        </h4>

                        <h2 className="will-fade text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight mb-8 lg:mb-12">
                            I&apos;ve built and contributed to various web and mobile projects using modern tools like
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300"> React, Next.js, and Firebase</span>. 
                            With a focus on clean code and user-friendly design,
                            I aim to create practical, responsive solutions that deliver real value.
                        </h2>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 xl:gap-24 justify-center items-center" id="work-1">
                        <div className="w-full lg:w-[60%] h-[40vh] lg:h-[50vh] relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-gray-400/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                            <div className="relative h-full w-full bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-gray-700/50">
                                <Image
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    src="/sample.jpg"
                                    alt="Project Screenshot"
                                    fill
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                            </div>
                        </div>

                        <div className="w-full lg:w-[60%] relative">
                            <div className="work-content">
                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-white">
                                    Freelance Web & App Developer
                                </h3>
                                <h4 className="mb-6 text-gray-400 font-medium">Self-Employed — Nov 2021 to Present</h4>

                                <ul className="space-y-3 text-sm sm:text-base lg:text-lg text-gray-300">
                                    <li className="flex items-start gap-3">
                                        <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Developed <strong className="text-white">3 Barangay Management Systems</strong> for resident records, certificate automation, and online payments.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Built a <strong className="text-white">Network Monitoring Anomaly Detection System</strong> using Python to flag bandwidth issues and block suspicious devices.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Created a <strong className="text-white">Tricycle Booking System</strong> for efficient transport reservations and tracking.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Developed a <strong className="text-white">Student Management System</strong> with attendance tracking and grading features.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Designed and deployed a <strong className="text-white">QR Attendance System</strong> for streamlined check-ins.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Currently developing a <strong className="text-white">Loan Management System</strong> with borrower tracking, printable records, and automated revenue reporting.</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="tech-stack absolute top-0 left-0 w-full" style={{ opacity: 0 }}>
                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-white">Tech Stack</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm sm:text-base lg:text-lg">
                                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                                        <h4 className="font-semibold mb-3 text-gray-300">Frontend</h4>
                                        <ul className="space-y-2 text-gray-400">
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                                React & Next.js
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                                TypeScript
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                                Tailwind CSS
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                                JavaScript
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                                        <h4 className="font-semibold mb-3 text-gray-300">Backend</h4>
                                        <ul className="space-y-2 text-gray-400">
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                                Node.js & Express
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                                Python
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                                Firebase
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                                MySQL & MongoDB
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 xl:gap-24 justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full" id="work-2" style={{ opacity: 0, scale: 0.8 }}>
                        <div className="w-full lg:w-[60%] h-[40vh] lg:h-[50vh] relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-gray-400/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                            <div className="relative h-full w-full bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-gray-700/50">
                                <Image
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    src="/sample.jpg"
                                    alt="Project Screenshot"
                                    fill
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                            </div>
                        </div>

                        <div className="w-full lg:w-[60%] relative">
                            <div className="work-content">
                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-white">
                                    Full-Stack Developer Intern
                                </h3>
                                <h4 className="mb-6 text-gray-400 font-medium">Tech Startup — Jun 2023 to Aug 2023</h4>

                                <ul className="space-y-3 text-sm sm:text-base lg:text-lg text-gray-300">
                                    <li className="flex items-start gap-3">
                                        <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Collaborated with senior developers to build <strong className="text-white">E-commerce Platform</strong> using React and Node.js for seamless online shopping experience.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Implemented <strong className="text-white">Real-time Chat System</strong> with WebSocket integration for customer support and live communication.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Developed <strong className="text-white">Admin Dashboard</strong> with analytics, user management, and inventory tracking features.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Optimized <strong className="text-white">Database Queries</strong> and npm runimplemented caching strategies to improve application performance by 40%.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Participated in <strong className="text-white">Code Reviews</strong> and contributed to teamI&apos;s coding standards and best practices documentation.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Assisted in <strong className="text-white">API Development</strong> and integration with third-party payment gateways and shipping services.</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="tech-stack absolute top-0 left-0 w-full" style={{ opacity: 0 }}>
                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-white">Tech Stack</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm sm:text-base lg:text-lg">
                                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                                        <h4 className="font-semibold mb-3 text-gray-300">Frontend</h4>
                                        <ul className="space-y-2 text-gray-400">
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                                React & Next.js
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                                TypeScript
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                                Tailwind CSS
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                                GSAP Animations
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                                        <h4 className="font-semibold mb-3 text-gray-300">Backend</h4>
                                        <ul className="space-y-2 text-gray-400">
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                                Node.js & Express
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                                Python
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                                Firebase
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                                MySQL & MongoDB
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="project-showcase absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4" style={{ opacity: 0, scale: 0.8 }}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                { title: "Barangay System", tech: "React, Firebase" },
                                { title: "Network Monitor", tech: "Python, SQL" },
                                { title: "Booking App", tech: "Next.js, MongoDB" }
                            ].map((project, index) => (
                                <div key={index} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:scale-105 transition-transform duration-300 hover:bg-gray-800/50">
                                    <h4 className="font-semibold text-white mb-2">{project.title}</h4>
                                    <p className="text-sm text-gray-400">{project.tech}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="h-screen bg-black">
        </section>
        </>
    );
};

export default Work;
