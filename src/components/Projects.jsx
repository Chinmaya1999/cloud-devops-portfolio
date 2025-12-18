import React, { useState, useEffect, useRef } from 'react';
import { FaReact, FaNodeJs, FaAws, FaDocker, FaGithub, FaGoogle, FaHospital, FaClipboardList, FaUniversity, FaChevronLeft, FaChevronRight, FaExclamationCircle } from 'react-icons/fa';
import { SiElectron, SiTypescript, SiMongodb, SiPostman, SiGitlab, SiNextdotjs, SiMysql, SiPhp, SiYii } from 'react-icons/si';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../App.css';

const Projects = () => {
  const projects = [
    {
      title: 'VOECE - AI-Powered Voice Analysis',
      description: 'Desktop application for voice analysis and improvement using AI. Helps users enhance their public speaking skills with real-time feedback and analytics.',
      tags: ['Electron.js', 'React', 'TypeScript', 'MongoDB', 'AI/ML'],
      period: 'Feb 2024 - Present',
      company: 'Ajatus Software Pvt. Ltd.',
      link: 'https://voece.ai/',
      icon: <SiElectron className="text-blue-400" />,
      technologies: [
        { name: 'Electron.js', icon: <SiElectron className="text-blue-400" /> },
        { name: 'React', icon: <FaReact className="text-blue-500" /> },
        { name: 'TypeScript', icon: <SiTypescript className="text-blue-600" /> },
        { name: 'MongoDB', icon: <SiMongodb className="text-green-500" /> }
      ]
    },
    {
      title: 'VL ACCESS - Employee Location Tracker',
      description: 'Web application for tracking employee locations with street view integration in Google Maps. Includes Employee Management System (EMS) features.',
      tags: ['MERN Stack', 'Google Maps API', 'GitLab CI/CD', 'Postman'],
      period: 'Nov 2023 - Dec 2023',
      company: 'Ajatus Software Pvt. Ltd.',
      link: '#',
      icon: <FaGoogle className="text-green-500" />,
      technologies: [
        { name: 'MongoDB', icon: <SiMongodb className="text-green-500" /> },
        { name: 'Express', icon: <FaNodeJs className="text-green-600" /> },
        { name: 'React', icon: <FaReact className="text-blue-500" /> },
        { name: 'Node.js', icon: <FaNodeJs className="text-green-600" /> }
      ]
    },
    {
      title: 'Construction Management System',
      description: 'Comprehensive system for managing construction projects, materials, and resources with real-time tracking and reporting.',
      tags: ['Yii2', 'MySQL', 'PHP', 'Bootstrap'],
      period: '2023',
      company: 'Ajatus Software Pvt. Ltd.',
      icon: <SiYii className="text-2xl text-cyan-500" />,
      technologies: [
        { name: 'PHP', icon: <SiPhp className="text-purple-500" /> },
        { name: 'Yii2', icon: <SiYii className="text-cyan-500" /> },
        { name: 'MySQL', icon: <SiMysql className="text-blue-500" /> },
        { name: 'Bootstrap', icon: <span className="text-purple-500">B</span> }
      ]
    },
    {
      title: 'Hospital Management System',
      description: 'Online system for managing hospital operations including patient records, appointments, and billing.',
      tags: ['Yii2', 'MySQL', 'PHP', 'jQuery'],
      period: '2023',
      company: 'NIIS Institute',
      icon: <FaHospital className="text-red-500" />,
      technologies: [
        { name: 'PHP', icon: <SiPhp className="text-purple-500" /> },
        { name: 'Yii2', icon: <SiYii className="text-cyan-500" /> },
        { name: 'MySQL', icon: <SiMysql className="text-blue-500" /> },
        { name: 'jQuery', icon: <span className="text-blue-500">jQ</span> }
      ]
    },
    {
      title: 'State Level Bankers Committee (SLBC)',
      description: 'Web application for State Level Bankers Committee of Odisha to manage banking operations and reports.',
      tags: ['Yii2', 'MySQL', 'Bootstrap', 'REST API'],
      period: '2023',
      company: 'Ajatus Software Pvt. Ltd.',
      link: 'https://slbcorissa.com',
      icon: <FaUniversity className="text-blue-600" />,
      technologies: [
        { name: 'PHP', icon: <SiPhp className="text-purple-500" /> },
        { name: 'Yii2', icon: <SiYii className="text-cyan-500" /> },
        { name: 'MySQL', icon: <SiMysql className="text-blue-500" /> },
        { name: 'Bootstrap', icon: <span className="text-purple-500">B</span> }
      ]
    },
    {
      title: 'Publiq Studio - eCommerce AI Copilot',
      description: 'AI-powered assistant for eCommerce growth, providing insights and automation for online stores.',
      tags: ['Next.js', 'AI/ML', 'eCommerce', 'React'],
      period: '2023',
      company: 'Ajatus Software Pvt. Ltd.',
      icon: <SiNextdotjs className="text-black" />,
      technologies: [
        { name: 'Next.js', icon: <SiNextdotjs className="text-black" /> },
        { name: 'React', icon: <FaReact className="text-blue-500" /> },
        { name: 'Node.js', icon: <FaNodeJs className="text-green-600" /> },
        { name: 'AI/ML', icon: <span className="text-orange-500">AI</span> }
      ]
    },
    {
      title: 'Workforce Management System (WFMS)',
      description: 'Comprehensive solution for attendance tracking, leave management, and workforce optimization with Clockify integration.',
      tags: ['MERN Stack', 'Clockify API', 'REST API', 'Postman'],
      period: '2023',
      company: 'Ajatus Software Pvt. Ltd.',
      icon: <FaClipboardList className="text-purple-500" />,
      technologies: [
        { name: 'MongoDB', icon: <SiMongodb className="text-green-500" /> },
        { name: 'Express', icon: <FaNodeJs className="text-green-600" /> },
        { name: 'React', icon: <FaReact className="text-blue-500" /> },
        { name: 'Node.js', icon: <FaNodeJs className="text-green-600" /> }
      ]
    },
    {
      title: 'Serverless Application',
      description: 'Developed serverless application using AWS Lambda, API Gateway, and DynamoDB.',
      tags: ['AWS Lambda', 'Serverless', 'DynamoDB', 'API Gateway'],
      period: '2023',
      company: 'Ajatus Software Pvt. Ltd.',
      icon: <FaAws className="text-orange-500" />,
      technologies: [
        { name: 'AWS Lambda', icon: <FaAws className="text-orange-500" /> },
        { name: 'API Gateway', icon: <FaAws className="text-orange-500" /> },
        { name: 'DynamoDB', icon: <FaAws className="text-orange-500" /> }
      ]
    },
    {
      title: 'Monitoring & Alerting System',
      description: 'Implemented monitoring stack with Prometheus, Grafana, and CloudWatch alarms.',
      tags: ['Prometheus', 'Grafana', 'CloudWatch', 'Alerting'],
      period: '2025',
      company: 'Pearnode Technology Solutions Pvt Ltd.',
      icon: <FaAws className="text-orange-500" />,
      technologies: [
        { name: 'Prometheus', icon: <FaAws className="text-orange-500" /> },
        { name: 'Grafana', icon: <FaAws className="text-orange-500" /> },
        { name: 'CloudWatch', icon: <FaAws className="text-orange-500" /> }
      ]
    },
  ];


  // Add custom styles for the dots
  const CustomDots = (dots) => (
    <div className="slick-dots">
      {dots}
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: '10px',
    arrows: true,
    appendDots: CustomDots,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerMode: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          centerMode: true,
          centerPadding: '20px',
          arrows: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '10px',
          arrows: false
        }
      }
    ]
  };

  return (
    <section id="projects" className="py-12 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 relative inline-block">
            <span className="relative z-10">My Projects</span>
            <span className="absolute bottom-0 left-0 w-full h-3 bg-blue-100 -z-0 opacity-70 transform -rotate-1"></span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mt-4 sm:mt-6 leading-relaxed">A showcase of my recent work and contributions to various projects</p>
        </div>
        
        <div className="relative px-2 sm:px-4 py-6 sm:py-8">
          <div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-2xl -inset-x-4 -z-10"></div>
          <Slider {...settings}>
            {projects.map((project, index) => (
              <div key={index} className="px-1 sm:px-2">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1 border border-gray-100 mx-1 sm:mx-2">
                  <div className="p-4 sm:p-6 md:p-8 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center">
                        {project.icon && (
                          <div className="mr-3 flex-shrink-0">
                            {project.icon}
                          </div>
                        )}
                        <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                      </div>
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                          </svg>
                        </a>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-6 flex-grow leading-relaxed">{project.description}</p>
                    
                    <div className="mt-6 mb-6">
                      <h4 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies && project.technologies.map((tech, i) => (
                          <div key={i} className="flex items-center text-xs bg-gray-100 rounded-full px-3 py-1">
                            <span className="mr-1">{tech.icon}</span>
                            <span>{tech.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-auto pt-5 border-t border-gray-200 bg-gray-50 -mx-6 -mb-6 px-6 py-4">
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>{project.period}</span>
                        <span className="font-semibold text-gray-800">{project.company}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Projects;