"use client";
import React from "react";

// Import section components
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Features from "@/components/sections/Features";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

function Home() {
  return (
    <div className="min-h-screen flex flex-col pt-16">
      {" "}
      {/* Added padding-top to account for fixed navbar */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Features Section */}
        <Features />

        {/* Testimonials Section */}
        <div id="testimonials">
          <Testimonials />
        </div>

        {/* FAQ Section */}
        <FAQ />

        {/* Call to Action Section */}
        <CTA />
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
