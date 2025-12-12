import React from 'react';
import '../App.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2>About Me</h2>
        <div className="about-content">
          <div className="about-image">
           <img 
              src="https://media.konfhub.com/event_poster/2023/July/28/1690534441046-devops-with-aws-online-training.jpeg" // Replace with your image URL
              alt="Profile"
              className="rounded-lg shadow-lg w-full h-auto max-w-xs mx-auto"
            />
          </div>
          
          <div className="about-text">
            <h3>Cloud & DevOps Specialist</h3>
            <p>
              Hello! I'm Chinmaya Kumar Mallick, a passionate Cloud and DevOps Engineer 
              with expertise in designing and implementing scalable cloud infrastructure 
              on AWS and automating development workflows.
            </p>
            <p>
              I specialize in creating robust CI/CD pipelines, implementing Infrastructure 
              as Code (IaC), container orchestration with Kubernetes, and ensuring high 
              availability and security of cloud environments.
            </p>
            
            <div className="about-stats">
              <div className="stat">
                <div className="stat-number">50+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat">
                <div className="stat-number">30+</div>
                <div className="stat-label">AWS Services</div>
              </div>
              <div className="stat">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Infrastructure Monitoring</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;