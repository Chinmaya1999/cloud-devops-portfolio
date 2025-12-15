import React from 'react';
import { FaLaptopCode, FaSolarPanel, FaCodeBranch } from 'react-icons/fa';
import '../App.css';

const Experience = () => {
  const experiences = [
    {
      year: 'Jan 2025 - Present',
      duration: '1 yr',
      title: 'Senior Software Developer',
      company: 'Bharat Solar Solution',
      location: 'Bhubaneswar, Odisha, India',
      type: 'Part-time',
      icon: <FaSolarPanel className="text-yellow-500 text-2xl" />,
      description: 'Best Solar Installation Service Provider. Working on software solutions for solar energy management systems.'
    },
    {
      year: 'Jan 2025 - Sep 2025',
      duration: '9 mos',
      title: 'Software Developer',
      company: 'Bunego Technologies Private Limited',
      location: 'Bhubaneswar, Odisha, India',
      type: 'Full-time',
      icon: <FaLaptopCode className="text-blue-500 text-2xl" />,
      description: 'Worked on web design, software design, and development projects. Gained experience in full-stack development and agile methodologies.'
    },
    {
      year: 'Jan 2025 - Sep 2025',
      duration: '9 mos',
      title: 'Software Developer',
      company: 'Pearnode Technology Solutions Pvt Ltd',
      location: 'Bhubaneswar, Odisha, India',
      type: 'Full-time',
      icon: <FaLaptopCode className="text-green-500 text-2xl" />,
      description: 'Contributed to software development projects with a focus on creating efficient and scalable solutions.'
    },
    {
      year: 'Jan 2023 - Mar 2025',
      duration: '2 yrs 3 mos',
      title: 'Javascript & Node.js Developer',
      company: 'Ajatus Software Pvt. Ltd.',
      location: 'Bhubaneswar, Odisha, India',
      type: 'Full-time',
      icon: <FaCodeBranch className="text-purple-500 text-2xl" />,
      description: 'Specialized in JavaScript and Node.js development. Worked on various web applications and APIs, focusing on performance optimization and clean code practices.'
    }
  ];

  return (
    <section id="experience" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="container">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Work Experience</h2>
          <p className="text-xl text-gray-600">My professional journey and career milestones</p>
        </div>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6 md:flex">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4 md:mb-0 md:mr-6">
                  {exp.icon}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {exp.type}
                    </span>
                  </div>
                  <div className="mt-1">
                    <span className="text-lg font-medium text-gray-900">{exp.company}</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-500">{exp.location}</span>
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    {exp.year} <span className="mx-1">•</span> {exp.duration}
                  </div>
                  <p className="mt-3 text-gray-600">{exp.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;