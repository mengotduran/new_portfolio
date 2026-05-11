import React, { useState, useEffect } from "react";
import './Profile.css';
import ScrollService from "../../../utilities/ScrollService";

const steps = [
  "Front End Developer 💻",
  "React & Next.js Expert ⚛️",
  "UI/UX Enthusiast 🎨",
  "TypeScript Developer 🔷",
  "Cross Platform Dev 🌐",
];

export default function Profile() {
  const [currentStep, setCurrentStep]     = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting]       = useState(false);
  const [typingSpeed, setTypingSpeed]     = useState(100);

  useEffect(() => {
    const fullText = steps[currentStep];
    const handleTyping = () => {
      setDisplayedText((prev) =>
        isDeleting
          ? fullText.substring(0, prev.length - 1)
          : fullText.substring(0, prev.length + 1)
      );
      setTypingSpeed(isDeleting ? 45 : 100);
    };

    const t = setTimeout(handleTyping, typingSpeed);

    if (!isDeleting && displayedText === fullText) {
      setTimeout(() => setIsDeleting(true), 1400);
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }

    return () => clearTimeout(t);
  }, [displayedText, isDeleting, typingSpeed, currentStep]);

  return (
    <div className="profile-container">
      <div className="profile-parent">
        {/* ── Left: text ── */}
        <div className="profile-details">
          <div className="colz">
            <div className="colz-icon">
              <a href="https://web.facebook.com/mengot.duran.7" target="_blank" rel="noreferrer">
                <i className="fa fa-facebook-square" />
              </a>
              <a href="mailto:duranmegot801@gmail.com" target="_blank" rel="noreferrer">
                <i className="fa fa-google-plus-square" />
              </a>
              <a href="https://www.instagram.com/mengot_duran/" target="_blank" rel="noreferrer">
                <i className="fa fa-instagram" />
              </a>
              <a href="https://twitter.com/home" target="_blank" rel="noreferrer">
                <i className="fa fa-twitter" />
              </a>
            </div>
          </div>

          <div className="profile-details-name">
            <span className="primary-text">
              Hello, I'm <span className="highlighted-text">Duran</span>
            </span>
          </div>

          <div className="profile-details-role">
            <span className="primary-text">
              <h1>
                {displayedText}
                <span className="cursor" />
              </h1>
              <span className="profile-role-tagline">
                Building high-quality web applications with precision &amp; passion
              </span>
            </span>
          </div>

          <div className="profile-options">
            <button
              className="btn highlighted-btn"
              onClick={() => ScrollService.scrollHandler.scrollToHireMe()}
            >
              Hire Me
            </button>
            <a href="Mengot_Duran_CV.pdf" download="Mengot_Duran_CV.pdf">
              <button className="btn primary-btn">Get Resume</button>
            </a>
          </div>
        </div>

        {/* ── Right: photo ── */}
        <div className="profile-picture">
          <div className="profile-picture-background" />
        </div>
      </div>
    </div>
  );
}
