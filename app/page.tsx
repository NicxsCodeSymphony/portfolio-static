import Hero from "@/components/Hero"
import ReactLenis from "lenis/react";

export default function Home() {
  return (
      <ReactLenis root>
      <main>
        <Hero />
      </main>
      </ReactLenis>
  );
}
