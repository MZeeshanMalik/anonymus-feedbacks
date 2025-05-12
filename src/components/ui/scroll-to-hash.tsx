"use client";

import { useEffect } from "react";

// This component handles smooth scrolling for hash links
const ScrollToHashElement = () => {
  useEffect(() => {
    // Function to handle scrolling
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          // Add a small delay to ensure the DOM is fully rendered
          setTimeout(() => {
            window.scrollTo({
              top: element.getBoundingClientRect().top + window.scrollY - 100, // Offset for navbar
              behavior: "smooth",
            });
          }, 10);
        }
      }
    };

    // Handle initial load with hash in URL
    if (window.location.hash) {
      handleHashChange();
    }

    // Add event listener for hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Clean up event listener
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return null;
};

export default ScrollToHashElement;
