"use client";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import HeroSection from "./components/HeroSection/HeroSection";
import GameWorldsSection from "./components/GameWorldsSection/GameWorldsSection";
import TestimonialsCarousel from "./components/TestimonialsCarousel/TestimonialsCarousel";
import ParentsTeachersSection from "./components/ParentsTeacherSection/ParentsTeachersSection";
import Footer from "./components/Footer/Footer";
import MusicToggle from "./components/MusicToggle/MusicToggle";
import FloatingIslands from "./components/FloatingIslands/FloatingIslands";
import ClockKingdom from "./components/ClockKingdomGame/ClockKingdomGame";
import MathsRangersGame from "./components/MathsRangerGame/MathsRangersGame";

// Landing Page Component
const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showTerms, setShowTerms] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTermsOpen = () => {
    setShowTerms(true);
  };

  const handleTermsClose = () => {
    setShowTerms(false);
  };

  const handleHelpOpen = () => {
    setShowHelp(true);
  };

  const handleHelpClose = () => {
    setShowHelp(false);
  };

  const handleContactOpen = () => {
    setShowContact(true);
  };

  const handleContactClose = () => {
    setShowContact(false);
  };

  const handleStartClockKingdom = () => {
    navigate("/clock-kingdom");
  };

  const handleStartMathsRangers = () => {
    navigate("/maths-rangers");
  };

  // Hide navigation when any modal is open
  const isAnyModalOpen = showTerms || showHelp || showContact;

  return (
    <div className="App">
      <FloatingIslands scrollY={scrollY} />
      {!isAnyModalOpen && <Navigation onHelpOpen={handleHelpOpen} />}
      <main className="main-content">
        <HeroSection scrollY={scrollY} />
        <GameWorldsSection
          onStartClockKingdom={handleStartClockKingdom}
          onStartMathsRangers={handleStartMathsRangers}
        />
        <TestimonialsCarousel />
        <ParentsTeachersSection />
        <MusicToggle />
        <Footer
          onTermsOpen={handleTermsOpen}
          showTerms={showTerms}
          onTermsClose={handleTermsClose}
          onHelpOpen={handleHelpOpen}
          showHelp={showHelp}
          onHelpClose={handleHelpClose}
          onContactOpen={handleContactOpen}
          showContact={showContact}
          onContactClose={handleContactClose}
        />
      </main>
    </div>
  );
};

// Clock Kingdom Game Component
const ClockKingdomGame = () => {
  const navigate = useNavigate();

  const handleExitGame = () => {
    navigate("/");
  };

  return <ClockKingdom onExitGame={handleExitGame} />;
};

// Math Rangers Game Component
const MathsRangersGamePage = () => {
  const navigate = useNavigate();

  const handleExitGame = () => {
    navigate("/");
  };

  return <MathsRangersGame onExitGame={handleExitGame} />;
};

// Main App Component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/clock-kingdom" element={<ClockKingdomGame />} />
        <Route path="/maths-rangers" element={<MathsRangersGamePage />} />
      </Routes>
    </Router>
  );
}

export default App;
