import React, { useEffect, useRef, useState, useMemo } from 'react';
import { FaUser, FaAward, FaProjectDiagram, FaClock, FaServer, FaCode, FaRocket } from 'react-icons/fa';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Float, PerspectiveCamera, Stars, Trail } from '@react-three/drei';
import '../App.css';

// 3D Floating Cube Component
function FloatingCube({ position, color }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Box ref={meshRef} args={[1, 1, 1]} position={position}>
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </Box>
    </Float>
  );
}

// 3D Particle System
function ParticleSystem() {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 20; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 10,
        z: (Math.random() - 0.5) * 10,
        size: Math.random() * 0.1 + 0.05,
      });
    }
    return temp;
  }, []);

  return (
    <>
      {particles.map((particle, i) => (
        <Sphere
          key={i}
          args={[particle.size, 16, 16]}
          position={[particle.x, particle.y, particle.z]}
        >
          <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={0.5} />
        </Sphere>
      ))}
    </>
  );
}

// 3D Scene Component
function Scene3D() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} />
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
      
      <FloatingCube position={[-3, 2, 0]} color="#3b82f6" />
      <FloatingCube position={[3, -1, -2]} color="#10b981" />
      <FloatingCube position={[0, 0, 2]} color="#f59e0b" />
      <ParticleSystem />
    </>
  );
}

// Animated Stat Card Component
function StatCard({ icon: Icon, number, label, delay }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ 
        scale: 1.05, 
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center"
    >
      <div className="flex justify-center mb-4">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-full">
          <Icon className="text-white text-2xl" />
        </div>
      </div>
      <motion.div 
        className="text-3xl font-bold text-white mb-2"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: delay + 0.2, type: "spring" }}
      >
        {number}
      </motion.div>
      <div className="text-gray-300 text-sm">{label}</div>
    </motion.div>
  );
}

const About = () => {
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
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const stats = [
    { icon: FaProjectDiagram, number: '50+', label: 'Projects Completed', delay: 0.8 },
    { icon: FaServer, number: '30+', label: 'AWS Services', delay: 0.9 },
    { icon: FaClock, number: '24/7', label: 'Infrastructure Monitoring', delay: 1.0 },
  ];

  return (
    <section id="about" className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 -z-10">
        <Canvas>
          <Scene3D />
        </Canvas>
      </div>

      {/* Animated gradient overlays */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full filter blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-green-500/20 to-transparent rounded-full filter blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {/* Profile Image and Stats */}
          <motion.div variants={itemVariants} className="space-y-8">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative backdrop-blur-xl bg-white/5 rounded-2xl p-1 shadow-2xl border border-white/10">
                <div className="bg-gray-900/90 rounded-xl overflow-hidden">
                  <img 
                    src="https://media.konfhub.com/event_poster/2023/July/28/1690534441046-devops-with-aws-online-training.jpeg"
                    alt="Profile"
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                {/* Floating badges */}
                <motion.div 
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-3 rounded-full shadow-lg"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity 
                  }}
                >
                  <FaUser className="text-xl" />
                </motion.div>
                <motion.div 
                  className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 rounded-full shadow-lg"
                  animate={{ 
                    rotate: [0, -10, 10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    delay: 2
                  }}
                >
                  <FaAward className="text-xl" />
                </motion.div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              variants={itemVariants}
            >
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </motion.div>
          </motion.div>
          
          {/* About Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Me</span>
              </h2>
            </motion.div>
            
            <motion.div 
              className="space-y-4"
              variants={itemVariants}
            >
              <motion.h3 
                className="text-2xl font-semibold text-blue-300 flex items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <FaCode className="text-blue-400" />
                Cloud & DevOps Specialist
              </motion.h3>
              
              <motion.p 
                className="text-gray-300 leading-relaxed text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Hello! I'm <span className="text-blue-400 font-semibold">Chinmaya Kumar Mallick</span>, a passionate Cloud and DevOps Engineer 
                with expertise in designing and implementing scalable cloud infrastructure 
                on AWS and automating development workflows.
              </motion.p>
              
              <motion.p 
                className="text-gray-300 leading-relaxed text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                I specialize in creating robust CI/CD pipelines, implementing Infrastructure 
                as Code (IaC), container orchestration with Kubernetes, and ensuring high 
                availability and security of cloud environments.
              </motion.p>

              <motion.div 
                className="pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaRocket />
                  Let's Work Together
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;