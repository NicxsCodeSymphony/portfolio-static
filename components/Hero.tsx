"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import TechMarquee from "./ui/marquee";
import {useEffect, useRef} from "react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {

    const overlayRef = useRef<HTMLDivElement>(null);


  useGSAP(() => {

      gsap.fromTo(
          overlayRef.current,
          { scaleY: 1 },
          {
              scaleY: 0,
              transformOrigin: "top center",
              duration: 1.2,
              ease: "power4.out",
              delay: 0.2,
          }
      );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".wrapper",
        start: "top top",
        end: "+=500%",
        pin: true,
        scrub: true,
      },
    });

    tl
      .fromTo(
        ".yeah",
        {
          scale: 5,
          z: 0,
        },
        {
          scale: 1,
          z: 0,
          transformOrigin: "center center",
          ease: "power1.inOut",
          duration: 3,
        }
      )
      .to(
        ".content",
        {
          opacity: 0,
          scale: 0.8,
          ease: "power1.inOut",
          duration: 1,
        },
        1
      )
      .fromTo(
        ".video-frame",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          scale: 1,
          ease: "power2.out",
          duration: 1.5,
        },
        1
      );
  }, []);

  return (
    <>

        <div
            className="absolute top-0 left-0 w-full h-full bg-[#EFF2E8] z-40"
            ref={overlayRef}
            style={{ transform: "scaleY(1)", transformOrigin: "top center" }}
        ></div>


        <section className="wrapper relative">
        <div className="relative w-full h-screen z-20">
          <Image src="/sample.jpg" alt="hero" fill className="object-cover yeah" />

          <div className="absolute top-[22%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center xl:w-[42%] z-10 content">
            <h1 className="text-2xl md:text-5xl" style={{ fontFamily: "Inter, sans-serif" }}>
            I deliver reliable, user-friendly websites and apps for real needs.
            </h1>
            <p
              className="mt-8 text-xs uppercase tracking-widest text-slate-300"
              style={{ fontFamily: "Courier New" }}
            >
              Tech Stacks
            </p>
            <TechMarquee />
          </div>
        </div>

        {/* Iframe container */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-black text-2xl font-bold z-30">
          <iframe
            src="https://www.youtube.com/embed/bAkNOmAlyLk?si=SJuT3NKl9Di4hzXI"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="video-frame transition-transform duration-300 w-[60vw] h-[34vw] max-w-[960px] max-h-[540px]"
            style={{
              transform: "scale(0)",
              opacity: 0,
            }}
          ></iframe>
        </div>
      </section>
    </>
  );
};

export default Hero;
