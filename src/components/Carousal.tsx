import React, { useState } from "react";

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: "/static/thinkingman.jpg", // Replace with your image path
    title: "Discover What Others Think About You!",
    description:
      "Get genuine, anonymous feedback to become the best version of yourself.",
  },
  {
    id: 2,
    image: "/static/womanthinking.jpg", // Replace with your image path
    title: "Honest Feedback, Without the Awkwardness",
    description: "Anonymity ensures truthfulness—learn what they really think.",
  },
  {
    id: 3,
    image: "/static/thinking2.jpg", // Replace with your image path
    title: "What Do They Really Think About You?",
    description:
      "Discover the truth with anonymous feedback—secure, private, and honest.",
  },
];

const Carousal: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
    <div className="relative w-full max-w-full mx-auto">
      {/* Slides */}
      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform duration-700"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="min-w-full flex-shrink-0 relative"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "top",
                height: "400px",
                objectFit: "contain",
                backgroundRepeat: "no-repeat",
                width: "full-screen",
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
                <h2 className="text-2xl md:text-4xl font-bold">
                  {slide.title}
                </h2>
                <p className="text-lg mt-2">{slide.description}</p>
                <div className="mt-4 flex space-x-4">
                  {/* <button className="bg-white text-black px-4 py-2 rounded-md">
                    Book Now
                  </button> */}
                  <button className="bg-white text-black px-4 py-2 rounded-md">
                    Get started now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-200"
      >
        {/* &#8592; */}
        {"<"}
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-200"
      >
        {/* &#8594; */}
        {">"}
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-black" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousal;
