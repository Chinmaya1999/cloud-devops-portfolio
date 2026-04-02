import React, { useEffect, useRef, useState, useMemo } from 'react';
import { FaLaptopCode, FaSolarPanel, FaCodeBranch, FaCloud, FaAws, FaDocker, FaGitAlt, FaJenkins, FaLinux, FaNetworkWired, FaServer, FaDatabase, FaBriefcase, FaRocket, FaTrophy } from 'react-icons/fa';
import { SiTerraform, SiKubernetes } from 'react-icons/si';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Float, PerspectiveCamera, Stars, Trail, Cone } from '@react-three/drei';
import '../App.css';

// 3D Floating Experience Component
function FloatingExperience({ position, color }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.25;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.3}>
      <Cone ref={meshRef} args={[0.5, 1, 8]} position={position}>
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </Cone>
    </Float>
  );
}

// 3D Scene Component
function Scene3D() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} />
      <Stars radius={100} depth={50} count={1800} factor={4} saturation={0} fade speed={1} />
      
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[0, -10, 10]} intensity={0.3} color="#f59e0b" />
      
      <FloatingExperience position={[-3, 2, 0]} color="#8b5cf6" />
      <FloatingExperience position={[3, -1, -2]} color="#f59e0b" />
      <FloatingExperience position={[0, 0, 2]} color="#ef4444" />
      <FloatingExperience position={[-2, -2, -2]} color="#06b6d4" />
      <FloatingExperience position={[2, 3, 1]} color="#10b981" />
    </>
  );
}

// Animated Experience Card Component
function ExperienceCard({ exp, index, delay }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30, scale: 0.9 }}
      animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{ delay, duration: 0.6, type: "spring" }}
      whileHover={{ 
        scale: 1.02, 
        x: 10,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
    >
      <div className="flex items-start gap-4">
        <motion.div 
          className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-xl flex-shrink-0"
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          {exp.icon}
        </motion.div>
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
            <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
            <motion.span 
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
              whileHover={{ scale: 1.05 }}
            >
              {exp.type}
            </motion.span>
          </div>
          <div className="mb-2">
            <span className="text-lg font-medium text-blue-300">{exp.company}</span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-gray-400">{exp.location}</span>
          </div>
          <div className="text-sm text-gray-400 mb-3">
            {exp.year} <span className="mx-1">•</span> {exp.duration}
          </div>
          <p className="text-gray-300 leading-relaxed">{exp.description}</p>
        </div>
      </div>
    </motion.div>
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
      <div className="flex items-center mb-4">
        <motion.div 
          className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-xl mr-4"
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          {project.icon}
        </motion.div>
        <div>
          <h3 className="text-xl font-semibold text-white">{project.title}</h3>
          <p className="text-sm text-gray-300">{project.role} • {project.duration}</p>
        </div>
      </div>
      
      <p className="text-gray-300 mb-4 flex-grow leading-relaxed">{project.description}</p>
      
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-orange-400 uppercase tracking-wider mb-2">Technologies Used:</h4>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, techIndex) => (
            <motion.span 
              key={techIndex} 
              className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-white/10 backdrop-blur-sm border border-white/20 text-gray-300"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
      
      <div className="mt-auto">
        <h4 className="text-sm font-semibold text-orange-400 uppercase tracking-wider mb-2">Key Achievements:</h4>
        <ul className="space-y-1">
          {project.achievements.map((achievement, achIndex) => (
            <motion.li 
              key={achIndex} 
              className="text-sm text-gray-300 flex items-start"
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: delay + 0.3 + achIndex * 0.1 }}
            >
              <span className="text-orange-400 mr-2">•</span>
              {achievement}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// Animated Expertise Icon Component
function ExpertiseIcon({ icon: Icon, name, delay }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, duration: 0.5, type: "spring" }}
      whileHover={{ 
        scale: 1.1, 
        y: -5,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)'
      }}
      className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 text-center border border-white/20 cursor-pointer"
    >
      <Icon className="text-4xl mx-auto mb-3 text-blue-400" />
      <span className="text-sm font-medium text-gray-300">{name}</span>
    </motion.div>
  );
}

const Experience = () => {
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

  const projects = [
    {
      title: '3tair Infrastructure Project',
      role: 'DevOps Engineer',
      duration: '2024 - Present',
      icon: <SiTerraform className="text-purple-600 text-2xl" />,
      description: 'Designed and implemented cloud infrastructure using Terraform for 3tair platform. Created automated CI/CD pipelines and deployed scalable microservices architecture.',
      technologies: ['Terraform', 'AWS', 'Docker', 'Kubernetes', 'Jenkins', 'GitLab CI'],
      achievements: [
        'Automated infrastructure provisioning reducing deployment time by 80%',
        'Implemented multi-environment deployments (dev, staging, production)',
        'Set up monitoring and logging with ELK stack',
        'Achieved 99.9% uptime with auto-scaling configurations'
      ]
    },
    {
      title: 'Cloud DevOps Portfolio',
      role: 'Cloud & DevOps Engineer',
      duration: '2024 - Present',
      icon: <FaCloud className="text-blue-600 text-2xl" />,
      description: 'Built and deployed this portfolio website using modern cloud-native technologies. Implemented containerized deployment with automated CI/CD pipeline.',
      technologies: ['React', 'Docker', 'AWS S3', 'CloudFront', 'GitHub Actions', 'Terraform'],
      achievements: [
        'Deployed static website with CDN optimization',
        'Implemented automated testing and deployment pipeline',
        'Set up infrastructure as code with Terraform',
        'Configured SSL certificates and domain management'
      ]
    },
    {
      title: 'Microservices E-commerce Platform',
      role: 'DevOps Architect',
      duration: '2023 - 2024',
      icon: <SiKubernetes className="text-blue-500 text-2xl" />,
      description: 'Architected and deployed a microservices-based e-commerce platform with high availability and scalability requirements.',
      technologies: ['Kubernetes', 'Docker', 'AWS EKS', 'RDS', 'Redis', 'Prometheus', 'Grafana'],
      achievements: [
        'Designed service mesh architecture with Istio',
        'Implemented blue-green deployment strategy',
        'Set up comprehensive monitoring and alerting',
        'Achieved horizontal pod autoscaling based on traffic'
      ]
    },
    {
      title: 'DevOps Automation Pipeline',
      role: 'DevOps Engineer',
      duration: '2023 - 2024',
      icon: <FaJenkins className="text-red-600 text-2xl" />,
      description: 'Created comprehensive CI/CD pipelines for multiple projects with automated testing, security scanning, and deployment.',
      technologies: ['Jenkins', 'Docker', 'Selenium', 'SonarQube', 'AWS CodeDeploy', 'Git'],
      achievements: [
        'Reduced manual deployment time by 90%',
        'Integrated automated security vulnerability scanning',
        'Implemented automated rollback mechanisms',
        'Set up parallel testing environments'
      ]
    }
  ];

  const expertise = [
    { icon: FaAws, name: 'AWS' },
    { icon: FaDocker, name: 'Docker' },
    { icon: SiKubernetes, name: 'Kubernetes' },
    { icon: SiTerraform, name: 'Terraform' },
    { icon: FaJenkins, name: 'Jenkins' },
    { icon: FaGitAlt, name: 'Git' },
    { icon: FaLinux, name: 'Linux' },
    { icon: FaDatabase, name: 'Databases' },
    { icon: FaServer, name: 'Servers' },
    { icon: FaNetworkWired, name: 'Networking' },
    { icon: FaCloud, name: 'Cloud Services' }
  ];

  return (
    <section id="experience" className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 -z-10">
        <Canvas>
          <Scene3D />
        </Canvas>
      </div>

      {/* Animated gradient overlays */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full filter blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-orange-500/20 to-transparent rounded-full filter blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
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
          className="space-y-20"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Experience</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              My professional journey and career milestones in software development and DevOps
            </p>
          </motion.div>

          {/* Work Experience */}
          <motion.div variants={containerVariants} className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <motion.div
                className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <FaBriefcase className="text-white text-xl" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white">Professional Experience</h2>
            </motion.div>
            
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <ExperienceCard 
                  key={index}
                  exp={exp}
                  index={index}
                  delay={0.4 + index * 0.1}
                />
              ))}
            </div>
          </motion.div>

          {/* DevOps Projects */}
          <motion.div variants={containerVariants} className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <motion.div
                className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-full"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <FaRocket className="text-white text-xl" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white">DevOps & Cloud Projects</h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <ProjectCard 
                  key={index}
                  project={project}
                  index={index}
                  delay={0.9 + index * 0.1}
                />
              ))}
            </div>
          </motion.div>

          {/* Expertise */}
          <motion.div variants={containerVariants} className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-full"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <FaTrophy className="text-white text-xl" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white">Cloud & DevOps Expertise</h2>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {expertise.map((item, index) => (
                <ExpertiseIcon 
                  key={index}
                  icon={item.icon}
                  name={item.name}
                  delay={1.4 + index * 0.05}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;