import React, { useState, useEffect, useRef, useMemo } from 'react';
import { FaReact, FaNodeJs, FaAws, FaDocker, FaGithub, FaGoogle, FaHospital, FaClipboardList, FaUniversity, FaExclamationCircle, FaRocket, FaCode, FaExternalLinkAlt } from 'react-icons/fa';
import { SiElectron, SiTypescript, SiMongodb, SiPostman, SiGitlab, SiNextdotjs, SiMysql, SiPhp, SiYii } from 'react-icons/si';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Float, PerspectiveCamera, Stars, Trail, Icosahedron } from '@react-three/drei';
import '../App.css';

// 3D Floating Project Component
function FloatingProject({ position, color }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.4}>
      <Icosahedron ref={meshRef} args={[0.6]} position={position}>
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </Icosahedron>
    </Float>
  );
}

// 3D Scene Component
function Scene3D() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} />
      <Stars radius={100} depth={50} count={1700} factor={4} saturation={0} fade speed={1} />
      
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#10b981" />
      <pointLight position={[0, -10, 10]} intensity={0.3} color="#8b5cf6" />
      
      <FloatingProject position={[-3, 2, 0]} color="#10b981" />
      <FloatingProject position={[3, -1, -2]} color="#8b5cf6" />
      <FloatingProject position={[0, 0, 2]} color="#f59e0b" />
      <FloatingProject position={[-2, -2, -2]} color="#ef4444" />
      <FloatingProject position={[2, 3, 1]} color="#06b6d4" />
    </>
  );
}

// Animated Project Card Component
function ProjectCard({ project, index, delay }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay, duration: 0.6, type: "spring" }}
      whileHover={{ 
        scale: 1.05, 
        y: -10,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}
      className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 h-full flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <motion.div 
            className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl mr-3"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            {project.icon}
          </motion.div>
          <h3 className="text-xl font-semibold text-white">{project.title}</h3>
        </div>
        {project.link && project.link !== '#' && (
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-cyan-400"
            whileHover={{ scale: 1.2, rotate: 45 }}
            transition={{ duration: 0.3 }}
          >
            <FaExternalLinkAlt className="text-xl" />
          </motion.a>
        )}
      </div>
      
      <p className="text-gray-300 mb-6 flex-grow leading-relaxed">{project.description}</p>
      
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-3">Technologies Used</h4>
        <div className="flex flex-wrap gap-2">
          {project.technologies && project.technologies.map((tech, i) => (
            <motion.div 
              key={i} 
              className="flex items-center text-xs bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <span className="mr-1">{tech.icon}</span>
              <span className="text-gray-300">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="mt-auto pt-4 border-t border-white/20">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">{project.period}</span>
          <span className="font-semibold text-white">{project.company}</span>
        </div>
      </div>
    </motion.div>
  );
}

const Projects = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const projects = [
    {
      title: 'VOECE - AI-Powered Voice Analysis',
      description: 'Desktop application for voice analysis and improvement using AI. Helps users enhance their public speaking skills with real-time feedback and analytics.',
      tags: ['Electron.js', 'React', 'TypeScript', 'MongoDB', 'AI/ML'],
      period: 'Feb 2024 - Present',
      company: 'Ajatus Software Pvt. Ltd.',
      link: 'https://voece.ai/',
      icon: <SiElectron className="text-blue-400 text-xl" />,
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
      icon: <FaGoogle className="text-green-500 text-xl" />,
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
      icon: <FaHospital className="text-red-500 text-xl" />,
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
      icon: <FaUniversity className="text-blue-600 text-xl" />,
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
      icon: <SiNextdotjs className="text-black text-xl" />,
      technologies: [
        { name: 'Next.js', icon: <SiNextdotjs className="text-black" /> },
        { name: 'React', icon: <FaReact className="text-blue-500" /> },
        { name: 'Node.js', icon: <FaNodeJs className="text-green-600" /> },
        { name: 'AI/ML', icon: <span className="text-orange-500">AI</span> }
      ]
    }
  ];

  return (
    <section id="projects" className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 -z-10">
        <Canvas>
          <Scene3D />
        </Canvas>
      </div>

      {/* Animated gradient overlays */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-500/20 to-transparent rounded-full filter blur-3xl"
          animate={{
            x: [0, 90, 0],
            y: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full filter blur-3xl"
          animate={{
            x: [0, -90, 0],
            y: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">Projects</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              A showcase of my recent work and contributions to various projects
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {projects.map((project, index) => (
              <ProjectCard 
                key={index}
                project={project}
                index={index}
                delay={0.4 + index * 0.1}
              />
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-center pt-8"
          >
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaRocket />
              Let's Build Something Together
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;