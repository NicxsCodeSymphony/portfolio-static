'use client'

import {useState} from "react";
import ReactLenis from 'lenis/react'

import Loading from '@/components/ui/Loading'
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Project from "@/components/Project";

const Home = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleLoadingComplete = () => {
        setIsLoading(false)
    }

    return(
        <ReactLenis root>
            <main>
                {isLoading ? (
                    <Loading onComplete={handleLoadingComplete} />
                ) : (
                    <>
                    <Hero />
                    <About />
                    <Services />
                    <Project />
                    </>
                )}
            </main>
        </ReactLenis>
    )

}

export default Home
