"use client"

import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import {useRef, useState, useEffect} from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/all";
import { createUnifiedAnimations, SectionElements } from "@/components/animations/unifiedAnimations";
import { useOverlay } from "./OverlayContext";

gsap.registerPlugin(ScrollTrigger);

const Sections = () => {
    const [currentSection, setCurrentSection] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const { isOverlayOpen } = useOverlay();
    
    const containerRef = useRef<HTMLElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);
    const workRef = useRef<HTMLDivElement>(null);

    const sections = [
        { ref: heroRef, name: 'hero' },
        { ref: aboutRef, name: 'about' },
        { ref: workRef, name: 'work' }
    ];

    // Create animation elements object
    const animationElements: SectionElements = {
        // Section containers
        heroRef: heroRef.current,
        aboutRef: aboutRef.current,
        workRef: workRef.current,
        
        // Hero elements
        heroGlassContainer: heroRef.current?.querySelector('.glass-text-container') || null,
        heroParagraph: heroRef.current?.querySelector('p') || null,
        heroButtons: heroRef.current?.querySelector('.flex.gap-6') || null,
        
        // About elements
        aboutTitle: aboutRef.current?.querySelector('h3') || null,
        aboutLeftContent: aboutRef.current?.querySelector('.left-content') || null,
        aboutStatItems: aboutRef.current?.querySelectorAll('.stat-item') || null,
        
        // Work elements
        workTitle: workRef.current?.querySelector('h1') || null,
    };

    // Create unified animation system
    const { navigateToSection, initializeAnimations } = createUnifiedAnimations(animationElements);

    const handleSectionNavigation = (sectionIndex: number) => {
        if (isAnimating || sectionIndex < 0 || sectionIndex >= sections.length) return;
        
        setIsAnimating(true);
        setCurrentSection(sectionIndex);
        
        // Update animation elements with current DOM state
        const updatedElements: SectionElements = {
            // Section containers
            heroRef: heroRef.current,
            aboutRef: aboutRef.current,
            workRef: workRef.current,
            
            // Hero elements
            heroGlassContainer: heroRef.current?.querySelector('.glass-text-container') || null,
            heroParagraph: heroRef.current?.querySelector('p') || null,
            heroButtons: heroRef.current?.querySelector('.flex.gap-6') || null,
            
            // About elements
            aboutTitle: aboutRef.current?.querySelector('h3') || null,
            aboutLeftContent: aboutRef.current?.querySelector('.left-content') || null,
            aboutStatItems: aboutRef.current?.querySelectorAll('.stat-item') || null,
            
            // Work elements
            workTitle: workRef.current?.querySelector('h1') || null,
        };
        
        // Create new animation system with updated elements
        const { navigateToSection: animateToSection } = createUnifiedAnimations(updatedElements);
        
        animateToSection(currentSection, sectionIndex, () => {
            setIsAnimating(false);
        });
    };

    const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        
        // Disable section navigation when overlay is open
        if (isOverlayOpen) return; // ← This prevents section navigation when overlay is open
        
        if (isAnimating) return;
        
        if (e.deltaY > 0) {
            handleSectionNavigation(currentSection + 1);
        } else {
            handleSectionNavigation(currentSection - 1);
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        // Disable section navigation when overlay is open
        if (isOverlayOpen) return;
        
        if (isAnimating) return;
        
        if (e.key === 'ArrowDown' || e.key === ' ') {
            e.preventDefault();
            handleSectionNavigation(currentSection + 1);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            handleSectionNavigation(currentSection - 1);
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Only add event listeners if overlay is not open
        if (!isOverlayOpen) {
            container.addEventListener('wheel', handleWheel, { passive: false });
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            container.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentSection, isAnimating, isOverlayOpen]);

    useGSAP(() => {
        // Initialize animations with current elements
        const initialElements: SectionElements = {
            heroRef: heroRef.current,
            aboutRef: aboutRef.current,
            workRef: workRef.current,
            
            heroGlassContainer: heroRef.current?.querySelector('.glass-text-container') || null,
            heroParagraph: heroRef.current?.querySelector('p') || null,
            heroButtons: heroRef.current?.querySelector('.flex.gap-6') || null,
            aboutTitle: aboutRef.current?.querySelector('h3') || null,
            aboutLeftContent: aboutRef.current?.querySelector('.left-content') || null,
            aboutStatItems: aboutRef.current?.querySelectorAll('.stat-item') || null,
            workTitle: workRef.current?.querySelector('h1') || null,
        };
        
        const { initializeAnimations: initAnimations } = createUnifiedAnimations(initialElements);
        initAnimations();
    }, []);

    return(
        <section className="h-screen relative overflow-hidden bg-[#0A0A0A]" ref={containerRef}>
            <div ref={heroRef} className="absolute inset-0">
                <Hero />
            </div>
            <div ref={aboutRef} className="absolute inset-0">
                <About />
            </div>
            <div ref={workRef} className="absolute inset-0">
                <Work />
            </div>
            <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
                <div className="flex flex-col gap-2">
                    {sections.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleSectionNavigation(index)}
                            disabled={isAnimating || isOverlayOpen}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                currentSection === index 
                                    ? 'bg-white scale-125' 
                                    : 'bg-white/30 hover:bg-white/50'
                            } ${isOverlayOpen ? 'opacity-30 cursor-not-allowed' : ''}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Sections