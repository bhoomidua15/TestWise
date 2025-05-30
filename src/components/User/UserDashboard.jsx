

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { 
  Clock, Award, Target, TrendingUp, Search,
  CheckCircle, XCircle, Calendar, Download,
  Filter, FileText, Medal
} from 'lucide-react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import jsPDF from 'jspdf';


const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  signature: {
    marginTop: 50,
    borderTopWidth: 1,
    borderTopColor: '#000000',
    paddingTop: 10,
    textAlign: 'center',
  }
});

const UserDashboard = () => {
  const location = useLocation();
  const { user, loading: authLoading } = useAuth();
  const [examHistory, setExamHistory] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterScore, setFilterScore] = useState('all');
  const [selectedTest, setSelectedTest] = useState(null);
  const [showCertificate, setShowCertificate] = useState(false);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    const fetchUserData = async () => {
      if (authLoading) return;

      if (!user?.id) {
        setError('User not found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const [historyResponse, performanceResponse] = await Promise.all([
          axios.get(`http://localhost:5000/api/users/${user.id}/exam-history`),
          axios.get(`http://localhost:5000/api/users/${user.id}/performance`)
        ]);

        const sortedHistory = historyResponse.data.sort((a, b) => 
          new Date(b.date) - new Date(a.date)
        );

        setExamHistory(sortedHistory);
        setPerformanceData(performanceResponse.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, authLoading]);

  const getFilteredData = () => {
    let filtered = [...examHistory];

    
    if (searchTerm) {
      filtered = filtered.filter(test => 
        test.testTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    
    if (filterScore !== 'all') {
      filtered = filtered.filter(test => {
        switch(filterScore) {
          case 'passed':
            return test.score >= 70;
          case 'failed':
            return test.score < 70;
          case 'perfect':
            return test.score === 100;
          default:
            return true;
        }
      });
    }

    
    if (selectedTimeRange !== 'all') {
      const now = new Date();
      const timeRanges = {
        'week': 7,
        'month': 30,
        'year': 365
      };
      
      const daysAgo = timeRanges[selectedTimeRange];
      const cutoffDate = new Date(now.setDate(now.getDate() - daysAgo));
      
      filtered = filtered.filter(test => 
        new Date(test.date) >= cutoffDate
      );
    }

    return filtered;
  };

  const generateCertificate = (test) => {
    const doc = new jsPDF();
    
    
    doc.setFillColor('#f8f9fa');
    doc.rect(0, 0, 210, 297, 'F');
    
    
    doc.setDrawColor('#000');
    doc.setLineWidth(1);
    doc.rect(10, 10, 190, 277);
    
    
    doc.setFontSize(24);
    doc.setTextColor('#2c3e50');
    doc.text('Certificate of Achievement', 105, 40, { align: 'center' });
    
    
    doc.setFontSize(16);
    doc.text('This is to certify that', 105, 70, { align: 'center' });
    
    doc.setFontSize(20);
    doc.setTextColor('#34495e');
    doc.text(user.name, 105, 90, { align: 'center' });
    
    doc.setFontSize(16);
    doc.setTextColor('#2c3e50');
    doc.text('has successfully completed the test', 105, 110, { align: 'center' });
    
    doc.setFontSize(18);
    doc.text(`"${test.testTitle}"`, 105, 130, { align: 'center' });
    
    doc.setFontSize(16);
    doc.text(`with a score of ${test.score}%`, 105, 150, { align: 'center' });
    
    
    doc.setFontSize(14);
    doc.text(`Date: ${new Date(test.date).toLocaleDateString()}`, 105, 180, { align: 'center' });
    
    
    doc.line(70, 230, 140, 230);
    doc.setFontSize(12);
    doc.text('Authorized Signature', 105, 240, { align: 'center' });
    
    return doc;
  };

  const downloadCertificate = (test) => {
    const doc = generateCertificate(test);
    doc.save(`${user.name}-${test.testTitle}-Certificate.pdf`);
  };

  const calculateStats = () => {
    const filteredData = getFilteredData();
    if (!filteredData.length) return { avg: 0, highest: 0, passed: 0, total: 0 };
    
    const scores = filteredData.map(exam => exam.score);
    return {
      avg: scores.reduce((a, b) => a + b, 0) / scores.length,
      highest: Math.max(...scores),
      passed: filteredData.filter(exam => exam.score >= 70).length,
      total: filteredData.length
    };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search tests..."
                className="pl-10 pr-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterScore}
              onChange={(e) => setFilterScore(e.target.value)}
            >
              <option value="all">All Scores</option>
              <option value="passed">Passed</option>
              <option value="failed">Failed</option>
              <option value="perfect">Perfect Score</option>
            </select>
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Average Score"
            value={`${stats.avg.toFixed(1)}%`}
            icon={<Target className="text-blue-500" size={24} />}
            color="blue"
          />
          <StatsCard
            title="Highest Score"
            value={`${stats.highest}%`}
            icon={<Award className="text-green-500" size={24} />}
            color="green"
          />
          <StatsCard
            title="Tests Passed"
            value={stats.passed}
            icon={<CheckCircle className="text-yellow-500" size={24} />}
            color="yellow"
          />
          <StatsCard
            title="Total Tests"
            value={stats.total}
            icon={<FileText className="text-purple-500" size={24} />}
            color="purple"
          />
        </div>

        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Performance Trend</h2>
            <select
              className="px-4 py-2 bg-gray-700 rounded-lg"
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="week">Past Week</option>
              <option value="month">Past Month</option>
              <option value="year">Past Year</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getFilteredData()}>
                <XAxis 
                  dataKey="testTitle" 
                  stroke="#fff"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#fff"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  name="Score %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-6">Recent Tests</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-700">
                  <th className="pb-4">Test Title</th>
                  <th className="pb-4">Score</th>
                  <th className="pb-4">Date</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {getFilteredData().map((test, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="py-4">{test.testTitle}</td>
                    <td className="py-4">{test.score}%</td>
                    <td className="py-4">
                      {new Date(test.date).toLocaleDateString()}
                    </td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        test.score >= 70 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                      }`}>
                        {test.score >= 70 ? 'Passed' : 'Failed'}
                      </span>
                    </td>
                    <td className="py-4">
                      {test.score >= 70 && (
                        <button
                          onClick={() => downloadCertificate(test)}
                          className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-500 rounded-lg hover:bg-blue-500/30 transition-colors"
                        >
                          <Download size={16} />
                          Certificate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const StatsCard = ({ title, value, icon, color }) => (
  <div className={`bg-gray-800 rounded-xl p-6 shadow-lg border-t-4 border-${color}-500`}>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <p className="text-3xl font-bold mt-2">{value}</p>
      </div>
      <div className="p-3 bg-gray-700 rounded-lg">
        {icon}
      </div>
    </div>
  </div>
);

export default UserDashboard;