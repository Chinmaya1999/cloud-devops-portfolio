import React, { useState, useEffect, useRef, useMemo } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter, FaAws, FaRocket, FaPaperPlane } from 'react-icons/fa';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Float, PerspectiveCamera, Stars, Trail, Octahedron } from '@react-three/drei';
import '../App.css';

// 3D Floating Contact Component
function FloatingContact({ position, color, shape = 'box' }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.25;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.4}>
      {shape === 'box' ? (
        <Box ref={meshRef} args={[0.7, 0.7, 0.7]} position={position}>
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </Box>
      ) : (
        <Octahedron ref={meshRef} args={[0.5]} position={position}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
        </Octahedron>
      )}
    </Float>
  );
}

// 3D Scene Component
function Scene3D() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} />
      <Stars radius={100} depth={50} count={1600} factor={4} saturation={0} fade speed={1} />
      
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
      <pointLight position={[0, -10, 10]} intensity={0.3} color="#3b82f6" />
      
      <FloatingContact position={[-3, 2, 0]} color="#06b6d4" shape="box" />
      <FloatingContact position={[3, -1, -2]} color="#3b82f6" shape="octahedron" />
      <FloatingContact position={[0, 0, 2]} color="#10b981" shape="box" />
      <FloatingContact position={[-2, -2, -2]} color="#8b5cf6" shape="octahedron" />
      <FloatingContact position={[2, 3, 1]} color="#f59e0b" shape="box" />
    </>
  );
}

// Animated Contact Info Card Component
function ContactInfoCard({ icon: Icon, title, content, delay, color }) {
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
      whileHover={{ 
        scale: 1.05, 
        x: 10,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 flex items-center space-x-4 group cursor-pointer"
    >
      <motion.div 
        className={`bg-gradient-to-br ${color} p-4 rounded-full`}
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.5 }}
      >
        <Icon className="text-white text-xl" />
      </motion.div>
      <div className="flex-1">
        <h4 className="font-semibold text-white">{title}</h4>
        <p className="text-gray-300">{content}</p>
      </div>
    </motion.div>
  );
}

// Animated Social Link Component
function SocialLink({ icon: Icon, href, label, delay, color }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, duration: 0.5, type: "spring" }}
      whileHover={{ 
        scale: 1.2, 
        rotate: 10,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)'
      }}
      whileTap={{ scale: 0.9 }}
      className={`${color} text-white p-4 rounded-full transition-all duration-300`}
      title={label}
    >
      <Icon className="text-xl" />
    </motion.a>
  );
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const response = await fetch('https://formspree.io/f/xaqldqwj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email
        }),
      });

      if (response.ok) {
        setSubmitStatus('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setSubmitStatus('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
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

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: 'Email',
      content: 'chinmaya.dob1999@gmail.com',
      delay: 0.6,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FaPhone,
      title: 'Phone',
      content: 'Available on Request',
      delay: 0.7,
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Location',
      content: 'Remote / Available Worldwide',
      delay: 0.8,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const socialLinks = [
    {
      icon: FaGithub,
      href: 'https://github.com/Chinmaya1999',
      label: 'GitHub',
      delay: 1.0,
      color: 'bg-gray-800 hover:bg-gray-700'
    },
    {
      icon: FaLinkedin,
      href: 'https://linkedin.com/in/chinmaya09',
      label: 'LinkedIn',
      delay: 1.1,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      icon: FaTwitter,
      href: 'https://twitter.com',
      label: 'Twitter',
      delay: 1.2,
      color: 'bg-sky-500 hover:bg-sky-600'
    },
    {
      icon: FaAws,
      href: 'https://aws.amazon.com',
      label: 'AWS',
      delay: 1.3,
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  return (
    <section id="contact" className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
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
            x: [0, 80, 0],
            y: [0, -80, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full filter blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 18,
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
              Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Touch</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? I'd love to hear from you!
            </p>
          </motion.div>
          
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
            variants={containerVariants}
          >
            {/* Contact Information */}
            <motion.div variants={containerVariants} className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
              >
                <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <ContactInfoCard key={index} {...info} />
                  ))}
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
              >
                <h3 className="text-2xl font-semibold text-white mb-6">Connect With Me</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <SocialLink key={index} {...social} />
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
            >
              <h3 className="text-2xl font-semibold text-white mb-6">Send Me a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name *
                    </label>
                    <input 
                      type="text" 
                      name="name"
                      placeholder="John Doe" 
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Email *
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      placeholder="john@example.com" 
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input 
                    type="text" 
                    name="subject"
                    placeholder="Project Inquiry" 
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Message *
                  </label>
                  <textarea 
                    name="message"
                    placeholder="Tell me about your project or idea..." 
                    rows="5" 
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-white placeholder-gray-400"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <motion.button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-4 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </motion.button>
                
                <AnimatePresence>
                  {submitStatus && (
                    <motion.div 
                      className={`p-4 rounded-lg border ${
                        submitStatus.includes('successfully') 
                          ? 'bg-green-500/20 border-green-500/50 text-green-300' 
                          : 'bg-red-500/20 border-red-500/50 text-red-300'
                      }`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {submitStatus}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;