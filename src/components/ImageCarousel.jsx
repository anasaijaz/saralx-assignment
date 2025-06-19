"use client";

import { useState, useEffect, useRef } from "react";
import { Slide } from "react-slideshow-image";
import "./ImageCarousel.css";
import "react-slideshow-image/dist/styles.css";

import Image1 from "../assets/carousel-slides/1.jpg";
import Image2 from "../assets/carousel-slides/2.jpg";
import Image3 from "../assets/carousel-slides/3.jpg";
import Image4 from "../assets/carousel-slides/4.jpg";
import Image5 from "../assets/carousel-slides/5.jpg";
import { HiArrowLeft, HiArrowRight, HiPlay, HiPause } from "react-icons/hi";

const ImageCarousel = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const slideRef = useRef(null);
  const announceRef = useRef(null);

  const slideImages = [
    {
      url: Image1,
      caption: "Icelandic Turf Houses",
      description:
        "Traditional Icelandic turf houses nestled in lush green hills, blending harmoniously with nature",
      alt: "Dark wooden turf houses with grass-covered roofs surrounded by green meadows and hills in Iceland",
    },
    {
      url: Image2,
      caption: "Modern Suburban Home",
      description:
        "Aerial view of a well-maintained suburban house with a large lawn and trees during autumn",
      alt: "Top-down aerial view of a suburban home with a circular driveway, green lawns, and fall-colored trees",
    },
    {
      url: Image3,
      caption: "Cabin in the Mountains",
      description:
        "Rustic cabin with a grass roof overlooking a scenic mountain range under a partly cloudy sky",
      alt: "Wooden cabin with a grassy roof set on a hilltop with mountains and clouds in the background",
    },
    {
      url: Image4,
      caption: "Alpine House in Mist",
      description:
        "Old alpine farmhouse surrounded by dark clouds and snowy mountains in a dramatic moody setting",
      alt: "Weathered mountain house on a grassy slope with mist and snowy peaks in the background",
    },
    {
      url: Image5,
      caption: "Cozy Forest Cabin",
      description:
        "Log cabin tucked into a quiet forest clearing with warm lights glowing through the windows",
      alt: "Wooden log cabin surrounded by trees and autumn leaves, warmly lit from inside in a peaceful forest",
    },
  ];

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Custom accessible indicators
  const indicators = (index) => {
    const isActive = index === currentSlide;
    return (
      <button
        className={`indicator w-12 h-12 mx-1 mb-2 border-2 font-bold text-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white ${
          isActive
            ? "bg-black text-white border-white"
            : "bg-transparent text-gray-400 border-white hover:bg-white hover:text-black"
        }`}
        aria-label={`Go to slide ${index + 1}: ${slideImages[index]?.caption}`}
        aria-current={isActive ? "true" : "false"}
        role="tab"
        tabIndex={isActive ? 0 : -1}
        title={`Slide ${index + 1}: ${slideImages[index]?.caption}`}
      >
        <span aria-hidden="true">{index + 1}</span>
        <span className="sr-only">{isActive ? "(current slide)" : ""}</span>
      </button>
    );
  };

  // Respect reduced motion preference
  const slideProperties = {
    duration: prefersReducedMotion ? 8000 : 3000, // Slower autoplay for reduced motion
    autoplay: isPlaying && !prefersReducedMotion, // Disable autoplay for reduced motion
    transitionDuration: prefersReducedMotion ? 100 : 500, // Faster transitions for reduced motion
    arrows: false,
    infinite: true,
    easing: "ease",
    indicators: indicators,
    pauseOnHover: true,
    onChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
      // Announce slide change to screen readers
      if (announceRef.current) {
        announceRef.current.textContent = `Slide ${newIndex + 1} of ${
          slideImages.length
        }: ${slideImages[newIndex].caption}`;
      }
    },
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Navigation functions
  const goToPrevious = () => {
    if (slideRef.current) {
      slideRef.current.goBack();
    }
  };

  const goToNext = () => {
    if (slideRef.current) {
      slideRef.current.goNext();
    }
  };

  // Keyboard navigation
  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        goToPrevious();
        break;
      case "ArrowRight":
        event.preventDefault();
        goToNext();
        break;
      case " ":
      case "Enter":
        event.preventDefault();
        togglePlayPause();
        break;
      case "Home":
        event.preventDefault();
        // Go to first slide
        if (slideRef.current) {
          slideRef.current.goTo(0);
        }
        break;
      case "End":
        event.preventDefault();
        // Go to last slide
        if (slideRef.current) {
          slideRef.current.goTo(slideImages.length - 1);
        }
        break;
    }
  };

  return (
    <section
      className="max-w-4xl mx-auto p-8 bg-white border-4 border-black shadow-2xl"
      aria-label="Image Carousel"
      role="region"
    >
      {/* Screen Reader Instructions */}
      <div className="sr-only">
        <p>
          Image carousel with {slideImages.length} slides. Use arrow keys to
          navigate, spacebar to play/pause, Home to go to first slide, End to go
          to last slide. Use Tab to navigate to slide indicators.
        </p>
      </div>

      {/* Live Region for Announcements */}
      <div
        ref={announceRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        Slide {currentSlide + 1} of {slideImages.length}:{" "}
        {slideImages[currentSlide]?.caption}
      </div>

      {/* Carousel Status */}
      <div className="flex justify-between items-center mb-6 p-4 bg-black text-white">
        <div className="text-lg font-bold" aria-live="polite">
          Slide {currentSlide + 1} of {slideImages.length}
          {prefersReducedMotion && (
            <span className="ml-2 bg-white text-black px-2 py-1 text-sm">
              (Reduced motion mode)
            </span>
          )}
        </div>

        {/* Navigation and Play/Pause Controls */}
        <div className="flex items-center gap-2">
          {/* Previous Button */}
          <button
            className="px-4 py-3 font-bold text-lg flex items-center bg-white text-black border-2 border-white hover:bg-gray-200 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white"
            onClick={goToPrevious}
            aria-label="Go to previous slide"
            title="Previous slide"
          >
            <HiArrowLeft aria-hidden="true" />
            <span className="ml-1">PREV</span>
          </button>

          {/* Play/Pause Button */}
          <button
            className={`px-6 py-3 font-bold text-lg flex items-center border-2 transition-all duration-200 focus:outline-none focus:ring-4 ${
              isPlaying
                ? "bg-white text-black border-white hover:bg-gray-200 focus:ring-white"
                : "bg-white text-black border-white hover:bg-gray-200 focus:ring-white"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            onClick={togglePlayPause}
            aria-label={
              isPlaying
                ? "Pause automatic slideshow"
                : "Start automatic slideshow"
            }
            aria-pressed={isPlaying}
            disabled={prefersReducedMotion}
            title={
              prefersReducedMotion
                ? "Autoplay disabled due to reduced motion preference"
                : undefined
            }
          >
            {isPlaying ? (
              <HiPause size={24} aria-hidden="true" />
            ) : (
              <HiPlay size={24} aria-hidden="true" />
            )}
            {/* <span aria-hidden="true">{isPlaying ? "⏸️" : "▶️"}</span> */}
            <span className="ml-2">{isPlaying ? "PAUSE" : "PLAY"}</span>
          </button>

          {/* Next Button */}
          <button
            className="px-4 py-3 font-bold text-lg flex items-center bg-white text-black border-2 border-white hover:bg-gray-200 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white"
            onClick={goToNext}
            aria-label="Go to next slide"
            title="Next slide"
          >
            <span className="mr-1">NEXT</span>
            <HiArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div
        className="relative border-4 border-black overflow-hidden focus-within:ring-4 focus-within:ring-black"
        onKeyDown={handleKeyDown}
        tabIndex="0"
        role="application"
        aria-label="Image slideshow. Use arrow keys to navigate between slides."
        aria-describedby="carousel-instructions"
      >
        <div id="carousel-instructions" className="sr-only">
          Use left and right arrow keys to navigate slides, spacebar to toggle
          autoplay, Home key for first slide, End key for last slide. Tab to
          access slide indicators.
        </div>

        <Slide ref={slideRef} {...slideProperties}>
          {slideImages.map((slideImage, index) => (
            <div
              key={index}
              className="relative h-96"
              role="group"
              aria-label={`Slide ${index + 1} of ${slideImages.length}`}
            >
              <div className="relative w-full h-full">
                <img
                  src={slideImage.url || "/placeholder.svg"}
                  alt={slideImage.alt}
                  className="w-full h-full object-cover block"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black text-white p-6 border-t-4 border-white">
                  <h3
                    className="text-2xl font-bold mb-2"
                    id={`slide-title-${index}`}
                  >
                    {slideImage.caption}
                  </h3>
                  <p
                    className="text-base font-medium"
                    id={`slide-desc-${index}`}
                  >
                    {slideImage.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slide>
      </div>
    </section>
  );
};

export default ImageCarousel;
