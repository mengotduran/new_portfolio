import React, { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { getProjectById } from "./projectsData";
import "./ProjectDetails.css";

export default function ProjectDetails() {
  const { id } = useParams();
  const project = getProjectById(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="project-details-container">
      <div className="project-details-topbar">
        <Link to="/" className="back-link">
          ← Back to Portfolio
        </Link>
        {project.live ? (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="visit-link"
          >
            Visit Live Site ↗
          </a>
        ) : (
          <span className="visit-link coming-soon-pill">
            <span className="project-loader small" />
            Coming Soon
          </span>
        )}
      </div>

      {project.credentials && (
        <div className="project-details-content credentials-banner">
          <h2>Demo Credentials</h2>
          <div className="project-credentials-list">
            {project.credentials.map((cred, i) => (
              <div className="project-credential-card" key={i}>
                <span className="credential-role">{cred.role}</span>
                <span className="credential-line">
                  <strong>Email:</strong> {cred.email}
                </span>
                <span className="credential-line">
                  <strong>Password:</strong> {cred.password}
                </span>
              </div>
            ))}
          </div>
          {project.credentialsNote && (
            <p className="project-credentials-note">{project.credentialsNote}</p>
          )}
        </div>
      )}

      <div className="project-details-content">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="project-details-image"
          />
        ) : (
          <div className="project-details-placeholder">
            <span className="project-loader" />
            <span className="project-placeholder-text">Coming Soon</span>
          </div>
        )}

        {project.badge && (
          <span className={`project-details-badge${project.comingSoon ? " coming-soon" : ""}`}>
            {project.comingSoon && <span className="project-loader small" />}
            {project.badge}
          </span>
        )}
        <h1 className="project-details-title">{project.title}</h1>
        <p className="project-details-tagline">{project.tagline}</p>

        <p className="project-details-overview">{project.overview}</p>

        {project.features && (
          <div className="project-details-section">
            <h2>{project.comingSoon ? "What's being built" : "What it does"}</h2>
            <ul className="project-details-features">
              {project.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {project.techStack && (
          <div className="project-details-section">
            <h2>Tech Stack</h2>
            <div className="project-tech-stack">
              {project.techStack.map((tech, i) => (
                <span className="tech-chip" key={i}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
