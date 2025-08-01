import gsap from "gsap";
import { AboutElements, SectionIndex } from "./types";

export const createAboutAnimations = () => {
    const aboutExit = (
        tl: gsap.core.Timeline,
        elements: AboutElements,
        targetSection: SectionIndex
    ) => {
        const { aboutTitle, aboutLeftContent, aboutStatItems } = elements;
        
        if (aboutTitle) {
            tl.to(aboutTitle, {
                opacity: 0,
                y: -50,
                duration: 1.5,
                ease: "power2.inOut"
            });
        }
        
        if (aboutLeftContent) {
            tl.to(aboutLeftContent, {
                x: -50,
                opacity: 0,
                yPercent: -20,
                duration: 1.5,
                ease: "power2.inOut"
            }, "-=1.5");
        }
        
        if (aboutStatItems) {
            tl.to(aboutStatItems, {
                opacity: 0,
                scaleY: 0,
                duration: 2.5,
                ease: "power2.inOut",
                stagger: 0.1
            }, "-=2");
        }
    };

    const aboutEntrance = (
        tl: gsap.core.Timeline,
        elements: AboutElements
    ) => {
        const { aboutTitle, aboutLeftContent, aboutStatItems } = elements;
        
        // Reset elements to initial state
        if (aboutTitle) {
            gsap.set(aboutTitle, {
                opacity: 0,
                y: -30
            });
        }
        
        if (aboutLeftContent) {
            gsap.set(aboutLeftContent, {
                x: 50,
                opacity: 0,
                yPercent: 20
            });
        }
        
        if (aboutStatItems) {
            gsap.set(aboutStatItems, {
                opacity: 0,
                scaleY: 0,
                transformOrigin: "top center"
            });
        }
        
        // Animate content after section becomes visible
        if (aboutTitle) {
            tl.to(aboutTitle, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out"
            }, "-=1.5");
        }
        
        if (aboutLeftContent) {
            tl.to(aboutLeftContent, {
                x: 0,
                opacity: 1,
                yPercent: 0,
                duration: 1.5,
                ease: "power2.out"
            }, "-=1.2");
        }
        
        if (aboutStatItems) {
            tl.to(aboutStatItems, {
                opacity: 1,
                scaleY: 1,
                duration: 0.8,
                ease: "power2.out",
                stagger: 0.15
            }, "-=1");
        }
    };

    return {
        aboutExit,
        aboutEntrance
    };
}; 