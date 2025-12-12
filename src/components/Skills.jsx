import React from 'react';
import { 
  FaAws, 
  FaDatabase, 
  FaBolt, 
  FaServer, 
  FaNetworkWired, 
  FaUserShield, 
  FaLayerGroup,
  FaDocker, 
  FaJenkins, 
  FaGitlab, 
  FaCodeBranch, 
  FaChartLine, 
  FaPython, 
  FaTerminal, 
  FaFileCode,
  FaCode
} from 'react-icons/fa';
import { SiKubernetes, SiTerraform, SiAnsible, SiGnubash } from 'react-icons/si';
import '../App.css';

const Skills = () => {
  const skills = {
    'Cloud Services': [
      { name: 'AWS EC2', icon: <FaAws /> },
      { name: 'AWS S3', icon: <FaAws /> },
      { name: 'AWS Lambda', icon: <FaBolt /> },
      { name: 'AWS RDS', icon: <FaDatabase /> },
      { name: 'AWS VPC', icon: <FaNetworkWired /> },
      { name: 'AWS IAM', icon: <FaUserShield /> },
      { name: 'AWS CloudFormation', icon: <FaLayerGroup /> },
      { name: 'AWS ECS/EKS', icon: <FaServer /> }
    ],
    'DevOps Tools': [
      { name: 'Docker', icon: <FaDocker /> },
      { name: 'Kubernetes', icon: <SiKubernetes /> },
      { name: 'Jenkins', icon: <FaJenkins /> },
      { name: 'GitLab CI/CD', icon: <FaGitlab /> },
      { name: 'Terraform', icon: <SiTerraform /> },
      { name: 'Ansible', icon: <SiAnsible /> },
      { name: 'Git', icon: <FaCodeBranch /> },
      { name: 'Prometheus', icon: <FaChartLine /> }
    ],
    'Programming': [
      { name: 'Python', icon: <FaPython /> },
      { name: 'Bash Scripting', icon: <SiGnubash /> },
      { name: 'YAML', icon: <FaFileCode /> },
      { name: 'JSON', icon: <FaCode /> }
    ]
  };

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2>Skills & Expertise</h2>
        <div className="skills-container">
          {Object.entries(skills).map(([category, skillList]) => (
            <div key={category} className="skills-category">
              <h3>{category}</h3>
              <div className="skills-grid">
                {skillList.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="skill-icon">
                      {skill.icon}
                    </div>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;