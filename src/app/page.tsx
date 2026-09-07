import { Suspense } from "react";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";

function ProjectsSuspense() {
  return (
    <Suspense fallback={<div className="h-64" />}>
      <Projects />
    </Suspense>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ProjectsSuspense />
      <Contact />
    </>
  );
}