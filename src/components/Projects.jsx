import React from 'react';
import '../App.css';

const Projects = () => {
  const projects = [
    {
      title: 'AWS Auto-Scaling Infrastructure',
      description: 'Designed and implemented auto-scaling infrastructure on AWS using EC2, Auto Scaling Groups, and Load Balancers.',
      tags: ['AWS', 'Terraform', 'Auto Scaling', 'CloudFormation']
    },
    {
      title: 'CI/CD Pipeline with Jenkins',
      description: 'Built end-to-end CI/CD pipeline for microservices using Jenkins, Docker, and Kubernetes.',
      tags: ['Jenkins', 'Docker', 'Kubernetes', 'CI/CD']
    },
    {
      title: 'Serverless Application',
      description: 'Developed serverless application using AWS Lambda, API Gateway, and DynamoDB.',
      tags: ['AWS Lambda', 'Serverless', 'DynamoDB', 'API Gateway']
    },
    {
      title: 'Infrastructure as Code',
      description: 'Managed cloud infrastructure using Terraform across multiple AWS accounts.',
      tags: ['Terraform', 'IaC', 'AWS', 'GitOps']
    },
    {
      title: 'Monitoring & Alerting System',
      description: 'Implemented monitoring stack with Prometheus, Grafana, and CloudWatch alarms.',
      tags: ['Prometheus', 'Grafana', 'CloudWatch', 'Alerting']
    },
    {
      title: 'Container Orchestration',
      description: 'Set up EKS cluster with automated deployment and service mesh.',
      tags: ['Kubernetes', 'EKS', 'Helm', 'Istio']
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2>Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-image">
                <i className="fas fa-cloud"></i>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag">{tag}</span>
                  ))}
                </div>
                <a href="#contact" className="btn">View Details</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;