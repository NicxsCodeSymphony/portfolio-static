import gsap from "gsap";
import { WorkElements, SectionIndex } from "./types";

export const createWorkAnimations = () => {
    const workExit = (
        tl: gsap.core.Timeline,
        elements: WorkElements,
        targetSection: SectionIndex
    ) => {
        const { workTitle } = elements;
        
        if (workTitle) {
            tl.to(workTitle, {
                opacity: 0,
                y: -50,
                duration: 1.5,
                ease: "power2.inOut"
            });
        }
    };

    const workEntrance = (
        tl: gsap.core.Timeline,
        elements: WorkElements
    ) => {
        const { workTitle } = elements;
        
        // Reset elements to initial state
        if (workTitle) {
            gsap.set(workTitle, {
                opacity: 0,
                y: -30
            });
        }
        
        // Animate content after section becomes visible
        if (workTitle) {
            tl.to(workTitle, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out"
            }, "-=1.5");
        }
    };

    return {
        workExit,
        workEntrance
    };
}; 