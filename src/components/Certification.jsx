import React, { useState } from 'react';
import { FaAws, FaDocker, FaGithub, FaCertificate } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Certification = () => {
  const [activeTab, setActiveTab] = useState('aws');

  const certifications = {
    aws: [
      {
        id: 1,
        title: 'AWS Cloud Quest: Cloud Practitioner',
        issuer: 'Amazon Web Services',
        date: 'Issued: Nov 2025',
        description: 'Completed training and hands-on exercises for AWS Cloud Practitioner certification',
        icon: <FaAws className="text-orange-500 text-2xl" />
      },
      {
        id: 2,
        title: 'AWS Educate: Cloud Ops',
        issuer: 'Amazon Web Services Training and Certification',
        date: 'Issued: Dec 2025',
        description: 'Gained foundational knowledge of cloud operations on AWS',
        icon: <FaAws className="text-orange-500 text-2xl" />
      },
      {
        id: 3,
        title: 'AWS Educate: Compute',
        issuer: 'Amazon Web Services Training and Certification',
        date: 'Issued: Dec 2025',
        description: 'Learned about AWS compute services and their applications',
        icon: <FaAws className="text-orange-500 text-2xl" />
      },
      {
        id: 4,
        title: 'AWS Educate: Serverless',
        issuer: 'Amazon Web Services Training and Certification',
        date: 'Issued: Dec 2025',
        description: 'Explored serverless computing concepts and AWS Lambda',
        icon: <FaAws className="text-orange-500 text-2xl" />
      },
      {
        id: 5,
        title: 'AWS Educate: Storage',
        issuer: 'Amazon Web Services Training and Certification',
        date: 'Issued: Nov 2025',
        description: 'Learned about AWS storage solutions and best practices',
        icon: <FaAws className="text-orange-500 text-2xl" />
      },
      {
        id: 6,
        title: 'AWS Educate: Introduction to Cloud 101',
        issuer: 'Amazon Web Services Training and Certification',
        date: 'Issued: Dec 2025',
        description: 'Fundamental understanding of cloud computing concepts',
        icon: <FaAws className="text-orange-500 text-2xl" />
      },
    ],
    other: [
      {
        id: 7,
        title: 'Docker Essentials: A Developer Introduction',
        issuer: 'IBM',
        date: 'Issued: Nov 2025',
        description: 'Gained practical experience with Docker containers and containerization',
        icon: <FaDocker className="text-blue-500 text-2xl" />
      },
      {
        id: 8,
        title: 'GitHub for Open Standards Development',
        issuer: 'The Linux Foundation',
        date: 'Issued: Nov 2025',
        description: 'Learned best practices for open source development using GitHub',
        icon: <FaGithub className="text-gray-800 text-2xl" />
      }
    ]
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Certifications & Badges</h1>
          <p className="text-xl text-gray-600">My professional credentials and learning achievements</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('aws')}
            className={`px-6 py-3 font-medium text-sm rounded-t-lg transition-colors duration-200 ${
              activeTab === 'aws' 
                ? 'text-orange-600 border-b-2 border-orange-500 bg-white shadow-sm' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <FaAws className="mr-2" /> AWS Certifications
            </div>
          </button>
          <button
            onClick={() => setActiveTab('other')}
            className={`px-6 py-3 font-medium text-sm rounded-t-lg transition-colors duration-200 ${
              activeTab === 'other' 
                ? 'text-blue-600 border-b-2 border-blue-500 bg-white shadow-sm' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <FaCertificate className="mr-2" /> Other Certifications
            </div>
          </button>
        </div>

        {/* Certifications Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {certifications[activeTab].map((cert) => (
              <motion.div
                key={cert.id}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-lg bg-gray-50 mr-4">
                      {cert.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{cert.title}</h3>
                      <p className="text-sm text-gray-500">{cert.issuer}</p>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">{cert.date}</div>
                  <p className="mt-3 text-gray-600 text-sm flex-grow">{cert.description}</p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Verified
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600">
            Continuously expanding my knowledge in cloud technologies and DevOps practices.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Certification;
