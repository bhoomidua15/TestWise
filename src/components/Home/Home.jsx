import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useViewportScroll, useTransform } from 'framer-motion';
import { User, Lock, BookOpen, Award, BarChart, Shield, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import Hero from './Hero';



const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const controls = useAnimation();
  const { scrollYProgress } = useViewportScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const sliderContent = [
    { title: 'Next-Gen Online Exams', description: 'Experience the future of assessment', image: '/futuristic-exam-1.jpg' },
    { title: 'AI-Powered Grading', description: 'Instant results with unparalleled accuracy', image: '/ai-grading.jpg' },
    { title: 'Blockchain Certificates', description: 'Tamper-proof credentials for the digital age', image: '/blockchain-cert.jpg' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderContent.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);


  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderContent.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + sliderContent.length) % sliderContent.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 text-white overflow-hidden">
      

      
      <Hero/>

      
      <section ref={ref} className="py-20 bg-gradient-to-b from-indigo-900 to-purple-900">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 50 },
            }}
            transition={{ duration: 0.3 }}
          >
            Cutting-Edge Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <User size={48} />, title: 'Biometric Authentication', description: 'Secure access with advanced facial and voice recognition' },
              { icon: <Lock size={48} />, title: 'Quantum Encryption', description: 'Unbreakable security for your exams and data' },
              { icon: <BookOpen size={48} />, title: 'AI-Powered Question Generation', description: 'Dynamic, personalized questions tailored to each student' },
              { icon: <Award size={48} />, title: 'Instant Holographic Certificates', description: 'Receive 3D holographic certificates upon completion' },
              { icon: <BarChart size={48} />, title: 'Predictive Analytics', description: 'Forecast student performance with quantum computing' },
              { icon: <Shield size={48} />, title: 'Neural Monitoring', description: 'Ensure exam integrity with non-invasive brainwave analysis' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 hover:bg-opacity-20 transition duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={controls}
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 50 },
                }}
                transition={{ duration: 0.4, delay: index * 0.0001 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <motion.div
                  className="text-blue-400 mb-4"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 ">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-20 bg-gradient-to-b from-purple-900 to-indigo-900">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Experience the Future
          </motion.h2>
          <div className="relative h-96 overflow-hidden rounded-lg">
            {sliderContent.map((slide, index) => (
              <motion.div
                key={index}
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, x: 100 }}
                animate={{ 
                  opacity: index === currentSlide ? 1 : 0,
                  x: index === currentSlide ? 0 : 100
                }}
                transition={{ duration: 0.5 }}
              >
                <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-center">
                    <motion.h3 
                      className="text-3xl md:text-4xl font-bold mb-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {slide.title}
                    </motion.h3>
                    <motion.p 
                      className="text-xl"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {slide.description}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ))}
            <motion.button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white"
              onClick={prevSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={48} />
            </motion.button>
            <motion.button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
              onClick={nextSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={48} />
            </motion.button>
          </div>
        </div>
      </section>

      
      <section className="py-20 bg-gradient-to-b from-indigo-900 to-blue-900">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Voices from the Future
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Zara X', role: 'Quantum Student', content: 'TestWise\'s neural interface made studying a breeze. I literally dreamed my way to certification!' },
              { name: 'Neo Smith', role: 'AI Instructor', content: 'As an AI, I appreciate how TestWise has revolutionized the way we assess both human and artificial intelligence.' },
              { name: 'Aria Quantum', role: 'Holographic Administrator', content: 'Managing exams across multiple dimensions has never been easier. TestWise is truly universal!' },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 hover:bg-opacity-20 transition duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.001 }}
                whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12   bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center  text-xl font-bold mr-4">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <h3 className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold ">{testimonial.name}</h3>
                    <p className="text-blue-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-20 bg-gradient-to-b from-blue-900 to-purple-900">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Next-Gen Exam Types
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Quantum Computing Challenges', description: 'Solve complex problems in superposition states.' },
              { title: 'Neural Interface Essays', description: 'Compose thoughtful pieces directly from your mind.' },
              { title: 'Holographic Coding Arenas', description: 'Build 3D applications in immersive environments.' },
              { title: 'Time-Dilated Language Exams', description: 'Master languages faster than ever before.' },
              { title: 'Multiverse Ethics Simulations', description: 'Navigate moral dilemmas across parallel realities.' },
              { title: 'Nano-Engineering Practicals', description: 'Manipulate matter at the atomic level in virtual labs.' },
            ].map((examType, index) => (
              <motion.div
                key={index}
                className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 hover:bg-opacity-20 transition duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.001 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">{examType.title}</h3>
                <p className="text-gray-500">{examType.description}</p>
                <motion.button
                  className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-blue-600 hover:to-purple-700 transition duration-300"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(79, 70, 229, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Step into the Future of Learning
          </motion.h2>
          <motion.p
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join millions in the cognitive revolution. Your mind is the only limit.
          </motion.p>
          <motion.button
            className="px-8 py-3 bg-white text-blue-600 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            Initiate Neural Link
          </motion.button>
        </div>
      </section>

      
      
    </div>
  );
};

export default Home;