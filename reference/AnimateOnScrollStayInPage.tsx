"use client"

import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/all";
import {useRef} from "react";

gsap.registerPlugin(ScrollTrigger)

export default function Home() {

    const containerRef = useRef(null);
    const boxRef = useRef(null)

    useGSAP(() => {
        gsap.to(boxRef.current, {
            x: 300,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=1000",
                scrub: true,
                pin: true,
            },
        })
    }, [])

    return (
        <main>
            <section
                ref={containerRef}
                className="h-screen relative bg-gray-100 overflow-hidden">
                <div
                    ref={boxRef}
                    className="w-24 h-24 bg-blue-500 absolute top-1/2 left-0 -translate-y-1/2"></div>
            </section>
        </main>
    )
}
