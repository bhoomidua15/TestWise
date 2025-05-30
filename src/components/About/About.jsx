import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Award, BookOpen, Calendar, Clock, Code, Globe, GraduationCap, History, Lightbulb, Medal, Rocket, School, Star, Target, Trophy, Users, Shield } from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import a3 from "../../assets/images/a3.png"
import a4 from "../../assets/images/a4.jpg"
import a5 from "../../assets/images/a5.jpg"

const About = () => {
  const controls = useAnimation();
  
  const [heroRef, heroInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [missionRef, missionInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [statsRef, statsInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [timelineRef, timelineInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [teamRef, teamInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [visionRef, visionInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const timelineData = [
    {
      year: '2021',
      title: 'TestWise Founded',
      description: 'Started with a vision to revolutionize online examination systems'
    },
    {
      year: '2022',
      title: 'AI Integration',
      description: 'Pioneered AI-powered assessment technology'
    },
    {
      year: '2023',
      title: 'Global Expansion',
      description: 'Expanded to 50+ countries with quantum-secure infrastructure'
    },
    {
      year: '2024',
      title: 'Neural Interface',
      description: 'Launched breakthrough neural monitoring technology'
    },
    {
      year: '2025',
      title: 'Blockchain Certification',
      description: 'Implemented tamper-proof credential system'
    },
   
  ];

  const teamData = [
    {
      name: 'abc',
      role: 'Founder & CEO & Developer',
      bio: 'A Full Stack Developer with amazing business Skills',
      image: a5,
    },
   
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 text-white overflow-hidden">
      <section 
        ref={heroRef} 
        className="py-20 md:py-32 relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80"></div>
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1 
              variants={textVariants}
              className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            >
              About TestWise
            </motion.h1>
            
            <motion.p 
              variants={textVariants}
              className="text-xl md:text-2xl mb-8 text-blue-100"
            >
              Pioneering the future of assessment technology with quantum computing and neural interfaces
            </motion.p>
            
            <motion.div
              variants={cardVariants}
              className="flex flex-wrap justify-center gap-4 mt-12"
            >
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="bg-white/10 backdrop-blur-lg rounded-lg p-6 flex items-center gap-4"
              >
                <Rocket size={40} className="text-blue-400" />
                <div className="text-left">
                  <h3 className="text-xl font-semibold">Innovation First</h3>
                  <p className="text-blue-200">Pushing boundaries since 2018</p>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="bg-white/10 backdrop-blur-lg rounded-lg p-6 flex items-center gap-4"
              >
                <Globe size={40} className="text-purple-400" />
                <div className="text-left">
                  <h3 className="text-xl font-semibold">Global Reach</h3>
                  <p className="text-blue-200">Serving 120+ countries</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section 
        ref={missionRef}
        className="py-20 bg-gradient-to-b from-indigo-900 to-purple-900"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={missionInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={textVariants}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Our Mission
              </h2>
              
              <p className="text-lg mb-6 text-blue-100">
                At TestWise, we're revolutionizing the assessment landscape through cutting-edge technology and innovative approaches to learning evaluation.
              </p>
              
              <p className="text-lg mb-6 text-blue-100">
                Our mission is to create a seamless, secure, and intelligent examination ecosystem that adapts to the evolving needs of education and professional certification in the quantum age.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {[
                  { icon: <Target size={24} />, text: "Precision Assessment" },
                  { icon: <Shield size={24} />, text: "Quantum Security" },
                  { icon: <GraduationCap size={24} />, text: "Adaptive Learning" },
                  { icon: <Globe size={24} />, text: "Global Accessibility" }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 bg-white/10 p-3 rounded-lg"
                  >
                    <div className="text-blue-400">{item.icon}</div>
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              variants={cardVariants}
              className="relative"
            >
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <img 
                  src={a3} 
                  alt="TestWise Mission" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent"></div>
                
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-6"
                  initial={{ y: 50, opacity: 0 }}
                  animate={missionInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <h3 className="text-2xl font-bold mb-2">Redefining Excellence</h3>
                  <p className="text-blue-200">Our neural interfaces and quantum algorithms ensure unparalleled assessment accuracy</p>
                </motion.div>
              </div>
              
              <motion.div 
                className="absolute -top-6 -right-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full h-24 w-24 flex items-center justify-center"
                animate={{ 
                  rotate: [0, 10, 0, -10, 0],
                  scale: [1, 1.05, 1, 1.05, 1]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 5
                }}
              >
                <Lightbulb size={36} />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section 
        ref={statsRef}
        className="py-20 bg-gradient-to-b from-purple-900 to-blue-900"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
          >
            TestWise in Numbers
          </motion.h2>
          
          <motion.div 
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { icon: <Users size={48} />, value: 5000000, suffix: "+", label: "Students" },
              { icon: <School size={48} />, value: 1200, suffix: "+", label: "Institutions" },
              { icon: <BookOpen size={48} />, value: 25000, suffix: "+", label: "Exams Created" },
              { icon: <Globe size={48} />, value: 120, suffix: "+", label: "Countries" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-center"
              >
                <motion.div 
                  className="text-blue-400 mb-4 mx-auto"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {stat.icon}
                </motion.div>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  {statsInView ? (
                    <CountUp end={stat.value} duration={2.5} separator="," />
                  ) : 0}
                  {stat.suffix}
                </h3>
                
                <p className="text-blue-200">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-8 text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Quantum-Powered Growth</h3>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto">
              Our neural network has processed over 
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mx-2">
                {statsInView ? <CountUp end={10000000000} duration={3} separator="," /> : 0}
              </span> 
              assessment data points, making our AI the most sophisticated in the industry.
            </p>
          </motion.div>
        </div>
      </section>

      <section 
        ref={timelineRef}
        className="py-20 bg-gradient-to-b from-blue-900 to-indigo-900"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
          >
            Our Journey
          </motion.h2>
          
          <div className="relative">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600 transform md:translate-x-[-50%]"></div>
            
            <motion.div
              initial="hidden"
              animate={timelineInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              {timelineData.map((item, index) => (
                <motion.div 
                  key={index}
                  variants={cardVariants}
                  className={`relative mb-12 md:mb-24 ${
                    index % 2 === 0 ? 'md:ml-[50%] pl-8 md:pl-12' : 'md:mr-[50%] md:text-right pl-8 md:pl-0 md:pr-12'
                  }`}
                >
                  <motion.div 
                    className="absolute left-[-12px] md:left-auto md:right-auto md:translate-x-[-50%] top-0 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 z-10 flex items-center justify-center"
                    style={{ 
                      left: index % 2 === 0 ? '-12px' : 'auto',
                      right: index % 2 === 1 ? 'auto' : '-12px',
                      [index % 2 === 0 ? 'md:left' : 'md:right']: '50%'
                    }}
                    whileHover={{ scale: 1.5 }}
                  >
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  </motion.div>
                  
                  <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 ml-4 md:ml-0">
                    <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold mb-4">
                      {item.year}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                      {item.title}
                    </h3>
                    <p className="text-blue-100">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section 
        ref={teamRef}
        className="py-20 bg-gradient-to-b from-indigo-900 to-purple-900"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
          >
            Visionary Team
          </motion.h2>
          
          <motion.div
            initial="hidden"
            animate={teamInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {teamData.map((member, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(79, 70, 229, 0.5)"
                }}
                className="bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden"
              >
                <div className="h-64 relative overflow-hidden">
                  <img 
                    src={a5} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                    <p className="text-blue-300">{member.role}</p>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-blue-100">{member.bio}</p>
                  
                  <div className="flex justify-center mt-4 space-x-3">
                    {[1, 2, 3].map((_, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
                      >
                        {i === 0 && <Globe size={16} />}
                        {i === 1 && <Code size={16} />}
                        {i === 2 && <Star size={16} />}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section 
        ref={visionRef}
        className="py-20 bg-gradient-to-b from-purple-900 to-blue-900"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={visionInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <motion.div 
              variants={cardVariants}
              className="order-2 md:order-1"
            >
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <img 
                  src={a4} 
                  alt="TestWise Vision" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div>
                
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-6"
                  initial={{ y: 50, opacity: 0 }}
                  animate={visionInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <h3 className="text-2xl font-bold mb-2">Beyond Tomorrow</h3>
                  <p className="text-blue-200">Our vision extends to the frontiers of what's possible in assessment technology</p>
                </motion.div>
              </div>
              
              <motion.div 
                className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full h-24 w-24 flex items-center justify-center"
                animate={{ 
                  rotate: [0, 10, 0, -10, 0],
                  scale: [1, 1.05, 1, 1.05, 1]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 5
                }}
              >
                <Rocket size={36} />
              </motion.div>
            </motion.div>
            
            <motion.div variants={textVariants} className="order-1 md:order-2">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Our Vision
              </h2>
              
              <p className="text-lg mb-6 text-blue-100">
                We envision a future where assessment transcends traditional boundaries, where learning and evaluation become a seamless, intuitive experience powered by the most advanced technologies humanity has developed.
              </p>
              
              <p className="text-lg mb-6 text-blue-100">
                By 2030, we aim to pioneer the first fully immersive neural assessment platform, where knowledge is evaluated not just through responses, but through comprehensive understanding measured at the cognitive level.
              </p>
              
              <div className="grid grid-cols-1 gap-4 mt-8">
                {[
                  { icon: <Calendar size={24} />, title: "2025 Milestone", text: "Full neural interface integration" },
                  { icon: <Trophy size={24} />, title: "2027 Milestone", text: "Quantum-secured global certification network" },
                  { icon: <Award size={24} />, title: "2030 Vision", text: "Cognitive-level assessment platform" }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="flex items-center gap-4 bg-white/10 p-4 rounded-lg"
                  >
                    <div className="text-purple-400 bg-white/20 p-3 rounded-full">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                        {item.title}
                      </h4>
                      <p className="text-blue-100">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Join the Assessment Revolution
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl mb-8 max-w-3xl mx-auto"
          >
            Experience the future of examination technology today. Elevate your institution with TestWise's quantum-secure, AI-powered assessment platform.
          </motion.p>
          
          <motion.button
            className="px-8 py-3 bg-white text-blue-600 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            Schedule a Demo
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default About;
