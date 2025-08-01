import gsap from "gsap";
import { HeroElements, SectionIndex, AnimationCallback } from "./types";

export const createHeroAnimations = () => {
    const heroExit = (
        tl: gsap.core.Timeline,
        elements: HeroElements,
        targetSection: SectionIndex
    ) => {
        const { heroGlassContainer, heroParagraph, heroButtons } = elements;
        
        if (heroGlassContainer) {
            tl.to(heroGlassContainer, {
                y: -100,
                opacity: 0,
                scale: 0.8,
                duration: 1,
                ease: "power3.inOut"
            });
        }
        
        if (heroParagraph) {
            tl.to(heroParagraph, {
                y: -60,
                opacity: 0,
                scale: 0.9,
                duration: 1,
                ease: "power2.inOut"
            }, "-=2");
        }
        
        if (heroButtons) {
            tl.to(heroButtons, {
                y: -40,
                opacity: 0,
                scale: 0.9,
                duration: 1,
                ease: "power2.inOut"
            }, "-=2");
        }
    };

    const heroEntrance = (
        tl: gsap.core.Timeline,
        elements: HeroElements
    ) => {
        const { heroGlassContainer, heroParagraph, heroButtons } = elements;
        
        // Reset elements to initial state
        if (heroGlassContainer) {
            gsap.set(heroGlassContainer, {
                y: 80,
                opacity: 0,
                scale: 0.9
            });
        }
        
        if (heroParagraph) {
            gsap.set(heroParagraph, {
                y: 40,
                opacity: 0,
                scale: 0.95
            });
        }
        
        if (heroButtons) {
            gsap.set(heroButtons, {
                y: 20,
                opacity: 0,
                scale: 0.95
            });
        }
        
        // Animate content after section becomes visible
        if (heroGlassContainer) {
            tl.to(heroGlassContainer, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.5,
                ease: "power3.out"
            }, "-=2");
        }
        
        if (heroParagraph) {
            tl.to(heroParagraph, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "power2.out"
            }, "-=1.8");
        }
        
        if (heroButtons) {
            tl.to(heroButtons, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "power2.out"
            }, "-=1.6");
        }
    };

    return {
        heroExit,
        heroEntrance
    };
}; 