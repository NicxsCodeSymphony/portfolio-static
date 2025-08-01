"use client"

import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import {useRef, useState, useEffect} from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/all";
import { createSectionAnimations } from "@/components/animations/sectionAnimations";
gsap.registerPlugin(ScrollTrigger);

const Sections = () => {
    const [currentSection, setCurrentSection] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    
    const containerRef = useRef<HTMLElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);
    const workRef = useRef<HTMLDivElement>(null)

    const sections = [
        { ref: heroRef, name: 'hero' },
        { ref: aboutRef, name: 'about' },
        {ref: workRef, name: 'work'}
    ];

    const { navigateToSection: animateToSection, initializeAnimations } = createSectionAnimations();

    const navigateToSection = (sectionIndex: number) => {
        if (isAnimating || sectionIndex < 0 || sectionIndex >= sections.length) return;
        
        setIsAnimating(true);
        setCurrentSection(sectionIndex);
        
        const elements = {
            heroGlassContainer: heroRef.current?.querySelector('.glass-text-container') || null,
            heroParagraph: heroRef.current?.querySelector('p') || null,
            heroButtons: heroRef.current?.querySelector('.flex.gap-6') || null,
            aboutTitle: aboutRef.current?.querySelector('h3') || null,
            aboutLeftContent: aboutRef.current?.querySelector('.left-content') || null,
            aboutStatItems: aboutRef.current?.querySelectorAll('.stat-item') || null,
            workTitle: workRef.current?.querySelector('h1') || null,
            heroRef: heroRef.current,
            aboutRef: aboutRef.current,
            workRef: workRef.current
        };
        
        animateToSection(currentSection, sectionIndex, elements, () => {
            setIsAnimating(false);
        });
    };

    const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        
        if (isAnimating) return;
        
        if (e.deltaY > 0) {
            // Scroll down - go to next section
            navigateToSection(currentSection + 1);
        } else {
            // Scroll up - go to previous section
            navigateToSection(currentSection - 1);
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (isAnimating) return;
        
        if (e.key === 'ArrowDown' || e.key === ' ') {
            e.preventDefault();
            navigateToSection(currentSection + 1);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            navigateToSection(currentSection - 1);
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            container.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentSection, isAnimating]);

    useGSAP(() => {
        initializeAnimations(heroRef.current, aboutRef.current, workRef.current);
    }, [])

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
                            onClick={() => navigateToSection(index)}
                            disabled={isAnimating}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                currentSection === index 
                                    ? 'bg-white scale-125' 
                                    : 'bg-white/30 hover:bg-white/50'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Sections