import React, { useState, useEffect } from "react";
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import "./Resume.css";

export default function Resume(props) {
  // const Resume = (props) => {
    
  useEffect(() => {
    const sub = ScrollService.currentScreenFadeIn.subscribe((screen) => {
      if (screen.fadeInScreen !== props.id) return;
      Animations.animations.fadeInScreen(props.id);
    });
    return () => sub.unsubscribe();
  }, [props.id]);

  /* STATES */
  const [selectedBulletIndex, setSelectedBulletIndex] = useState(0);
  const [carousalOffsetStyle, setCarousalOffsetStyle] = useState({});

  /* REUSABLE MINOR COMPONENTS */
  const ResumeHeading = (props) => {
    return (
      <div className="resume-heading">
        <div className="resume-main-heading">
          <div className="heading-bullet"></div>
          <span>{props.heading ? props.heading : ""}</span>
          {props.fromDate && props.toDate ? (
            <div className="heading-date">
              {props.fromDate + "-" + props.toDate}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="resume-sub-heading">
          <span>{props.subHeading ? props.subHeading : ""}</span>
        </div>
        <div className="resume-heading-description">
          <span>{props.description ? props.description : ""}</span>
        </div>
      </div>
    );
  };

  /* STATIC RESUME DATA FOR THE LABELS*/
  const resumeBullets = [
    { label: "Education", logoSrc: "education.svg" },
    { label: "Work History", logoSrc: "work-history.svg" },
    { label: "Programming Skills", logoSrc: "programming-skills.svg" },
    { label: "Projects", logoSrc: "projects.svg" },
    { label: "Interests", logoSrc: "interests.svg" },
  ];

  //here we have
  const programmingSkillsDetails = [
    { skill: "JavaScript",        ratingPercentage: 85 },
    { skill: "Python",            ratingPercentage: 85 },
    { skill: "React JS",          ratingPercentage: 85 },
    { skill: "Next.js",           ratingPercentage: 85 },
    { skill: "TypeScript",        ratingPercentage: 89 },
    { skill: "PyTorch",           ratingPercentage: 75 },
    { skill: "Artificial Intelligence", ratingPercentage: 78 },
    { skill: "Machine Learning",  ratingPercentage: 75 },
    { skill: "Deep Learning",     ratingPercentage: 70 },
    { skill: "Natural Language Processing", ratingPercentage: 68 },
    { skill: "HTML & CSS",        ratingPercentage: 90 },
    { skill: "Tailwind CSS",      ratingPercentage: 89 },
    { skill: "C++",               ratingPercentage: 65 },
    { skill: "C",                 ratingPercentage: 70 },
    { skill: "PHP",               ratingPercentage: 65 },
    { skill: "Node.js",           ratingPercentage: 70 },
  ];

  const projectsDetails = [
    {
      title: "Personal Portfolio Website",
      duration: { fromDate: "2021", toDate: "2021" },
      description:
        "A Personal Portfolio website to showcase all my details and projects at one place.",
      subHeading: "Technologies Used: React JS, Bootsrap",
    },
    {
      title: "Eze Website ",
      duration: { fromDate: "2023", toDate: "2024" },
      description:
        "A Online research website were student and teachers can research and Study",
      subHeading: "Technologies Used:  Next Js, Auth0, Node js",
    },
    {
      title: "ANTD",
      duration: { fromDate: "2023", toDate: "2024" },
      description:
        "Online Racist website, You Can report if you were ever asulted or treated different in a way that makes you unequal to others",
      subHeading: "Technologies Used: Next js, node js, tailwind, typescript.",
    },
  ];

  const resumeDetails = [
    <div className="resume-screen-container" key="education">
      <ResumeHeading
        heading={"CITEC Higher Institute of Technology and Management"}
        subHeading={
          "Higher National Diploma in Computer Sience Hardware and Software Enginerring"
        }
        fromDate={"2019"}
        toDate={"2022"}
      />

      <ResumeHeading
        heading={"Scrimba"}
        subHeading={"Training Students To become Software Developers"}
        fromDate={"2022"}
        toDate={"Present"}
      />
      <ResumeHeading
        heading={"High School "}
        subHeading={"Saint Grace High School, Yaounde Cameroon"}
        fromDate={"2018"}
        toDate={"2019"}
      />
    </div>,

    /* WORK EXPERIENCE */
    <div className="resume-screen-container" key="work-experience">
      <div className="experience-container">
        <ResumeHeading
          heading={"DURAN'S Technoloy"}
          subHeading={"SOFTWARE ENGINEER"}
          fromDate={"2021"}
          toDate={"2024"}
        />
        <div className="experience-description">
          <span className="resume-description-text0">
            Software Engineer 2021-2023 <a href="https://nobisoft.net/" target="_black">NOBISOFT</a>
          </span> <br />
          <span className="resume-description-text0">
            Software Engineer 2023-2024 <a href="https://kaeyros-analytics.com/#/" target="_black">kaeyros-Analytics</a>
          </span>
        </div>
        <div className="experience-description">
          <span className="resume-description-text">
            - Built a research PlatForm where Students, Teachers, and reasearchers can research different moudules linked through Auth0 using SSO
          </span>
          <br />
          <span className="resume-description-text">
            - Built an application using whatsApp Api, with a Chat Session. Users can create scenarios, see transaction history and Create Templates.
          </span>
          <br />
          <span className="resume-description-text">
            - Built an application to send airtime to different Countries
          </span>
          <br />
        </div>
      </div>
    </div>,

    /* PROGRAMMING SKILLS */
    <div
      className="resume-screen-container programming-skills-container"
      key="programming-skills"
    >
      {programmingSkillsDetails.map((skill, index) => (
        <div className="skill-parent" key={index}>
          <div className="heading-bullet"></div>
          <span>{skill.skill}</span>
          <div className="skill-percentage">
            <div
              style={{ '--pct': skill.ratingPercentage + '%', animationDelay: `${index * 0.08}s` }}
              className="active-percentage-bar"
            ></div>
          </div>
        </div>
      ))}
    </div>,

    /* PROJECTS */
    <div className="resume-screen-container" key="projects">
      {projectsDetails.map((projectsDetails, index) => (
        <ResumeHeading
          key={index}
          heading={projectsDetails.title}
          subHeading={projectsDetails.subHeading}
          description={projectsDetails.description}
          fromDate={projectsDetails.duration.fromDate}
          toDate={projectsDetails.duration.toDate}
        />
      ))}
    </div>,

    /* Interests */
    <div className="resume-screen-container" key="interests">
      <ResumeHeading
        heading="Teaching"
        description="Apart from being a tech enthusiast and a code writer, i also love to teach people what i know simply because i believe in sharing."
      />
      <ResumeHeading
        heading="Music"
        description="Listening to soothing music is something i can never compromise with, skimming through Spotify's pop songs charts is at times the best stress reliever that i can get my hands on."
      />
      <ResumeHeading
        heading="Competitive Gaming"
        description="I like to challenge my reflexes a lot while competing in football games, pushing the rank and having interactive gaming sessions excites me the most."
      />
    </div>,
  ];

  const handleCarousal = (index) => {
    let offsetHeight = 400;

    let newCarousalOffset = {
      style: { transform: "translateY(" + index * offsetHeight * -1 + "px)" },
    };

    setCarousalOffsetStyle(newCarousalOffset);
    setSelectedBulletIndex(index);
  };

  const getBullets = () => {
    return resumeBullets.map((bullet, index) => (
      <div
        onClick={() => handleCarousal(index)}
        className={
          index === selectedBulletIndex ? "bullet selected-bullet" : "bullet"
        }
        key={index}
      >
        <img
          className="bullet-logo"
          src={require(`../../assets/Resume/${bullet.logoSrc}`)}
          alt="B"
        />
        <span className="bullet-label">{bullet.label}</span>
      </div>
    ));
  };

  const getResumeScreens = () => {
    return (
      <div
        style={carousalOffsetStyle.style}
        className="resume-details-carousal"
      >
        {resumeDetails.map((ResumeDetail, index) => (
          <div
            key={index}
            className={`resume-slide${index === selectedBulletIndex ? " active" : ""}`}
          >
            {ResumeDetail}
          </div>
        ))}
      </div>
    );
  };


  return (
    <div className="resume-container screen-container fade-in" id={props.id || ""}>
      <div className="resume-content">
        <ScreenHeading title={"Resume"} subHeading={"My Formal Bio Details"} />
        <div className="resume-card">
          <div className="resume-bullets">
            <div className="bullet-container">
              <div className="bullet-icons"></div>
              <div className="bullets">{getBullets()}</div>
            </div>
          </div>

          <div className="resume-bullet-details">{getResumeScreens()}</div>
        </div>
      </div>
    </div>
  );
}

// export default Resume;
