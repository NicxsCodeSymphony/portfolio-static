"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useScrollToSection } from "@/hook/useScrollToSection";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";

const NavBar = () => {
    const navRef = useRef<HTMLDivElement>(null);
    const hamburgerRef = useRef<HTMLDivElement>(null);
    const navItemsRef = useRef<HTMLLIElement[]>([]);
    const uShapeRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const scrollToSection = useScrollToSection();
    const router = useRouter();

    const addToRefs = (el: HTMLLIElement | null) => {
        if (el && !navItemsRef.current.includes(el)) {
            navItemsRef.current.push(el);
        }
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
        
        playClosingAnimation(() => {
            router.push(href);
            setTimeout(() => {
                playOpeningAnimation();
            }, 100);
        });
    };

    const handleSectionClick = (e: React.MouseEvent, sectionId: string) => {
        e.preventDefault();
        
        playClosingAnimation(() => {
            scrollToSection(sectionId);
            setTimeout(() => {
                playOpeningAnimation();
            }, 100);
        });
    };

    useGSAP(() => {
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
            <div
                ref={overlayRef}
                className="fixed top-0 left-0 w-full h-full"
                style={{ 
                    backgroundColor: "#E8F4FD", 
                    zIndex: 9999,
                    transformOrigin: "center center"
                }}
            ></div>

            <div
                ref={navRef}
                className="flex justify-between h-16 fixed top-0 left-0 z-50 w-full cursor-pointer"
            >
                <div className="w-full h-full"></div>

                <div className="relative flex items-center justify-center h-full px-10">
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

                    <NavigationMenu className="flex items-center gap-20 text-base font-bold z-10" style={{ fontFamily: "Proxima Nova Regular" }}>
                        <NavigationMenuItem ref={addToRefs} style={{ transformOrigin: "center center" }}>
                            <Button
                                variant="ghost"
                                onClick={(e) => handleSectionClick(e, "about")}
                                className="bg-transparent border-none p-0 cursor-pointer font-bold hover:text-gray-600 transition-colors duration-200 h-auto text-base"
                            >
                                About
                            </Button>
                        </NavigationMenuItem>
                        <NavigationMenuItem ref={addToRefs} style={{ transformOrigin: "center center" }}>
                            <Button
                                variant="ghost"
                                onClick={(e) => handleSectionClick(e, "services")}
                                className="bg-transparent border-none p-0 cursor-pointer font-bold hover:text-gray-600 transition-colors duration-200 h-auto text-base"
                            >
                                Services
                            </Button>
                        </NavigationMenuItem>
                        <NavigationMenuItem ref={addToRefs} className="text-3xl" style={{ transformOrigin: "center center" }}>
                            <NavigationMenuLink asChild>
                                <Link 
                                    href="/" 
                                    onClick={(e) => handleNavigation(e, "/")}
                                    className="hover:text-gray-600 transition-colors duration-200"
                                >
                                    NICXS
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem ref={addToRefs} style={{ transformOrigin: "center center" }}>
                            <NavigationMenuLink asChild>
                                <Link 
                                    href="/project" 
                                    onClick={(e) => handleNavigation(e, "/project")}
                                    className="hover:text-gray-600 transition-colors duration-200"
                                >
                                    Projects
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem ref={addToRefs} style={{ transformOrigin: "center center" }}>
                            <NavigationMenuLink asChild>
                                <Link 
                                    href="/contact" 
                                    onClick={(e) => handleNavigation(e, "/contact")}
                                    className="hover:text-gray-600 transition-colors duration-200"
                                >
                                    Contact
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenu>
                </div>

                <div className="w-full h-full"></div>
            </div>
        </>
    );
};

export default NavBar;
