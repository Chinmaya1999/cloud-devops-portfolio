import React, { useEffect, useRef, useState, useMemo } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaArrowDown, FaCloud, FaServer, FaCodeBranch, FaRocket } from 'react-icons/fa';
import { SiDocker, SiKubernetes, SiTerraform, SiJenkins, SiAmazonwebservices, SiGooglecloud } from 'react-icons/si';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Float, PerspectiveCamera, Stars, Trail } from '@react-three/drei';
import '../App.css';

// 3D Cloud Infrastructure Component
function CloudInfrastructure({ position }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Box ref={meshRef} args={[1, 0.3, 1]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} />
        </Box>
        <Sphere args={[0.3, 16, 16]} position={[0.8, 0.5, 0.8]}>
          <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={0.2} />
        </Sphere>
        <Sphere args={[0.2, 16, 16]} position={[-0.8, 0.5, -0.8]}>
          <meshStandardMaterial color="#93c5fd" emissive="#3b82f6" emissiveIntensity={0.2} />
        </Sphere>
      </Float>
    </group>
  );
}

// 3D Container Component
function Container({ position, color }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={0.3}>
      <Box ref={meshRef} args={[0.8, 1, 0.8]} position={position}>
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
      </Box>
    </Float>
  );
}

// 3D Pipeline Component
function Pipeline({ position }) {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Trail
        width={0.1}
        length={6}
        color="#10b981"
        attenuation={(width) => width}
      >
        <Sphere args={[0.2, 16, 16]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.3} />
        </Sphere>
      </Trail>
      <Box args={[0.3, 0.3, 0.3]} position={[1, 0, 0]}>
        <meshStandardMaterial color="#f59e0b" />
      </Box>
      <Box args={[0.3, 0.3, 0.3]} position={[2, 0, 0]}>
        <meshStandardMaterial color="#ef4444" />
      </Box>
    </group>
  );
}

// 3D Scene Component
function Scene3D() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
      
      <CloudInfrastructure position={[-3, 2, 0]} />
      <CloudInfrastructure position={[3, -1, -2]} />
      <Container position={[-2, -2, 1]} color="#06b6d4" />
      <Container position={[2, 1, -1]} color="#8b5cf6" />
      <Pipeline position={[0, 0, 0]} />
    </>
  );
}

// Animated Tech Icon Component
function AnimatedTechIcon({ Icon, title, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, type: "spring" }}
      whileHover={{ scale: 1.2, rotate: 5 }}
      className="tech-icon-3d"
      title={title}
    >
      <Icon className="w-8 h-8" />
    </motion.div>
  );
}

// Particle Background Component
function ParticleBackground() {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 50; i++) {
      temp.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5
      });
    }
    return temp;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute bg-blue-400 rounded-full opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 50, -50, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

const Hero = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  const floatVariants = {
    float: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const techStack = [
    { Icon: SiAmazonwebservices, title: "AWS", delay: 0.8 },
    { Icon: SiDocker, title: "Docker", delay: 0.9 },
    { Icon: SiKubernetes, title: "Kubernetes", delay: 1.0 },
    { Icon: SiTerraform, title: "Terraform", delay: 1.1 },
    { Icon: SiJenkins, title: "Jenkins", delay: 1.2 },
    { Icon: SiGooglecloud, title: "Google Cloud", delay: 1.3 },
  ];

  return (
    <section id="home" className="hero min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Particle Background */}
      <ParticleBackground />
      
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
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-green-500/20 to-transparent rounded-full filter blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
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
          {/* Hero Text */}
          <motion.div variants={itemVariants} className="text-center lg:text-left">
            <motion.div 
              className="inline-flex items-center gap-2 bg-blue-500/10 backdrop-blur-sm border border-blue-500/30 rounded-full px-4 py-2 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <FaCloud className="text-blue-400" />
              <span className="text-blue-300 font-mono text-sm"> Hi, I'm Chinmaya Kumar Mallick
</span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Cloud &{' '}
              <motion.span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"
                whileHover={{ scale: 1.05 }}
              >
                DevOps
              </motion.span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl text-gray-300">Engineer</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Architecting scalable cloud solutions with cutting-edge DevOps practices. 
              Transforming infrastructure into automated, resilient, and efficient systems.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.a 
                href="#projects" 
                className="group relative bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-2xl overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View My Work <FaRocket className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              </motion.a>
              <motion.a 
                href="#contact" 
                className="bg-transparent backdrop-blur-sm border-2 border-blue-400/50 hover:border-blue-400 text-blue-300 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:bg-blue-500/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.a>
            </motion.div>
            
            {/* Social Links */}
            <motion.div 
              className="flex justify-center lg:justify-start gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { href: "https://github.com/Chinmaya1999", Icon: FaGithub },
                { href: "https://linkedin.com/in/chinmaya09", Icon: FaLinkedin },
                { href: "https://twitter.com/yourusername", Icon: FaTwitter },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-white/10"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.Icon size={24} />
                </motion.a>
              ))}
            </motion.div>
            
            {/* Tech Stack */}
            <motion.div 
              className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <p className="text-sm text-gray-400 mb-4 font-mono">TECH STACK</p>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-4">
                {techStack.map((tech, index) => (
                  <AnimatedTechIcon key={index} {...tech} />
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          {/* 3D Hero Visualization */}
          <motion.div 
            className="relative"
            variants={itemVariants}
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            }}
          >
            <div className="relative z-10">
              <motion.div 
                className="relative backdrop-blur-xl bg-white/5 rounded-2xl p-1 shadow-2xl border border-white/10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-gray-900/90 rounded-xl overflow-hidden border border-gray-700">
                  <div className="flex items-center px-4 py-3 bg-gray-800/90 border-b border-gray-700">
                    <div className="flex space-x-2">
                      <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
                      <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                      <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    </div>
                    <div className="text-xs text-gray-400 ml-4 font-mono">devops-terminal</div>
                  </div>
                  <div className="p-6 font-mono text-sm text-gray-300">
                    <AnimatePresence>
                      {[
                        { cmd: 'terraform', action: 'init', delay: 0.5 },
                        { cmd: 'aws', action: 'cloudformation deploy --template-file infra.yaml', delay: 1.5 },
                        { cmd: 'docker', action: 'build -t myapp .', delay: 2.5 },
                        { cmd: 'kubectl', action: 'apply -f k8s/deployment.yaml', delay: 3.5 },
                        { cmd: 'jenkins', action: 'build my-pipeline', delay: 4.5 },
                      ].map((line, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: line.delay, duration: 0.3 }}
                          className="mb-2"
                        >
                          <span className="text-green-400">$</span>{' '}
                          <span className="text-blue-400">{line.cmd}</span>{' '}
                          <span className="text-gray-300">{line.action}</span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    <motion.div 
                      className="text-gray-500 mt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 5.5 }}
                    >
                      # Building the future of cloud infrastructure...
                    </motion.div>
                    <motion.div className="mt-4 flex">
                      <span className="text-green-400">$</span>
                      <motion.span 
                        className="ml-2 text-blue-400"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        _
                      </motion.span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              
              {/* Floating DevOps Icons */}
              <motion.div 
                className="absolute -top-8 -right-8 text-blue-400"
                variants={floatVariants}
                animate="float"
              >
                <FaServer size={32} />
              </motion.div>
              <motion.div 
                className="absolute -bottom-8 -left-8 text-green-400"
                variants={floatVariants}
                animate="float"
                style={{ animationDelay: '1s' }}
              >
                <FaCodeBranch size={28} />
              </motion.div>
              <motion.div 
                className="absolute top-1/2 -left-12 text-cyan-400"
                variants={floatVariants}
                animate="float"
                style={{ animationDelay: '2s' }}
              >
                <SiDocker size={24} />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="text-sm text-gray-400 mb-2">Explore More</div>
          <motion.div 
            className="flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FaArrowDown className="text-blue-400" />
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .tech-icon-3d {
          @apply p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300;
        }
      `}</style>
    </section>
  );
};

export default Hero;