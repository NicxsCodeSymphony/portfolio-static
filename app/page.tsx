"use client"

import gsap from "gsap";
import {ScrollTrigger, SplitText} from "gsap/all";

import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
gsap.registerPlugin(ScrollTrigger, SplitText)

const Home = () => {

    return(
        <main>
            <Navbar />
           <Section />
        </main>
    )
}

export default Home
