import React, { useEffect } from "react";
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import "./AboutMe.css";

const highlights = [
  "Software Engineer",
  "AI & Machine Learning Researcher",
  "React & Next.js Applications",
  "TypeScript & Vanilla JavaScript",
  "PyTorch & Deep Learning",
  "Artificial Intelligence Systems",
];

const description =
  "Software Engineer and Researcher with a strong background in building intelligent systems and high-performance applications. Passionate about clean code, artificial intelligence, and delivering production-ready solutions that make a real impact.";

export default function AboutMe(props) {
  useEffect(() => {
    const sub = ScrollService.currentScreenFadeIn.subscribe((screen) => {
      if (screen.fadeInScreen !== props.id) return;
      Animations.animations.fadeInScreen(props.id);
    });
    return () => sub.unsubscribe();
  }, [props.id]);

  return (
    <div className="about-me-container screen-container fade-in" id={props.id || ""}>
      <div className="about-me-parent">
        <ScreenHeading title={"About Me"} subHeading={"Why Choose Me?"} />
        <div className="about-me-card">
          <div className="about-me-profile" />
          <div className="about-me-details">
            <span className="about-me-description">{description}</span>
            <div className="about-me-highlights">
              <div className="highlight-heading">Here are a few highlights</div>
              {highlights.map((item, i) => (
                <div className="highlight" key={i}>
                  <div className="highlight-blob" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="about-me-options">
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
        </div>
      </div>
    </div>
  );
}
