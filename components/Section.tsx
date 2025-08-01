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
        
        gsap.set(aboutRef.current, { 
            opacity: 0,
            backgroundColor: "#0A0A0A"
        });
        
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=1500",
                scrub: true,
                pin: true
            }
        });

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
        .to(aboutRef.current, {
            opacity: 1,
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
