import React, { useState, useEffect, useRef, useMemo } from 'react';
import { FaAws, FaDocker, FaGithub, FaCertificate, FaAward, FaGraduationCap } from 'react-icons/fa';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Float, PerspectiveCamera, Stars, Trail, Torus } from '@react-three/drei';
import '../App.css';

// 3D Floating Certificate Component
function FloatingCert({ position, color }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.4}>
      <Torus ref={meshRef} args={[0.8, 0.3, 16, 32]} position={position}>
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </Torus>
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
      
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f59e0b" />
      <pointLight position={[0, 10, -10]} intensity={0.3} color="#10b981" />
      
      <FloatingCert position={[-3, 2, 0]} color="#f59e0b" />
      <FloatingCert position={[3, -1, -2]} color="#3b82f6" />
      <FloatingCert position={[0, 0, 2]} color="#10b981" />
      <FloatingCert position={[-2, -2, -2]} color="#ef4444" />
      <FloatingCert position={[2, 3, 1]} color="#8b5cf6" />
    </>
  );
}

// Animated Certification Card Component
function CertificationCard({ cert, index, delay }) {
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
          className="bg-gradient-to-br from-orange-500 to-amber-500 p-3 rounded-xl mr-4"
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          {cert.icon}
        </motion.div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">{cert.title}</h3>
          <p className="text-sm text-gray-300">{cert.issuer}</p>
        </div>
      </div>
      
      <div className="text-sm text-gray-400 mb-3">{cert.date}</div>
      
      <p className="text-gray-300 text-sm flex-grow mb-4">{cert.description}</p>
      
      <motion.div 
        className="pt-4 border-t border-white/10"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: delay + 0.3 }}
      >
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-500 to-emerald-500 text-white">
          Verified
        </span>
      </motion.div>
    </motion.div>
  );
}

const Certification = () => {
  const [activeTab, setActiveTab] = useState('aws');
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

  const certifications = {
    aws: [
      {
        id: 7,
        title: 'AWS Certified Cloud Practitioner',
        issuer: 'Amazon Web Services',
        date: 'Issued: Nov 2026',
        description: 'Demonstrated understanding of AWS Cloud services, architecture, and best practices',
        icon: <FaAws className="text-orange-500 text-2xl" />
      },
      {
        id: 8,
        title: 'AWS Certified Solutions Architect - Associate',
        issuer: 'Amazon Web Services',
        date: 'Issued: Dec 2026',
        description: 'Designed and deployed distributed systems on AWS with high availability and scalability',
        icon: <FaAws className="text-orange-500 text-2xl" />
      },
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
    ],
    other: [
      {
        id: 9,
        title: 'Docker Essentials: A Developer Introduction',
        issuer: 'IBM',
        date: 'Issued: Nov 2025',
        description: 'Gained practical experience with Docker containers and containerization',
        icon: <FaDocker className="text-blue-500 text-2xl" />
      },
      {
        id: 10,
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

  return (
    <section id="certifications" className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 -z-10">
        <Canvas>
          <Scene3D />
        </Canvas>
      </div>

      {/* Animated gradient overlays */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full filter blur-3xl"
          animate={{
            x: [0, 70, 0],
            y: [0, -70, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-amber-500/20 to-transparent rounded-full filter blur-3xl"
          animate={{
            x: [0, -70, 0],
            y: [0, 70, 0],
          }}
          transition={{
            duration: 16,
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
          className="space-y-12"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Certifications & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">Badges</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              My professional credentials and learning achievements in cloud technologies and DevOps practices
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div 
            className="flex justify-center mb-8 border-b border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.button
              onClick={() => setActiveTab('aws')}
              className={`px-6 py-3 font-medium text-sm rounded-t-lg transition-all duration-300 ${
                activeTab === 'aws' 
                  ? 'text-orange-400 border-b-2 border-orange-500 bg-white/10 shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center">
                <FaAws className="mr-2" /> AWS Certifications
              </div>
            </motion.button>
            <motion.button
              onClick={() => setActiveTab('other')}
              className={`px-6 py-3 font-medium text-sm rounded-t-lg transition-all duration-300 ${
                activeTab === 'other' 
                  ? 'text-blue-400 border-b-2 border-blue-500 bg-white/10 shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center">
                <FaCertificate className="mr-2" /> Other Certifications
              </div>
            </motion.button>
          </motion.div>

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
              {certifications[activeTab].map((cert, index) => (
                <CertificationCard 
                  key={cert.id}
                  cert={cert}
                  index={index}
                  delay={0.6 + index * 0.1}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Footer Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-center pt-8"
          >
            <motion.div 
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20"
              whileHover={{ scale: 1.05 }}
            >
              <FaGraduationCap className="text-orange-400 text-xl" />
              <p className="text-gray-300">
                Continuously expanding my knowledge in cloud technologies and DevOps practices
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certification;
