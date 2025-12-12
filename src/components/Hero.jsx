import React, { useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaArrowDown } from 'react-icons/fa';
import {  SiDocker, SiKubernetes, SiTerraform, SiJenkins } from 'react-icons/si';
import { FaAws } from "react-icons/fa6";
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../App.css';

const Hero = () => {
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const floatVariants = {
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section id="home" className="hero min-h-screen flex items-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-50 to-transparent rounded-full filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-green-50 to-transparent rounded-full filter blur-3xl opacity-70"></div>
      </div>

      <div className="container mx-auto px-6">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {/* Hero Text */}
          <motion.div variants={itemVariants} className="text-center lg:text-left">
            <motion.p 
              className="text-primary-600 dark:text-primary-400 font-mono mb-4 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Hi, I'm Chinmaya Kumar Mallick
            </motion.p>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Cloud & <span className="text-primary-600 dark:text-primary-400">DevOps</span>
              <br />
              Engineer
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              I build and optimize cloud-native solutions with a focus on automation, scalability, and security. 
              Let's transform your ideas into reliable, high-performance infrastructure.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <a 
                href="#projects" 
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                View My Work
              </a>
              <a 
                href="#contact" 
                className="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-primary-600 dark:text-primary-400 border-2 border-primary-600 dark:border-primary-400 px-8 py-3 rounded-lg font-medium transition-colors duration-300 transform hover:-translate-y-1"
              >
                Contact Me
              </a>
            </motion.div>
            
            {/* Social Links */}
            <motion.div 
              className="flex justify-center lg:justify-start gap-6 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <FaGithub size={24} />
              </a>
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <FaLinkedin size={24} />
              </a>
              <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <FaTwitter size={24} />
              </a>
            </motion.div>
            
            {/* Tech Stack */}
            <motion.div 
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">TECH STACK</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <div className="tech-icon" title="AWS">
                  <FaAws className="w-8 h-8" />
                </div>
                <div className="tech-icon" title="Docker">
                  <SiDocker className="w-8 h-8" />
                </div>
                <div className="tech-icon" title="Kubernetes">
                  <SiKubernetes className="w-8 h-8" />
                </div>
                <div className="tech-icon" title="Terraform">
                  <SiTerraform className="w-8 h-8" />
                </div>
                <div className="tech-icon" title="Jenkins">
                  <SiJenkins className="w-8 h-8" />
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Hero Image / Illustration */}
          <motion.div 
            className="relative"
            variants={itemVariants}
          >
            <div className="relative z-10">
              <motion.div 
                className="relative bg-white dark:bg-gray-800 rounded-2xl p-1 shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="bg-gray-800 rounded-xl overflow-hidden">
                  <div className="flex items-center px-4 py-3 bg-gray-900">
                    <div className="flex space-x-2">
                      <span className="w-3 h-3 rounded-full bg-red-500"></span>
                      <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                      <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    </div>
                    <div className="text-xs text-gray-400 ml-4">terminal</div>
                  </div>
                  <div className="p-6 font-mono text-sm text-gray-300">
                    <div className="mb-2">
                      <span className="text-green-400">$</span>{' '}
                      <span className="text-blue-400">terraform</span> init
                    </div>
                    <div className="mb-2">
                      <span className="text-green-400">$</span>{' '}
                      <span className="text-blue-400">aws</span> cloudformation deploy
                    </div>
                    <div className="mb-2">
                      <span className="text-green-400">$</span>{' '}
                      <span className="text-blue-400">kubectl</span> apply -f k8s/
                    </div>
                    <div className="text-gray-500">
                      # Building the future, one command at a time...
                    </div>
                    <div className="mt-4 flex">
                      <span className="text-green-400">$</span>
                      <span className="ml-2 animate-pulse">_</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Floating elements */}
              <motion.div 
                className="absolute -top-6 -right-6 w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full opacity-50"
                variants={floatVariants}
                animate="float"
              />
              <motion.div 
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-green-100 dark:bg-green-900 rounded-full opacity-50"
                variants={floatVariants}
                animate="float"
                style={{ animationDelay: '1s' }}
              />
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
          <div className="text-sm text-gray-500 mb-2">Scroll Down</div>
          <div className="animate-bounce">
            <FaArrowDown className="mx-auto text-gray-400" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;