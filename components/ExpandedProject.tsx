"use client";

import { useRef, useEffect } from "react";
import { works } from "@/constants/works";
import Image from "next/image";
import { fallbackImages, getImageSource } from "@/constants/imageSource";
import { useOverlay } from "./OverlayContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";

interface ExpandedProjectProps {
    selectedWork: number | null;
    clonedCard: {
        top: number;
        left: number;
        width: number;
        height: number;
    } | null;
    onClose: () => void;
}

const ExpandedProject = ({ selectedWork, clonedCard, onClose }: ExpandedProjectProps) => {
    const expandedRef = useRef<HTMLDivElement>(null);
    const { setIsOverlayOpen } = useOverlay();

    // Responsive breakpoints
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
    const isDesktop = useMediaQuery({ minWidth: 1024 });

    // Handle smooth scrolling for the expanded overlay
    useEffect(() => {
        if (selectedWork !== null && expandedRef.current) {
            const scrollContainer = expandedRef.current.querySelector('.expanded-overlay');
            if (scrollContainer) {
                const container = scrollContainer as HTMLElement;
                // Enable smooth scrolling
                container.style.scrollBehavior = 'smooth';
                container.style.overflowY = 'auto';
                container.style.overflowX = 'hidden';
                container.style.setProperty('-webkit-overflow-scrolling', 'touch');
                container.style.setProperty('-ms-overflow-style', 'none'); // Hide scrollbar in IE/Edge
                
                // Custom scrollbar styling for better UX
                container.style.setProperty('--scrollbar-width', '8px');
                container.style.setProperty('--scrollbar-track', '#1a1a1a');
                container.style.setProperty('--scrollbar-thumb', '#5093C7');
                container.style.setProperty('--scrollbar-thumb-hover', '#3a7bb3');
            }
        }
    }, [selectedWork]);

    useGSAP(() => {
        if (expandedRef.current && clonedCard) {
            // Step 1: Animate the container expansion (image growing to full screen)
            gsap.fromTo(
                expandedRef.current,
                {
                    top: clonedCard.top,
                    left: clonedCard.left,
                    width: clonedCard.width,
                    height: clonedCard.height,
                    position: "fixed",
                    scale: 1,
                    opacity: 1,
                },
                {
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "500vh",
                    duration: 2,
                    ease: "power3.out",
                    onComplete: () => {
                        // Step 2: After expansion is complete, set up scrolling
                        const scrollContainer = expandedRef.current?.querySelector('.expanded-overlay');
                        if (scrollContainer) {
                            const container = scrollContainer as HTMLElement;
                            container.style.height = '500vh';
                            container.style.scrollBehavior = 'smooth';
                            container.style.overflowY = 'auto';
                            container.style.overflowX = 'hidden';
                            container.style.setProperty('-webkit-overflow-scrolling', 'touch');
                            container.style.setProperty('-ms-overflow-style', 'none');
                        }

                        // Step 3: Animate the title and type overlay after expansion
                        const titleElement = expandedRef.current?.querySelector('.project-title');
                        const typeElement = expandedRef.current?.querySelector('.project-type');
                        const lineElement = expandedRef.current?.querySelector('.title-line');

                        // Only animate if all elements are found
                        if (titleElement && typeElement && lineElement) {
                            // Set initial state for title animation (hidden and positioned below)
                            gsap.set([titleElement, typeElement], {
                                opacity: 0,
                                y: 50, // Start 50px below final position
                            });
                            
                            // Set initial state for line (hidden and collapsed)
                            gsap.set(lineElement, {
                                opacity: 0,
                                scaleX: 0, // Start completely collapsed
                                transformOrigin: "left center" // Expand from left to right
                            });

                            // Animate title, type, and line in sequence
                            gsap.timeline()
                                .to(titleElement, {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.8,
                                    ease: "power3.out"
                                })
                                .to(typeElement, {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.6,
                                    ease: "power3.out"
                                }, "-=0.4") // Start slightly before title animation ends
                                .to(lineElement, {
                                    opacity: 1,
                                    scaleX: 1, // Expand the line from 0 to full width
                                    duration: 0.8,
                                    ease: "power3.out"
                                }, "-=0.3"); // Start before type animation ends
                        }
                    }
                }
            );
        }
    }, [clonedCard]);

    const handleClose = () => {
        if (expandedRef.current && clonedCard) {
            // Step 1: Animate title and type out first
            const titleElement = expandedRef.current?.querySelector('.project-title');
            const typeElement = expandedRef.current?.querySelector('.project-type');
            const lineElement = expandedRef.current?.querySelector('.title-line');

            if (titleElement && typeElement && lineElement) {
                // Create timeline for close animation
                gsap.timeline()
                    // Step 1: Animate title elements out (fade out and move down)
                    .to([titleElement, typeElement], {
                        opacity: 0,
                        y: 50, // Move 50px down while fading out
                        duration: 0.4,
                        ease: "power3.in"
                    })
                    .to(lineElement, {
                        opacity: 0,
                        scaleX: 0, // Collapse the line back to 0
                        duration: 0.3,
                        ease: "power3.in"
                    }, "-=0.2") // Start slightly before title/type animation ends
                    
                    // Step 2: After title elements are hidden, animate the container back
                    .to(expandedRef.current, {
                        top: clonedCard.top,
                        left: clonedCard.left,
                        width: clonedCard.width,
                        height: clonedCard.height,
                        duration: 0.8,
                        ease: "power3.inOut",
                        onComplete: () => {
                            setIsOverlayOpen(false);
                            onClose();
                            // Remove overlay class from body
                            document.body.classList.remove('overlay-open');
                        },
                    }, "-=0.1"); // Start immediately after title animation completes
            } else {
                // Fallback: if elements not found, just animate container
                gsap.to(expandedRef.current, {
                    top: clonedCard.top,
                    left: clonedCard.left,
                    width: clonedCard.width,
                    height: clonedCard.height,
                    duration: 0.8,
                    ease: "power3.inOut",
                    onComplete: () => {
                        setIsOverlayOpen(false);
                        onClose();
                        document.body.classList.remove('overlay-open');
                    },
                });
            }
        }
    };

    if (selectedWork === null || !clonedCard) return null;

    return (
        <div
            ref={expandedRef}
            className="z-[100] bg-black fixed text-white rounded-lg expanded-overlay-container"
            style={{
                top: clonedCard.top,
                left: clonedCard.left,
                width: clonedCard.width,
                height: clonedCard.height,
            }}
        >
            <div className="expanded-overlay">
                <div className="relative w-full h-[100vh]">
                    <Image
                        src={getImageSource(
                            works[selectedWork].imageID,
                            fallbackImages[selectedWork % fallbackImages.length]
                        )}
                        alt={works[selectedWork].title}
                        fill
                        className="object-cover brightness-50"
                    />
                    <div className={`absolute text-white z-10 ${
                        isMobile 
                            ? "bottom-6 left-6" 
                            : isTablet 
                            ? "bottom-8 left-8" 
                            : "bottom-12 left-12"
                    }`}>
                        <h1 className={`font-bold mb-3 project-title ${
                            isMobile 
                                ? "text-2xl" 
                                : isTablet 
                                ? "text-4xl" 
                                : "text-6xl"
                        }`} style={{ opacity: 0 }}>
                            {works[selectedWork].title}
                        </h1>
                        <p className={`opacity-90 mb-4 project-type ${
                            isMobile 
                                ? "text-lg" 
                                : isTablet 
                                ? "text-xl" 
                                : "text-2xl"
                        }`} style={{ opacity: 0 }}>
                            {works[selectedWork].type}
                        </p>
                        <div className={`h-1 bg-white rounded-full title-line ${
                            isMobile ? "w-16" : isTablet ? "w-20" : "w-24"
                        }`} style={{ transform: 'scaleX(0)', opacity: 0 }}></div>
                    </div>
                </div>

                <button
                    className={`absolute bg-white text-black rounded-full font-bold z-50 hover:bg-gray-100 transition-colors ${
                        isMobile 
                            ? "top-4 left-4 p-2" 
                            : isTablet 
                            ? "top-6 left-6 p-2.5" 
                            : "top-8 left-8 p-3"
                    }`}
                    onClick={handleClose}
                    aria-label="Go back"
                >
                    <svg 
                        width={isMobile ? "16" : isTablet ? "18" : "20"} 
                        height={isMobile ? "16" : isTablet ? "18" : "20"} 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                </button>

                <div className={`pb-32 ${
                    isMobile 
                        ? "mt-8 px-4 max-w-full" 
                        : isTablet 
                        ? "mt-12 px-6 max-w-3xl" 
                        : "mt-16 px-6 max-w-4xl"
                }`}>
                    <h2 className={`font-bold uppercase mb-6 ${
                        isMobile 
                            ? "text-2xl" 
                            : isTablet 
                            ? "text-3xl" 
                            : "text-5xl"
                    }`}>
                        {works[selectedWork].title}
                    </h2>
                    <p className={`mb-4 ${
                        isMobile 
                            ? "text-lg" 
                            : isTablet 
                            ? "text-xl" 
                            : "text-xl"
                    }`}>Type: {works[selectedWork].type}</p>
                    <p className={`leading-8 mb-8 ${
                        isMobile 
                            ? "text-base" 
                            : isTablet 
                            ? "text-lg" 
                            : "text-lg"
                    }`}>
                        {/* Replace with actual content */}
                        This is where your project description goes. You can include images, links, or anything
                        else here.
                    </p>

                    {/* Add more content to demonstrate scrolling */}
                    <div className={`space-y-8 ${
                        isMobile ? "space-y-6" : isTablet ? "space-y-7" : "space-y-8"
                    }`}>
                        <div className={`bg-gray-800 rounded-lg ${
                            isMobile ? "p-4" : isTablet ? "p-5" : "p-6"
                        }`}>
                            <h3 className={`font-bold mb-4 ${
                                isMobile 
                                    ? "text-xl" 
                                    : isTablet 
                                    ? "text-2xl" 
                                    : "text-2xl"
                            }`}>Project Overview</h3>
                            <p className={`leading-8 ${
                                isMobile 
                                    ? "text-base" 
                                    : isTablet 
                                    ? "text-lg" 
                                    : "text-lg"
                            }`}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </div>

                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold mb-4">Technical Details</h3>
                            <p className="text-lg leading-8">
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                                sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>

                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold mb-4">Features</h3>
                            <ul className="text-lg leading-8 space-y-2">
                                <li>• Responsive design</li>
                                <li>• Modern UI/UX</li>
                                <li>• Performance optimized</li>
                                <li>• Cross-browser compatible</li>
                            </ul>
                        </div>

                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold mb-4">Conclusion</h3>
                            <p className="text-lg leading-8">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                                veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                            </p>
                        </div>

                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold mb-4">Additional Section</h3>
                            <p className="text-lg leading-8">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </div>

                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold mb-4">Final Thoughts</h3>
                            <p className="text-lg leading-8">
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                                sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>

                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold mb-4">Extra Long Section 1</h3>
                            <p className="text-lg leading-8">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                                sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>

                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold mb-4">Extra Long Section 2</h3>
                            <p className="text-lg leading-8">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                                veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                                ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                                consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                            </p>
                        </div>

                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold mb-4">Extra Long Section 3</h3>
                            <p className="text-lg leading-8">
                                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                                praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias
                                excepturi sint occaecati cupiditate non provident, similique sunt in culpa
                                qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
                            </p>
                        </div>

                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold mb-4">Bottom Section</h3>
                            <p className="text-lg leading-8">
                                Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore,
                                cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod
                                maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor
                                repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum
                                necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae
                                non recusandae.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpandedProject; 