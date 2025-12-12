import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load components for better performance
const About = lazy(() => import("@/components/About"));
const Projects = lazy(() => import("@/components/Projects"));
const Skills = lazy(() => import("@/components/Skills"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

const SectionSkeleton = () => (
  <div className="py-24 space-y-8">
    <div className="container mx-auto px-4">
      <Skeleton className="h-12 w-64 mx-auto mb-8" />
      <div className="grid md:grid-cols-2 gap-8">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
    </div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Suspense fallback={<SectionSkeleton />}>
        <About />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
