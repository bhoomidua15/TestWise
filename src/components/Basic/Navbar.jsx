import React, { useState, useEffect } from 'react';
import { motion, useViewportScroll } from 'framer-motion';
import { User, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProgressBar = () => {
  const { scrollYProgress } = useViewportScroll();
  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50"
      style={{ 
        scaleX: scrollYProgress,
        transformOrigin: "0%",
        backgroundColor: "rgb(59, 130, 246)",
        opacity: 0.9
      }}
    />
  );
};

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Exams', path: '/tests' },
    { name: 'Dashboard', path: '/dashboard', authRequired: true },
    { name: 'About', path: '/about' }
  ];

  return (
    <>
      <ProgressBar />
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/">
            <motion.div
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              TestWise 
            </motion.div>
          </Link>

          
          <div className="hidden md:flex space-x-4">
            {navLinks.map((item, index) => (
              (!item.authRequired || (item.authRequired && isAuthenticated)) && (
                <Link key={item.name} to={item.path}>
                  <motion.div
                    className="text-white hover:text-indigo-300 transition-colors duration-300 cursor-pointer"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {item.name}
                  </motion.div>
                </Link>
              )
            ))}
          </div>

          
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <motion.div
                  className="flex items-center space-x-2 text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <User className="w-5 h-5" />
                  <span>Hi, {user?.name || 'User'}</span>
                </motion.div>
                <motion.button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-semibold hover:from-red-600 hover:to-red-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <motion.button
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:from-blue-600 hover:to-purple-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign In
                  </motion.button>
                </Link>
                <Link to="/signup">
                  <motion.button
                    className="px-6 py-2 border-2 border-purple-500 text-white rounded-full font-semibold hover:bg-purple-500 hover:bg-opacity-20"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          
          <motion.div
            className="md:hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X size={24} className="text-white" />
              ) : (
                <Menu size={24} className="text-white" />
              )}
            </button>
          </motion.div>
        </div>

        
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-indigo-900 bg-opacity-90 backdrop-blur-md"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center py-4 space-y-2">
              {navLinks.map((item) => (
                (!item.authRequired || (item.authRequired && isAuthenticated)) && (
                  <Link key={item.name} to={item.path} className="w-full">
                    <motion.div
                      className="w-full text-center py-2 text-white hover:bg-indigo-700 transition duration-300"
                      whileHover={{ scale: 1.05, x: 10 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </motion.div>
                  </Link>
                )
              ))}
              {isAuthenticated ? (
                <>
                  <motion.div className="text-white py-2">
                    Hi, {user?.name || 'User'}
                  </motion.div>
                  <motion.button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-center py-2 text-white bg-red-500 hover:bg-red-600 transition duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Logout
                  </motion.button>
                </>
              ) : (
                <>
                  <Link to="/login" className="w-full">
                    <motion.button
                      className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </motion.button>
                  </Link>
                  <Link to="/signup" className="w-full">
                    <motion.button
                      className="w-full py-2 border-2 border-purple-500 text-white font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </motion.button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </motion.nav>
    </>
  );
}

export default Navbar;