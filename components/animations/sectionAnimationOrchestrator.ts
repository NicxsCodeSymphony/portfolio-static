import gsap from "gsap";
import { AnimationElements, SectionIndex, AnimationCallback } from "./types";
import { createHeroAnimations } from "./heroAnimations";
import { createAboutAnimations } from "./aboutAnimations";
import { createWorkAnimations } from "./workAnimations";

export const createSectionAnimationOrchestrator = () => {
    const { heroExit, heroEntrance } = createHeroAnimations();
    const { aboutExit, aboutEntrance } = createAboutAnimations();
    const { workExit, workEntrance } = createWorkAnimations();

    const navigateToSection = (
        currentSection: number,
        sectionIndex: number,
        elements: AnimationElements,
        onComplete: AnimationCallback
    ) => {
        if (sectionIndex < 0 || sectionIndex >= 3) return;
        
        // Create a timeline for slow navigation transitions
        const tl = gsap.timeline({
            onComplete: () => {
                setTimeout(() => {
                    onComplete();
                }, 500);
            }
        });
        
        // Handle section exits
        handleSectionExit(currentSection, sectionIndex, elements, tl);
        
        // Handle section entrances
        handleSectionEntrance(sectionIndex, elements, tl);
    };

    const handleSectionExit = (
        currentSection: number,
        targetSection: number,
        elements: AnimationElements,
        tl: gsap.core.Timeline
    ) => {
        const { heroRef, aboutRef, workRef } = elements;
        
        // Hero section exits
        if (currentSection === 0 && (targetSection === 1 || targetSection === 2)) {
            heroExit(tl, elements, targetSection as SectionIndex);
            if (heroRef) {
                tl.to(heroRef, {
                    opacity: 0,
                    duration: 1.5,
                    ease: "power2.inOut"
                }, "-=1.5");
            }
        }
        
        // About section exits
        if (currentSection === 1 && (targetSection === 0 || targetSection === 2)) {
            aboutExit(tl, elements, targetSection as SectionIndex);
            if (aboutRef) {
                tl.to(aboutRef, {
                    opacity: 0,
                    duration: 1.5,
                    ease: "power2.inOut"
                }, "-=1.5");
            }
        }
        
        // Work section exits
        if (currentSection === 2 && (targetSection === 0 || targetSection === 1)) {
            workExit(tl, elements, targetSection as SectionIndex);
            if (workRef) {
                tl.to(workRef, {
                    opacity: 0,
                    duration: 1.5,
                    ease: "power2.inOut"
                }, "-=1.5");
            }
        }
    };

    const handleSectionEntrance = (
        sectionIndex: number,
        elements: AnimationElements,
        tl: gsap.core.Timeline
    ) => {
        const { heroRef, aboutRef, workRef } = elements;
        
        if (sectionIndex === 0) {
            if (heroRef) {
                tl.to(heroRef, {
                    opacity: 1,
                    duration: 3,
                    ease: "power2.out"
                });
            }
            heroEntrance(tl, elements);
        } else if (sectionIndex === 1) {
            // Show About section
            if (aboutRef) {
                tl.to(aboutRef, {
                    opacity: 1,
                    duration: 2,
                    ease: "power2.out"
                });
            }
            aboutEntrance(tl, elements);
        } else if (sectionIndex === 2) {
            if (workRef) {
                tl.to(workRef, {
                    opacity: 1,
                    duration: 2,
                    ease: "power2.out"
                });
            }
            workEntrance(tl, elements);
        }
    };

    const initializeAnimations = (
        heroRef: HTMLElement | null,
        aboutRef: HTMLElement | null,
        workRef: HTMLElement | null
    ) => {
        if (!heroRef || !aboutRef || !workRef) return;
        
        gsap.set(aboutRef, { 
            opacity: 0,
            backgroundColor: "#0A0A0A"
        });
        
        gsap.set(workRef, { 
            opacity: 0,
            backgroundColor: "#0A0A0A"
        });

        gsap.set(heroRef, {
            opacity: 1
        });
    };

    return {
        navigateToSection,
        initializeAnimations
    };
}; 