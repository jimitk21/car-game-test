"use client";

import { useState, useEffect } from "react";
import "./TestimonialsCarousel.css";

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Emma the Explorer",
      avatar: "👧",
      age: 7,
      quote:
        "Clock Kingdom is like a magical fairy tale! Now I can tell time like a real princess and help my family plan our day! ⏰👑",
      favorite: "Clock Kingdom",
      bgColor: "linear-gradient(135deg, #FFE4B5, #FFEAA7)",
    },
    {
      id: 2,
      name: "Jake the Brave",
      avatar: "👦",
      age: 8,
      quote:
        "Math Rangers is the coolest! I defeated the multiplication bandit and got a sheriff badge! The confetti explosion was AMAZING! 🤠",
      favorite: "Math Rangers",
      bgColor: "linear-gradient(135deg, #DEB887, #D2B48C)",
    },
    {
      id: 3,
      name: "Lily the Magical",
      avatar: "👧",
      age: 6,
      quote:
        "The fairy in Fraction Forest taught me how to make the most amazing magical potions! I love mixing fractions with butterflies! ✨🧚‍♀️",
      favorite: "Fraction Forest",
      bgColor: "linear-gradient(135deg, #98FB98, #90EE90)",
    },
    {
      id: 4,
      name: "Alex the Ninja",
      avatar: "🧒",
      age: 9,
      quote:
        "Number Ninjas helped me become a place value master! The peaceful dojo with floating numbers is so cool and calming! 🥷",
      favorite: "Number Ninjas",
      bgColor: "linear-gradient(135deg, #E6E6FA, #D8BFD8)",
    },
    {
      id: 5,
      name: "Zoe the Time Traveler",
      avatar: "👧",
      age: 8,
      quote:
        "I climbed all the way to the top of the Time Traveler's Tower and beat the Time Bandit! The glowing stairways were epic! ⏳",
      favorite: "Time Traveler's Tower",
      bgColor: "linear-gradient(135deg, #FFB6C1, #FFA0B4)",
    },
    {
      id: 6,
      name: "Sam the Scholar",
      avatar: "👦",
      age: 7,
      quote:
        "Every game teaches me something new! I love collecting all the badges and showing them to my friends at school! 📚✨",
      favorite: "All Games",
      bgColor: "linear-gradient(135deg, #87CEEB, #98FB98)",
    },
  ];

  // Create a seamless loop by adding the first few testimonials at the end
  const seamlessTestimonials = [
    ...testimonials,
    testimonials[0],
    testimonials[1],
  ];

  useEffect(() => {
    if (!isAutoScrolling) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 2;
        // When we reach the end, loop back to the beginning
        if (nextIndex >= testimonials.length) {
          return 0;
        }
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoScrolling, testimonials.length]);

  const handlePrevClick = () => {
    const newIndex = currentIndex - 2;
    // Loop to the end when going backwards from the beginning
    setCurrentIndex(newIndex < 0 ? testimonials.length - 2 : newIndex);
    setIsAutoScrolling(false);
    setTimeout(() => setIsAutoScrolling(true), 5000);
  };

  const handleNextClick = () => {
    const newIndex = currentIndex + 2;
    // Loop to the beginning when going forwards from the end
    setCurrentIndex(newIndex >= testimonials.length ? 0 : newIndex);
    setIsAutoScrolling(false);
    setTimeout(() => setIsAutoScrolling(true), 5000);
  };

  const handleCardClick = (testimonial) => {
    // Show detailed journey/achievements
    console.log("Show detailed journey for:", testimonial.name);
  };

  return (
    <section className="testimonials-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="title-text">Why Kids Love EduQuest!</span>
          <div className="title-hearts">
            <span>💖</span>
            <span>✨</span>
            <span>🌟</span>
          </div>
        </h2>
        <p className="section-subtitle">
          Hear from our amazing young adventurers and their magical learning
          journeys!
        </p>
      </div>

      <div className="carousel-container">
        <div className="testimonials-carousel">
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${currentIndex * 50}%)`,
            }}
          >
            {seamlessTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="testimonial-card"
                style={{ background: testimonial.bgColor }}
                onClick={() => handleCardClick(testimonial)}
              >
                <div className="card-glow"></div>

                <div className="avatar-section">
                  <div className="avatar-container">
                    <div className="avatar">{testimonial.avatar}</div>
                    <div className="avatar-glow"></div>
                  </div>
                </div>

                <div className="testimonial-content">
                  <div className="speech-bubble">
                    <div className="quote">"{testimonial.quote}"</div>
                  </div>

                  <div className="testimonial-info">
                    <h4 className="name">{testimonial.name}</h4>
                    <p className="age">Age {testimonial.age}</p>
                    <p className="favorite">❤️ Loves: {testimonial.favorite}</p>
                  </div>
                </div>

                <div className="card-decorations">
                  <div className="floating-hearts">
                    <span className="heart heart-1">💖</span>
                    <span className="heart heart-2">✨</span>
                    <span className="heart heart-3">🌟</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="carousel-navigation">
          <button className="nav-arrow prev-arrow" onClick={handlePrevClick}>
            <span>←</span>
          </button>
          <button className="nav-arrow next-arrow" onClick={handleNextClick}>
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
