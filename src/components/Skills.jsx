import React, { useEffect, useRef, useState, useMemo } from 'react';
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
  FaFileCode,
  FaCode,
  FaGithub,
  FaCloud,
  FaRocket,
  FaCogs
} from 'react-icons/fa';
import { SiKubernetes, SiTerraform, SiAnsible, SiGnubash, SiArgo, SiGooglecloud } from 'react-icons/si';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Float, PerspectiveCamera, Stars, Trail, Tetrahedron } from '@react-three/drei';
import '../App.css';

// 3D Floating Skill Component
function FloatingSkill({ position, color, shape = 'box' }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
      {shape === 'box' ? (
        <Box ref={meshRef} args={[0.8, 0.8, 0.8]} position={position}>
          <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
        </Box>
      ) : shape === 'sphere' ? (
        <Sphere ref={meshRef} args={[0.5, 16, 16]} position={position}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
        </Sphere>
      ) : (
        <Tetrahedron ref={meshRef} args={[0.6]} position={position}>
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </Tetrahedron>
      )}
    </Float>
  );
}

// 3D Scene Component
function Scene3D() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 12]} />
      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} />
      <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />
      
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[0, -10, 10]} intensity={0.3} color="#10b981" />
      
      <FloatingSkill position={[-4, 3, 0]} color="#3b82f6" shape="box" />
      <FloatingSkill position={[4, 2, -2]} color="#10b981" shape="sphere" />
      <FloatingSkill position={[0, -2, 3]} color="#f59e0b" shape="tetrahedron" />
      <FloatingSkill position={[-3, -1, -3]} color="#ef4444" shape="box" />
      <FloatingSkill position={[3, 1, 2]} color="#8b5cf6" shape="sphere" />
      <FloatingSkill position={[0, 3, -2]} color="#06b6d4" shape="tetrahedron" />
    </>
  );
}

// Animated Skill Card Component
function SkillCard({ skill, index, delay }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay, duration: 0.5, type: "spring" }}
      whileHover={{ 
        scale: 1.05, 
        y: -5,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center group cursor-pointer"
    >
      <motion.div 
        className="text-4xl mb-4 flex justify-center text-blue-400 group-hover:text-cyan-400 transition-colors duration-300"
        whileHover={{ rotate: 360, scale: 1.2 }}
        transition={{ duration: 0.5 }}
      >
        {skill.icon}
      </motion.div>
      <h3 className="text-white font-semibold text-sm mb-2">{skill.name}</h3>
      <motion.div 
        className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto"
        initial={{ width: 0 }}
        animate={inView ? { width: '100%' } : {}}
        transition={{ delay: delay + 0.3, duration: 0.5 }}
      />
    </motion.div>
  );
}

// Category Header Component
function CategoryHeader({ icon: Icon, title, delay }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
      className="flex items-center gap-3 mb-6"
    >
      <motion.div
        className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-full"
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <Icon className="text-white text-xl" />
      </motion.div>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
    </motion.div>
  );
}

const Skills = () => {
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

  const skills = {
    'Cloud Services': [
      { name: 'AWS EC2', icon: <FaAws /> },
      { name: 'AWS S3', icon: <FaAws /> },
      { name: 'AWS Lambda', icon: <FaBolt /> },
      { name: 'AWS RDS', icon: <FaDatabase /> },
      { name: 'AWS VPC', icon: <FaNetworkWired /> },
      { name: 'AWS IAM', icon: <FaUserShield /> },
      { name: 'AWS CloudFormation', icon: <FaLayerGroup /> },
      { name: 'AWS ECS/EKS', icon: <FaServer /> },
      { name: 'Google Cloud Platform', icon: <SiGooglecloud /> },
      { name: 'Microsoft Azure', icon: <FaCloud /> }
    ],
    'DevOps Tools': [
      { name: 'Docker', icon: <FaDocker /> },
      { name: 'Kubernetes', icon: <SiKubernetes /> },
      { name: 'Jenkins', icon: <FaJenkins /> },
      { name: 'GitLab CI/CD', icon: <FaGitlab /> },
      { name: 'Terraform', icon: <SiTerraform /> },
      { name: 'Ansible', icon: <SiAnsible /> },
      { name: 'Git', icon: <FaCodeBranch /> },
      { name: 'Prometheus', icon: <FaChartLine /> },
      { name: 'ArgoCD', icon: <SiArgo /> },
      { name: 'GitHub Actions', icon: <FaGithub /> }
    ],
    'Programming': [
      { name: 'Python', icon: <FaPython /> },
      { name: 'Bash Scripting', icon: <SiGnubash /> },
      { name: 'YAML', icon: <FaFileCode /> },
      { name: 'JSON', icon: <FaCode /> }
    ]
  };

  const categoryIcons = {
    'Cloud Services': FaCloud,
    'DevOps Tools': FaCogs,
    'Programming': FaCode
  };

  return (
    <section id="skills" className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 -z-10">
        <Canvas>
          <Scene3D />
        </Canvas>
      </div>

      {/* Animated gradient overlays */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full filter blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full filter blur-3xl"
          animate={{
            x: [0, -60, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 14,
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
              Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Expertise</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Comprehensive knowledge of cloud technologies, DevOps practices, and programming languages
              to build scalable and efficient solutions.
            </p>
          </motion.div>

          {/* Skills Categories */}
          {Object.entries(skills).map(([category, skillList], categoryIndex) => (
            <motion.div
              key={category}
              variants={containerVariants}
              className="space-y-8"
            >
              <CategoryHeader 
                icon={categoryIcons[category]} 
                title={category} 
                delay={0.3 + categoryIndex * 0.2}
              />
              
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
                variants={containerVariants}
              >
                {skillList.map((skill, index) => (
                  <SkillCard 
                    key={index}
                    skill={skill}
                    index={index}
                    delay={0.5 + categoryIndex * 0.2 + index * 0.1}
                  />
                ))}
              </motion.div>
            </motion.div>
          ))}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="text-center pt-8"
          >
            <motion.a
              href="#projects"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaRocket />
              View My Projects
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;