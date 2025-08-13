"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useScrollToSection } from "@/hook/useScrollToSection";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";

const NavBar = () => {
    const navRef = useRef<HTMLDivElement>(null);
    const hamburgerRef = useRef<HTMLDivElement>(null);
    const navItemsRef = useRef<HTMLDivElement[]>([]);
    const uShapeRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const scrollToSection = useScrollToSection();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !navItemsRef.current.includes(el)) {
            navItemsRef.current.push(el);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const playOpeningAnimation = () => {
        const tl = gsap.timeline({ ease: "power3.out" });
        
        gsap.set(overlayRef.current, { 
            x: 0, 
            scale: 1,
            rotation: 0,
            opacity: 1 
        });

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

        return tl;
    };

    const playClosingAnimation = (onComplete: () => void) => {
        const tl = gsap.timeline({ ease: "power3.in" });
        
        gsap.set(overlayRef.current, { 
            x: "-100%", 
            scale: 0,
            rotation: 0,
            opacity: 1 
        });

        tl.to(overlayRef.current, {
            x: 0,
            scale: 1,
            duration: 0.6,
            ease: "power4.out"
        })
        .to(overlayRef.current, {
            scale: 1.1,
            rotation: 2,
            duration: 0.2,
            ease: "power2.out"
        })
        .to(overlayRef.current, {
            scale: 1,
            rotation: 0,
            duration: 0.2,
            ease: "power2.in"
        });

        setTimeout(onComplete, tl.duration() * 1000);
        
        return tl;
    };

    const handleNavigation = (e: React.MouseEvent, href: string) => {
        e.preventDefault();
        
        if (window.innerWidth < 1024) {
            closeMobileMenu();
            router.push(href);
        } else {
            playClosingAnimation(() => {
                router.push(href);
                setTimeout(() => {
                    playOpeningAnimation();
                }, 100);
            });
        }
    };

    const handleSectionClick = (e: React.MouseEvent, sectionId: string) => {
        e.preventDefault();
        
        if (window.innerWidth < 1024) {
            closeMobileMenu();
            scrollToSection(sectionId);
        } else {
            playClosingAnimation(() => {
                scrollToSection(sectionId);
                setTimeout(() => {
                    playOpeningAnimation();
                }, 100);
            });
        }
    };

    useGSAP(() => {
        // Only run desktop animations on larger screens
        if (window.innerWidth < 1024) return;

        gsap.set(navItemsRef.current, { 
            opacity: 0, 
            y: 30,
            scale: 0.8,
            rotation: -5
        });
        gsap.set(hamburgerRef.current, { 
            opacity: 1,
            scale: 1,
            rotation: 0
        });
        gsap.set(uShapeRef.current, { 
            width: "80px",
            scale: 1,
            rotation: 0
        });
        gsap.set(overlayRef.current, { 
            x: "-100%",
            scale: 0,
            rotation: 0
        });

        const handleMouseEnter = () => {
            gsap
                .timeline({ ease: "power3.out" })
                .to(uShapeRef.current, { 
                    width: "280px", 
                    duration: 0.5, 
                    ease: "power2.out",
                    scale: 1.05
                }, 0)
                .to(hamburgerRef.current, { 
                    opacity: 0, 
                    scale: 0.8,
                    rotation: 180,
                    duration: 0.3 
                }, 0.1)
                .to(navItemsRef.current, { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    rotation: 0,
                    duration: 0.4, 
                    stagger: 0.1, 
                    ease: "back.out(1.7)" 
                }, 0.2);
        };

        const handleMouseLeave = () => {
            gsap
                .timeline({ ease: "power3.in" })
                .to(navItemsRef.current, { 
                    opacity: 0, 
                    y: 30, 
                    scale: 0.8,
                    rotation: -5,
                    duration: 0.3, 
                    stagger: 0.05, 
                    ease: "power2.in" 
                }, 0)
                .to(hamburgerRef.current, { 
                    opacity: 1, 
                    scale: 1,
                    rotation: 0,
                    duration: 0.3 
                }, 0.1)
                .to(uShapeRef.current, { 
                    width: "80px", 
                    duration: 0.4, 
                    scale: 1,
                    rotation: 0,
                    ease: "power2.in" 
                }, 0.1);
        };

        const navElement = navRef.current;
        if (navElement) {
            navElement.addEventListener("mouseenter", handleMouseEnter);
            navElement.addEventListener("mouseleave", handleMouseLeave);
            return () => {
                navElement.removeEventListener("mouseenter", handleMouseEnter);
                navElement.removeEventListener("mouseleave", handleMouseLeave);
            };
        }
    }, []);

    return (
        <>
            {/* Desktop Overlay */}
            <div
                ref={overlayRef}
                className="fixed top-0 left-0 w-full h-full hidden lg:block"
                style={{ 
                    backgroundColor: "#E8F4FD", 
                    zIndex: 9999,
                    transformOrigin: "center center"
                }}
            ></div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={closeMobileMenu}
                ></div>
            )}

            {/* Mobile Side Menu */}
            <div
                ref={mobileMenuRef}
                className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${
                    isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full p-8">
                    <div className="flex justify-between items-center mb-12">
                        <h1 className="text-2xl font-bold">NICXS</h1>
                        <button
                            onClick={closeMobileMenu}
                            className="text-2xl font-bold text-gray-600 hover:text-black"
                        >
                            ×
                        </button>
                    </div>
                    
                    <nav className="flex flex-col space-y-8">
                        <Button
                            variant="ghost"
                            onClick={(e) => handleSectionClick(e, "about")}
                            className="text-left text-lg font-medium hover:text-gray-600 transition-colors duration-200 h-auto p-0 bg-transparent border-none"
                        >
                            About
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={(e) => handleSectionClick(e, "services")}
                            className="text-left text-lg font-medium hover:text-gray-600 transition-colors duration-200 h-auto p-0 bg-transparent border-none"
                        >
                            Services
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={(e) => handleNavigation(e, "/")}
                            className="text-left text-lg font-medium hover:text-gray-600 transition-colors duration-200 h-auto p-0 bg-transparent border-none"
                        >
                            Home
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={(e) => handleNavigation(e, "/project")}
                            className="text-left text-lg font-medium hover:text-gray-600 transition-colors duration-200 h-auto p-0 bg-transparent border-none"
                        >
                            Projects
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={(e) => handleNavigation(e, "/contact")}
                            className="text-left text-lg font-medium hover:text-gray-600 transition-colors duration-200 h-auto p-0 bg-transparent border-none"
                        >
                            Contact
                        </Button>
                    </nav>
                </div>
            </div>

            {/* Main Navbar */}
            <div
                ref={navRef}
                className="flex justify-between h-16 fixed top-0 left-0 z-50 w-full cursor-pointer"
            >
                <div className="w-full h-full"></div>

                {/* Desktop Navigation */}
                <div className="relative hidden lg:flex items-center justify-center h-full px-10">
                    <div
                        ref={uShapeRef}
                        className="absolute inset-0 border-x rounded-b-full h-full pointer-events-none"
                        style={{ 
                            left: "50%", 
                            transform: "translateX(-50%)",
                            transformOrigin: "center center"
                        }}
                    ></div>

                    <div
                        ref={hamburgerRef}
                        className="absolute flex flex-col items-center justify-center gap-1 z-20"
                        style={{ transformOrigin: "center center" }}
                    >
                        <div className="w-6 h-0.5 bg-black"></div>
                        <div className="w-6 h-0.5 bg-black"></div>
                        <div className="w-6 h-0.5 bg-black"></div>
                    </div>

                    <div className="flex items-center gap-20 text-base font-bold z-10" style={{ fontFamily: "Proxima Nova Regular" }}>
                        <div ref={addToRefs} style={{ transformOrigin: "center center" }}>
                            <Button
                                variant="ghost"
                                onClick={(e) => handleSectionClick(e, "about")}
                                className="bg-transparent border-none p-0 cursor-pointer font-bold hover:text-gray-600 transition-colors duration-200 h-auto text-base"
                            >
                                About
                            </Button>
                        </div>
                        <div ref={addToRefs} style={{ transformOrigin: "center center" }}>
                            <Button
                                variant="ghost"
                                onClick={(e) => handleSectionClick(e, "services")}
                                className="bg-transparent border-none p-0 cursor-pointer font-bold hover:text-gray-600 transition-colors duration-200 h-auto text-base"
                            >
                                Services
                            </Button>
                        </div>
                        <div ref={addToRefs} className="text-3xl" style={{ transformOrigin: "center center" }}>
                            <Button
                                variant="ghost"
                                onClick={(e) => handleNavigation(e, "/")}
                                className="hover:text-gray-600 transition-colors duration-200 h-auto text-base text-3xl bg-transparent border-none p-0 cursor-pointer font-bold"
                            >
                                NICXS
                            </Button>
                        </div>
                        <div ref={addToRefs} style={{ transformOrigin: "center center" }}>
                            <Button
                                variant="ghost"
                                onClick={(e) => handleNavigation(e, "/project")}
                                className="hover:text-gray-600 transition-colors duration-200 h-auto text-base bg-transparent border-none p-0 cursor-pointer font-bold"
                            >
                                Projects
                            </Button>
                        </div>
                        <div ref={addToRefs} style={{ transformOrigin: "center center" }}>
                            <Button
                                variant="ghost"
                                onClick={(e) => handleNavigation(e, "/contact")}
                                className="hover:text-gray-600 transition-colors duration-200 h-auto text-base bg-transparent border-none p-0 cursor-pointer font-bold"
                            >
                                Contact
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="flex lg:hidden items-center justify-center h-full px-6 w-full">
                    <div className="flex-1"></div>
                    <div className="flex-1 flex justify-end">
                        <button
                            onClick={toggleMobileMenu}
                            className="flex flex-col items-center justify-center gap-1 p-2"
                        >
                            <div className="w-5 h-0.5 bg-black"></div>
                            <div className="w-5 h-0.5 bg-black"></div>
                            <div className="w-5 h-0.5 bg-black"></div>
                        </button>
                    </div>
                </div>

                <div className="w-full h-full"></div>
            </div>
        </>
    );
};

export default NavBar;
