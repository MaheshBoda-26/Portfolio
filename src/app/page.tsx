import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Art } from "@/components/sections/art";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Art />
    </>
  );
}