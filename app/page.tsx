'use client'
import Hero from "@/components/Hero"
import ReactLenis from "lenis/react";
import About from "@/components/About"
import Projects from "@/components/Projects"
import NavBar from "@/components/Navbar";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Handle hash navigation on page load
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        const elementId = hash.substring(1); // Remove the # symbol
        const element = document.getElementById(elementId);
        if (element) {
          // Small delay to ensure the page is fully loaded
          setTimeout(() => {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }, 100);
        }
      }
    };

    handleHashNavigation();
  }, []);

  return (
      <ReactLenis root>
      <main className="bg-[#F7F3ED]">
        <NavBar />
        <Hero />
          <About />
          <Projects />
      </main>
      </ReactLenis>
  );
}
