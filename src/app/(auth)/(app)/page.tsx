"use client";
import React from "react";

// Import section components
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Features from "@/components/sections/Features";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";

function Home() {
  return (
    <div className="min-h-screen flex flex-col ">
      {" "}
      <main className="flex-grow">
        <Hero />
        <About />
        <Features />
        <div id="testimonials">
          <Testimonials />
        </div>
        <FAQ />
        <CTA />
      </main>
    </div>
  );
}

export default Home;
