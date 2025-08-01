"use client"

import Hero from "@/components/Hero";
import About from "@/components/About";
import {useRef} from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const Sections = () => {

    const containerRef = useRef<HTMLElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!heroRef.current || !aboutRef.current) return;
        
        // Initial setup
        gsap.set(aboutRef.current, { 
            opacity: 0,
            backgroundColor: "#0A0A0A"
        });
        
        // Set initial state for About section elements
        gsap.set(aboutRef.current.querySelector('.left-content'), {
            x: 50,
            opacity: 0,
            yPercent: 20
        });
        
        gsap.set(aboutRef.current.querySelectorAll('.stat-item'), {
            opacity: 0,
            scaleY: 0,
            transformOrigin: "top center"
        });
        
        gsap.set(aboutRef.current.querySelector('h3'), {
            opacity: 0,
            y: -30
        });
        
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=2000",
                scrub: 1,
                pin: true,
                anticipatePin: 1
            }
        });

        // Hero section fade out animations
        tl.to(heroRef.current.querySelector('.glass-text-container'), {
            y: -80,
            opacity: 0,
            scale: 0.9,
            duration: 2,
            ease: "power3.in"
        })
        .to(heroRef.current.querySelector('p'), {
            y: -40,
            opacity: 0,
            scale: 0.95,
            duration: 2,
            ease: "power2.in"
        }, "-=1.5")
        .to(heroRef.current.querySelector('.flex.gap-6'), {
            y: -20,
            opacity: 0,
            scale: 0.95,
            duration: 2,
            ease: "power2.in"
        }, "-=1.5")
        .to(heroRef.current, {
            opacity: 0,
            duration: 1
        }, "-=1")
        
        // About section fade in
        .to(aboutRef.current, {
            opacity: 1,
            duration: 1
        }, "-=0.5")
        
        // About section title animation
        .to(aboutRef.current.querySelector('h3'), {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out"
        }, "-=0.5")
        
        // About section content animation
        .to(aboutRef.current.querySelector('.left-content'), {
            x: 0,
            opacity: 1,
            yPercent: 0,
            duration: 1.5,
            ease: "power2.out"
        }, "-=0.3")
        
        // Stats animation
        .to(aboutRef.current.querySelectorAll('.stat-item'), {
            opacity: 1,
            scaleY: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.15
        }, "-=0.5")
        
        // Hold the About section for a moment
        .to({}, { duration: 1 })
        
        // About section fade out (for smooth transition to next section)
        .to(aboutRef.current.querySelector('.left-content'), {
            x: -50,
            opacity: 0,
            yPercent: -20,
            duration: 1.5,
            ease: "power2.in"
        })
        .to(aboutRef.current.querySelectorAll('.stat-item'), {
            opacity: 0,
            scaleY: 0,
            duration: 0.8,
            ease: "power2.in",
            stagger: 0.1
        }, "-=1.2")
        .to(aboutRef.current.querySelector('h3'), {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power2.in"
        }, "-=1")
        .to(aboutRef.current, {
            opacity: 0,
            duration: 1
        }, "-=0.5");

    }, [])

    return(
        <section className="h-screen relative overflow-hidden bg-[#0A0A0A]" ref={containerRef}>
            <div ref={heroRef} className="absolute inset-0">
                <Hero />
            </div>
            <div ref={aboutRef} className="absolute inset-0">
                <About />
            </div>
        </section>
    )

}

export default Sections