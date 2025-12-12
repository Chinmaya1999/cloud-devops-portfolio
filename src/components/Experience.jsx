import React from 'react';
import '../App.css';

const Experience = () => {
  const experiences = [
    {
      year: '2023 - Present',
      title: 'Senior Cloud DevOps Engineer',
      company: 'Cloud Solutions Inc.',
      description: 'Leading cloud infrastructure migration to AWS, implementing CI/CD pipelines, and automating deployment processes.'
    },
    {
      year: '2021 - 2023',
      title: 'DevOps Engineer',
      company: 'Tech Innovations Ltd.',
      description: 'Managed Kubernetes clusters, implemented monitoring solutions, and optimized cloud costs.'
    },
    {
      year: '2019 - 2021',
      title: 'Cloud Engineer',
      company: 'Digital Transform Co.',
      description: 'Designed and deployed AWS infrastructure, implemented security best practices, and supported development teams.'
    }
  ];

  return (
    <section id="experience" className="experience">
      <div className="container">
        <h2>Experience</h2>
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-date">{exp.year}</div>
              <div className="timeline-content">
                <h3>{exp.title}</h3>
                <h4>{exp.company}</h4>
                <p>{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;