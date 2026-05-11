import React, { useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import "./Project.css";

import cocktail from "../../../src/Img/Testimonial/cocktail.png";
import accordation from "../../../src/Img/Testimonial/accordation.png";
import colorgen from "../../../src/Img/Testimonial/colorGen.png";
import tour from "../../../src/Img/Testimonial/Tour.png";
import textGen from "../../../src/Img/Testimonial/textGen.png";
import tabs from "../../../src/Img/Testimonial/tabs.png";
import stripe from "../../../src/Img/Testimonial/stripe.png";
import sidebar from "../../../src/Img/Testimonial/sidebar.png";
import reviews from "../../../src/Img/Testimonial/reviews.png";
import Eze from "../../../src/Img/Testimonial/eze.png";
import miq from "../../../src/Img/Testimonial/dina.png";
import sema01 from "../../../src/Img/Testimonial/sema.png";

const projects = [
  {
    id: "miq",
    title: "MiQ",
    description: "Professional client project",
    badge: "Client Work",
    image: miq,
    live: "https://www.kaeyros.org/de",
  },
  {
    id: "sema",
    title: "SEMA",
    description: "Professional client project",
    badge: "Client Work",
    image: sema01,
    live: "https://sema.sem-a.com/y",
  },
  {
    id: "eze",
    title: "Eze",
    description: "Professional client project",
    badge: "Client Work",
    image: Eze,
    live: "https://eze.ink/",
  },
  {
    id: "cocktail",
    title: "CockTails",
    description: "Browse and explore various cocktail recipes and drink details",
    image: cocktail,
    live: "https://duranscocktail.netlify.app/",
    source: "https://github.com/mengotduran/cocktail",
  },
  {
    id: "colorgen",
    title: "ColorGen",
    description: "Search, copy and paste colors with ease",
    image: colorgen,
    live: "https://duranscolorgen.netlify.app/",
    source: "https://github.com/mengotduran/color-generator",
  },
  {
    id: "accordation",
    title: "Accordion",
    description: "Toggle to show or hide content sections",
    image: accordation,
    live: "https://duransaccordation.netlify.app/",
    source: "https://github.com/mengotduran/accordation",
  },
  {
    id: "tour",
    title: "Tour",
    description: "Nice tour images and destination info",
    image: tour,
    live: "https://duranstour.netlify.app/",
    source: "https://github.com/mengotduran/Tours",
  },
  {
    id: "textGen",
    title: "TextGen",
    description: "Generate placeholder text on demand",
    image: textGen,
    live: "https://duranstextgen.netlify.app/",
    source: "https://github.com/mengotduran/text-generator",
  },
  {
    id: "tabs",
    title: "Tabs",
    description: "Tabbed content switcher built with React",
    image: tabs,
    live: "https://durantabs.netlify.app/",
    source: "https://github.com/mengotduran/react-tabs",
  },
  {
    id: "stripe",
    title: "Stripe Menu",
    description: "Stripe landing page clone with animated nav",
    image: stripe,
    live: "https://duranstripemenu.netlify.app/",
    source: "https://github.com/mengotduran/stripeMenu",
  },
  {
    id: "sidebar",
    title: "Sidebar",
    description: "Animated sidebar and modal UI component",
    image: sidebar,
    live: "https://duransidebar.netlify.app/",
    source: "https://github.com/mengotduran/sidebar-modal",
  },
  {
    id: "reviews",
    title: "Reviews",
    description: "Slide through user reviews and testimonials",
    image: reviews,
    live: "https://duranreviews.netlify.app/",
    source: "https://github.com/mengotduran/reviews.react",
  },
];

const carouselOptions = {
  loop: true,
  margin: 16,
  nav: true,
  dots: true,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
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
            <a
              key={project.id}
              className="project-card"
              href={project.live}
              target="_blank"
              rel="noreferrer"
            >
              <img src={project.image} alt={project.title} />
              <div className="project-overlay">
                {project.badge && (
                  <span className="project-badge">{project.badge}</span>
                )}
                <h5 className="project-title">{project.title}</h5>
                {project.description && (
                  <p className="project-description">{project.description}</p>
                )}
                <div className="project-links">
                  <span className="project-link-btn live">Live Demo</span>
                  {project.source && (
                    <span
                      className="project-link-btn source"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(project.source, "_blank");
                      }}
                    >
                      Source Code
                    </span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </OwlCarousel>
      </div>
    </div>
  );
}
