import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  ChevronRight, 
  Search, 
  CheckCircle, 
  XCircle, 
  Book,
  Filter,
  SortAsc,
  Calendar,
  Loader,
  Users,
  Trophy,
  Star,
  GraduationCap,
  Timer,
  AlertTriangle,
  BookOpen
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const TestList = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [attemptedTests, setAttemptedTests] = useState([]);
  const [testStats, setTestStats] = useState({});
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        const testsResponse = await axios.get('http://localhost:5000/api/tests');
        setTests(testsResponse.data);

        try {
          const statsResponse = await axios.get('http://localhost:5000/api/tests/stats');
          setTestStats(statsResponse.data || {});
        } catch (statsErr) {
          console.warn('Failed to load test statistics:', statsErr);
          setTestStats({});
        }

        if (user?.id) {
          try {
            const attemptsResponse = await axios.get(
              `http://localhost:5000/api/users/${user.id}/test-attempts`
            );
            setAttemptedTests(attemptsResponse.data || []);
          } catch (attemptsErr) {
            console.warn('Failed to load user attempts:', attemptsErr);
            setAttemptedTests([]);
          }
        }

        setError(null);
      } catch (err) {
        console.error('Error fetching tests:', err);
        setError('Failed to load tests. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchTests();
    }
  }, [user, authLoading]);

  const handleStartTest = (testId) => {
    if (!user) {
      navigate('/login', { 
        state: { 
          from: `/tests/${testId}`,
          message: 'Please login to take the test' 
        } 
      });
      return;
    }
    navigate(`/tests/${testId}`);
  };

  const getFilteredAndSortedTests = () => {
    let filtered = [...tests];

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(test => 
        test.title.toLowerCase().includes(searchLower) ||
        test.description.toLowerCase().includes(searchLower) ||
        test.category?.toLowerCase().includes(searchLower)
      );
    }

    if (filter !== 'all' && user) {
      filtered = filtered.filter(test => {
        const isAttempted = attemptedTests.includes(test._id);
        return filter === 'attempted' ? isAttempted : !isAttempted;
      });
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'duration':
          return a.duration - b.duration;
        case 'popularity':
          return (testStats[b._id]?.attempts || 0) - (testStats[a._id]?.attempts || 0);
        case 'date':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    return filtered;
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Loading available tests...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center p-8 bg-gray-800 rounded-xl shadow-2xl">
          <AlertTriangle className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
              <BookOpen className="mr-4 h-8 w-8 text-blue-500" />
              Available Tests
            </h1>
            <p className="text-xl text-gray-400">
              {user ? 'Choose a test to begin your assessment' : 'Log in to take tests'}
            </p>
          </motion.div>
        </div>

        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            
            <div className="relative flex-1">
              <motion.div
                animate={{
                  scale: isSearchFocused ? 1.02 : 1,
                  boxShadow: isSearchFocused ? "0 0 20px rgba(59, 130, 246, 0.5)" : "none"
                }}
                className="relative"
              >
                <Search 
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200
                    ${isSearchFocused ? 'text-blue-500' : 'text-gray-400'}`} 
                  size={20} 
                />
                <input
                  type="text"
                  placeholder="Search tests by title, description, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                />
              </motion.div>
            </div>

            
            {user && (
              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-4 py-3 bg-gray-800 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer hover:bg-gray-700 transition-colors duration-200"
                >
                  <option value="all">All Tests</option>
                  <option value="attempted">Attempted</option>
                  <option value="notAttempted">Not Attempted</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 bg-gray-800 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer hover:bg-gray-700 transition-colors duration-200"
                >
                  <option value="date">Latest</option>
                  <option value="title">Title</option>
                  <option value="duration">Duration</option>
                  <option value="popularity">Most Popular</option>
                </select>
              </div>
            )}
          </div>
        </motion.div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {getFilteredAndSortedTests().map((test, index) => (
              <motion.div
                key={test._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group relative bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {test.title}
                      </h2>
                      <p className="text-gray-400 text-sm line-clamp-2">{test.description}</p>
                    </div>
                    {user && (
                      attemptedTests.includes(test._id) ? (
                        <span className="bg-green-500/20 text-green-500 px-3 py-1 rounded-full text-sm flex items-center">
                          <CheckCircle size={16} className="mr-1" />
                          Completed
                        </span>
                      ) : (
                        <span className="bg-blue-500/20 text-blue-500 px-3 py-1 rounded-full text-sm flex items-center">
                          <Star size={16} className="mr-1" />
                          New
                        </span>
                      )
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-400">
                      <Timer size={16} className="mr-2" />
                      <span>{test.duration} minutes</span>
                    </div>
                    
                    {testStats[test._id] && (
                      <div className="flex items-center text-gray-400">
                        <Users size={16} className="mr-2" />
                        <span>{testStats[test._id].attempts || 0} attempts</span>
                      </div>
                    )}
                    
                    {testStats[test._id]?.avgScore > 0 && (
                      <div className="flex items-center text-gray-400">
                        <Trophy size={16} className="mr-2" />
                        <span>Avg. Score: {testStats[test._id].avgScore}%</span>
                      </div>
                    )}

                    {test.category && (
                      <div className="flex items-center text-gray-400">
                        <GraduationCap size={16} className="mr-2" />
                        <span>{test.category}</span>
                      </div>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleStartTest(test._id)}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl flex items-center justify-center group hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                  >
                    {user ? 'Start Test' : 'Login to Start'}
                    <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        
        {getFilteredAndSortedTests().length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <XCircle className="mx-auto h-16 w-16 text-gray-600 mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">No tests found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TestList;