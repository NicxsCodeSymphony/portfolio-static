export interface BaseAnimationElements {
    heroRef: HTMLElement | null;
    aboutRef: HTMLElement | null;
    workRef: HTMLElement | null;
}

export interface HeroElements {
    heroGlassContainer: Element | null;
    heroParagraph: Element | null;
    heroButtons: Element | null;
}

export interface AboutElements {
    aboutTitle: Element | null;
    aboutLeftContent: Element | null;
    aboutStatItems: NodeListOf<Element> | null;
}

export interface WorkElements {
    workTitle: Element | null;
}

export interface AnimationElements extends BaseAnimationElements, HeroElements, AboutElements, WorkElements {}

export type SectionIndex = 0 | 1 | 2;
export type AnimationCallback = () => void; 