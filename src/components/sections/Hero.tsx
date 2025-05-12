"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface HeroSlide {
  id: number;
  image: string;
  title: string;
  description: string;
}

const slides: HeroSlide[] = [
  {
    id: 1,
    image: "/static/thinkingman.jpg",
    title: "Discover What Others Think About You!",
    description:
      "Get genuine, anonymous feedback to become the best version of yourself.",
  },
  {
    id: 2,
    image: "/static/womanthinking.jpg",
    title: "Honest Feedback, Without the Awkwardness",
    description: "Anonymity ensures truthfulness—learn what they really think.",
  },
  {
    id: 3,
    image: "/static/thinking2.jpg",
    title: "What Do They Really Think About You?",
    description:
      "Discover the truth with anonymous feedback—secure, private, and honest.",
  },
];

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="relative w-full h-[600px] bg-gradient-to-r from-blue-50 to-indigo-50">
      {/* Slides */}
      <div className="overflow-hidden h-full">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="min-w-full flex-shrink-0 relative"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
                <div className="max-w-3xl text-center">
                  <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fadeIn">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                    {slide.description}
                  </p>
                  <Link href="/sign-up">
                    <Button
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Get Started Free
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 text-gray-800 p-3 rounded-full shadow-lg hover:bg-white transition-all"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 text-gray-800 p-3 rounded-full shadow-lg hover:bg-white transition-all"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-0 right-0">
        <div className="flex justify-center space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
