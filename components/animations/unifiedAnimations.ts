import gsap from "gsap";

// ============================================================================
// TYPES
// ============================================================================

export interface SectionElements {
  // Section containers
  heroRef: HTMLElement | null;
  aboutRef: HTMLElement | null;
  workRef: HTMLElement | null;
  
  // Hero elements
  heroGlassContainer: Element | null;
  heroParagraph: Element | null;
  heroButtons: Element | null;
  
  // About elements
  aboutTitle: Element | null;
  aboutLeftContent: Element | null;
  aboutStatItems: NodeListOf<Element> | null;
  
  // Work elements
  workTitle: Element | null;
}

export type SectionIndex = 0 | 1 | 2;
export type AnimationCallback = () => void;

// ============================================================================
// ANIMATION CONFIGURATION
// ============================================================================

const ANIMATION_CONFIG = {
  // Timing
  sectionFadeDuration: 1.5,
  contentAnimationDuration: 1.2,
  
  // Easing
  sectionEase: "power2.inOut",
  contentEase: "power2.out",
  
  // Delays
  contentDelay: 0.3,
  staggerDelay: 0.1,
} as const;

// ============================================================================
// UNIFIED ANIMATION SYSTEM
// ============================================================================

export class UnifiedAnimationSystem {
  private elements: SectionElements;
  
  constructor(elements: SectionElements) {
    this.elements = elements;
  }
  
  // ============================================================================
  // MAIN NAVIGATION FUNCTION
  // ============================================================================
  
  navigateToSection(
    currentSection: number,
    targetSection: number,
    onComplete: AnimationCallback
  ) {
    if (targetSection < 0 || targetSection >= 3) return;
    
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 500);
      }
    });
    
    // Step 1: Exit current section
    this.exitSection(currentSection, tl);
    
    // Step 2: Enter target section
    this.enterSection(targetSection, tl);
  }
  
  // ============================================================================
  // SECTION EXIT ANIMATIONS
  // ============================================================================
  
  private exitSection(sectionIndex: number, tl: gsap.core.Timeline) {
    switch (sectionIndex) {
      case 0:
        this.exitHero(tl);
        break;
      case 1:
        this.exitAbout(tl);
        break;
      case 2:
        this.exitWork(tl);
        break;
    }
  }
  
  private exitHero(tl: gsap.core.Timeline) {
    const { heroRef, heroGlassContainer, heroParagraph, heroButtons } = this.elements;
    
    // Exit content elements
    if (heroGlassContainer) {
      tl.to(heroGlassContainer, {
        y: -100,
        opacity: 0,
        scale: 0.8,
        duration: ANIMATION_CONFIG.contentAnimationDuration,
        ease: ANIMATION_CONFIG.contentEase
      });
    }
    
    if (heroParagraph) {
      tl.to(heroParagraph, {
        y: -60,
        opacity: 0,
        scale: 0.9,
        duration: ANIMATION_CONFIG.contentAnimationDuration,
        ease: ANIMATION_CONFIG.contentEase
      }, "-=1.5");
    }
    
    if (heroButtons) {
      tl.to(heroButtons, {
        y: -40,
        opacity: 0,
        scale: 0.9,
        duration: ANIMATION_CONFIG.contentAnimationDuration,
        ease: ANIMATION_CONFIG.contentEase
      }, "-=1.5");
    }
    
    // Exit section container
    if (heroRef) {
      tl.to(heroRef, {
        opacity: 0,
        duration: ANIMATION_CONFIG.sectionFadeDuration,
        ease: ANIMATION_CONFIG.sectionEase
      }, "-=1.5");
    }
  }
  
  private exitAbout(tl: gsap.core.Timeline) {
    const { aboutRef, aboutTitle, aboutLeftContent, aboutStatItems } = this.elements;
    
    // Exit content elements
    if (aboutTitle) {
      tl.to(aboutTitle, {
        opacity: 0,
        y: -50,
        duration: ANIMATION_CONFIG.contentAnimationDuration,
        ease: ANIMATION_CONFIG.contentEase
      });
    }
    
    if (aboutLeftContent) {
      tl.to(aboutLeftContent, {
        x: -100,
        opacity: 0,
        yPercent: -20,
        duration: ANIMATION_CONFIG.contentAnimationDuration,
        ease: ANIMATION_CONFIG.contentEase
      }, "-=1.5");
    }
    
    if (aboutStatItems) {
      tl.to(aboutStatItems, {
        opacity: 0,
        scaleY: 0,
        duration: ANIMATION_CONFIG.contentAnimationDuration,
        ease: ANIMATION_CONFIG.contentEase,
        stagger: ANIMATION_CONFIG.staggerDelay
      }, "-=1.8");
    }
    
    // Exit section container
    if (aboutRef) {
      tl.to(aboutRef, {
        opacity: 0,
        duration: ANIMATION_CONFIG.sectionFadeDuration,
        ease: ANIMATION_CONFIG.sectionEase
      }, "-=1.5");
    }
  }
  
  private exitWork(tl: gsap.core.Timeline) {
    const { workRef, workTitle } = this.elements;
    
    // Exit content elements
    if (workTitle) {
      tl.to(workTitle, {
        opacity: 0,
        y: -50,
        duration: ANIMATION_CONFIG.contentAnimationDuration,
        ease: ANIMATION_CONFIG.contentEase
      });
    }
    
    // Exit section container
    if (workRef) {
      tl.to(workRef, {
        opacity: 0,
        duration: ANIMATION_CONFIG.sectionFadeDuration,
        ease: ANIMATION_CONFIG.sectionEase
      }, "-=1.5");
    }
  }
  
  // ============================================================================
  // SECTION ENTER ANIMATIONS
  // ============================================================================
  
  private enterSection(sectionIndex: number, tl: gsap.core.Timeline) {
    switch (sectionIndex) {
      case 0:
        this.enterHero(tl);
        break;
      case 1:
        this.enterAbout(tl);
        break;
      case 2:
        this.enterWork(tl);
        break;
    }
  }
  
  private enterHero(tl: gsap.core.Timeline) {
    const { heroRef, heroGlassContainer, heroParagraph, heroButtons } = this.elements;
    
    // Show section container
    if (heroRef) {
      tl.to(heroRef, {
        opacity: 1,
        duration: 3,
        ease: ANIMATION_CONFIG.sectionEase
      });
    }
    
    // Reset content elements
    this.resetHeroElements();
    
    // Animate content elements
    if (heroGlassContainer) {
      tl.to(heroGlassContainer, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: ANIMATION_CONFIG.contentAnimationDuration,
        ease: ANIMATION_CONFIG.contentEase
      }, "-=2");
    }
    
    if (heroParagraph) {
      tl.to(heroParagraph, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: ANIMATION_CONFIG.contentAnimationDuration,
        ease: ANIMATION_CONFIG.contentEase
      }, "-=1.8");
    }
    
    if (heroButtons) {
      tl.to(heroButtons, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: ANIMATION_CONFIG.contentAnimationDuration,
        ease: ANIMATION_CONFIG.contentEase
      }, "-=1.6");
    }
  }
  
  private enterAbout(tl: gsap.core.Timeline) {
    const { aboutRef, aboutTitle, aboutLeftContent, aboutStatItems } = this.elements;
    
    // Show section container
    if (aboutRef) {
      tl.to(aboutRef, {
        opacity: 1,
        duration: 2,
        ease: ANIMATION_CONFIG.sectionEase
      });
    }
    
    // Reset content elements
    this.resetAboutElements();
    
    // Animate content elements
    if (aboutTitle) {
      tl.to(aboutTitle, {
        opacity: 1,
        y: 0,
        duration: ANIMATION_CONFIG.contentAnimationDuration,
        ease: ANIMATION_CONFIG.contentEase
      }, "-=0.5");
    }
    
    if (aboutLeftContent) {
      tl.to(aboutLeftContent, {
        x: 0,
        opacity: 1,
        yPercent: 0,
        duration: ANIMATION_CONFIG.contentAnimationDuration,
        ease: ANIMATION_CONFIG.contentEase
      }, "-=0.8");
    }
    
    if (aboutStatItems) {
      tl.to(aboutStatItems, {
        opacity: 1,
        scaleY: 1,
        duration: 0.8,
        ease: ANIMATION_CONFIG.contentEase,
        stagger: ANIMATION_CONFIG.staggerDelay
      }, "-=1");
    }
  }
  
  private enterWork(tl: gsap.core.Timeline) {
    const { workRef, workTitle } = this.elements;
    
    // Show section container
    if (workRef) {
      tl.to(workRef, {
        opacity: 1,
        duration: 2,
        ease: ANIMATION_CONFIG.sectionEase
      });
    }
    
    // Reset content elements
    this.resetWorkElements();
    
    // Animate content elements
    if (workTitle) {
      tl.to(workTitle, {
        opacity: 1,
        y: 0,
        duration: ANIMATION_CONFIG.contentAnimationDuration,
        ease: ANIMATION_CONFIG.contentEase
      }, "-=1.5");
    }
  }
  
  // ============================================================================
  // ELEMENT RESET FUNCTIONS
  // ============================================================================
  
  private resetHeroElements() {
    const { heroGlassContainer, heroParagraph, heroButtons } = this.elements;
    
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
  }
  
  private resetAboutElements() {
    const { aboutTitle, aboutLeftContent, aboutStatItems } = this.elements;
    
    if (aboutTitle) {
      gsap.set(aboutTitle, {
        opacity: 0,
        y: -30
      });
    }
    
    if (aboutLeftContent) {
      gsap.set(aboutLeftContent, {
        x: 100,
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
  }
  
  private resetWorkElements() {
    const { workTitle } = this.elements;
    
    if (workTitle) {
      gsap.set(workTitle, {
        opacity: 0,
        y: -30
      });
    }
  }
  
  // ============================================================================
  // INITIALIZATION
  // ============================================================================
  
  initializeAnimations() {
    const { heroRef, aboutRef, workRef } = this.elements;
    
    if (!heroRef || !aboutRef || !workRef) return;
    
    // Set initial states
    gsap.set(heroRef, { opacity: 1 });
    gsap.set(aboutRef, { 
      opacity: 0,
      backgroundColor: "#0A0A0A"
    });
    gsap.set(workRef, { 
      opacity: 0,
      backgroundColor: "#0A0A0A"
    });
  }
}

// ============================================================================
// FACTORY FUNCTION
// ============================================================================

export const createUnifiedAnimations = (elements: SectionElements) => {
  const animationSystem = new UnifiedAnimationSystem(elements);
  
  return {
    navigateToSection: animationSystem.navigateToSection.bind(animationSystem),
    initializeAnimations: animationSystem.initializeAnimations.bind(animationSystem)
  };
}; 