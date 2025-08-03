'use client'

import {useState} from "react";
import ReactLenis from 'lenis/react'

import Loading from '@/components/ui/Loading'
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";

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
                    <Work />
                    </>
                )}
            </main>
        </ReactLenis>
    )

}

export default Home
