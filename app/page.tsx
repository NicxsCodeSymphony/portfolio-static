import Hero from "@/components/Hero"
import ReactLenis from "lenis/react";
import About from "@/components/About"
import Projects from "@/components/Projects"

export default function Home() {
  return (
      <ReactLenis root>
      <main>
        <Hero />
          <About />
          <Projects />
      </main>
      </ReactLenis>
  );
}
