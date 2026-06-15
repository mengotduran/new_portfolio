import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import "./Project.css";

import { projects } from "./projectsData";

const carouselOptions = {
  loop: true,
  margin: 16,
  nav: true,
  dots: true,
  autoplay: false,
  smartSpeed: 800,
  responsive: {
    0: { items: 1 },
    600: { items: 2 },
    1000: { items: 3 },
  },
};

export default function Project(props) {
  useEffect(() => {
    const fadeInSubscription = ScrollService.currentScreenFadeIn.subscribe(
      (screen) => {
        if (screen.fadeInScreen !== props.id) return;
        Animations.animations.fadeInScreen(props.id);
      }
    );
    return () => fadeInSubscription.unsubscribe();
  }, [props.id]);

  return (
    <div className="projects-section fade-in" id={props.id || ""}>
      <ScreenHeading title={"Projects"} subHeading={"Sample Projects Built"} />
      <div className="container">
        <OwlCarousel className="owl-carousel" {...carouselOptions}>
          {projects.map((project) => (
            <Link
              key={project.id}
              className="project-card"
              to={`/projects/${project.id}`}
            >
              {project.image ? (
                <img src={project.image} alt={project.title} />
              ) : (
                <div className="project-placeholder">
                  <span className="project-loader" />
                  <span className="project-placeholder-text">Coming Soon</span>
                </div>
              )}
              <div className="project-overlay">
                {project.badge && (
                  <span className={`project-badge${project.comingSoon ? " coming-soon" : ""}`}>
                    {project.comingSoon && <span className="project-loader small" />}
                    {project.badge}
                  </span>
                )}
                <h5 className="project-title">{project.title}</h5>
                {project.description && (
                  <p className="project-description">{project.description}</p>
                )}
                <div className="project-links">
                  <span className="project-link-btn live">View Details</span>
                </div>
              </div>
            </Link>
          ))}
        </OwlCarousel>
      </div>
    </div>
  );
}
