import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Discover What Others Really Think?
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Join thousands of users who are gaining valuable insights through
          anonymous feedback. Sign up today and start your journey of
          self-discovery and growth.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/sign-up">
            <Button
              size="lg"
              className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-3 rounded-md text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started Free
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-md text-lg font-medium transition-all duration-300"
            >
              Login
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
