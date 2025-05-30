// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');
// const http = require('http');
// const socketIo = require('socket.io');
// const moment = require('moment');
// const _ = require('lodash');
// const { body, validationResult } = require('express-validator');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//     cors: {
//       origin: "http://localhost:5173",
//       methods: ["GET", "POST"],
//       credentials: true
//     },
//     pingTimeout: 60000,
//     transports: ['websocket', 'polling']
//   });

//   io.on('connection', (socket) => {
//     console.log('Client connected');
    
//     socket.on('disconnect', () => {
//       console.log('Client disconnected');
//     });
//   });
// // Middleware
// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true
//   }));
// app.use(express.json());

// // MongoDB connection
// mongoose.connect('mongodb://127.0.0.1:27017/exampro', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch(err => console.error('Could not connect to MongoDB', err));

// // User model
// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['student', 'examiner'], default: 'student' },
// });

// const User = mongoose.model('User', userSchema);

// // JWT secret
// const JWT_SECRET = 'your_jwt_secret'; // In production, use an environment variable

// // Routes
// app.post('/api/signup', [
//   body('name').notEmpty().withMessage('Name is required'),
//   body('email').isEmail().withMessage('Enter a valid email'),
//   body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
// ], async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   try {
//     const { name, email, password, role } = req.body;

//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     user = new User({
//       name,
//       email,
//       password: hashedPassword,
//       role: role || 'student',
//     });

//     await user.save();

//     const payload = {
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     };

//     jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
//       if (err) throw err;
//       res.json({ token, user: payload.user });
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// app.post('/api/login', [
//   body('email').isEmail().withMessage('Enter a valid email'),
//   body('password').exists().withMessage('Password is required'),
// ], async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   try {
//     const { email, password } = req.body;

//     let user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const payload = {
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     };

//     jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
//       if (err) throw err;
//       res.json({ token, user: payload.user });
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });


// const testSchema = new mongoose.Schema({
//     title: {
//       type: String,
//       required: true
//     },
//     description: {
//       type: String,
//       required: true
//     },
//     duration: {
//       type: Number,
//       required: true
//     },
//     questions: [{
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Question'
//     }]
//   });

// const Test = mongoose.model('Test', testSchema);
// const questionSchema = new mongoose.Schema({
//     text: {
//       type: String,
//       required: true
//     },
//     options: [{
//       type: String,
//       required: true
//     }],
//     correctAnswer: {
//       type: String,
//       required: true
//     },
//     type: {
//       type: String,
//       default: 'mcq'
//     }
//   });
//   const Question = mongoose.model('Question',questionSchema );
//   const testResultSchema = new mongoose.Schema({
//     test: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Test',
//       required: true
//     },
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true
//     },
//     answers: [{
//       questionId: String,
//       selectedAnswer: String
//     }],
//     score: {
//       type: Number,
//       required: true
//     },
//     totalQuestions: {
//       type: Number,
//       required: true
//     },
//     completedAt: {
//       type: Date,
//       default: Date.now
//     }
//   });
//   const TestResult = mongoose.model('TestResult', testResultSchema);

  
//   const Attempt = mongoose.model('Attempt', {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
//     answers: [{ question: mongoose.Schema.Types.ObjectId, answer: String }],
//     score: Number,
//     startTime: Date,
//     endTime: Date,
//   });
  
//   // Routes
  
//   app.get('/api/tests', async (req, res) => {
//     try {
//         const tests = await Test.find();
//         res.json(tests);
//     } catch (err) {
//         console.error('Error fetching tests:', err);
//         res.status(500).json({ message: 'Server error' });
//     }
// });
  
//   app.post('/api/tests', async (req, res) => {
//     try {
//         const test = new Test({
//             title: req.body.title,
//             description: req.body.description,
//             duration: req.body.duration,
//             questions: req.body.questions
//         });
//         await test.save();
//         res.status(201).json(test);
//     } catch (err) {
//         console.error('Error creating test:', err);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

  
//   app.put('/api/tests/:id', async (req, res) => {
//     const { title, description, duration } = req.body;
//     const test = await Test.findByIdAndUpdate(req.params.id, { title, description, duration }, { new: true });
//     res.json(test);
//   });
  
//   app.delete('/api/tests/:id', async (req, res) => {
//     await Test.findByIdAndDelete(req.params.id);
//     res.sendStatus(204);
//   });
  
//   app.get('/api/tests/:id/questions', async (req, res) => {
//     const test = await Test.findById(req.params.id).populate('questions');
//     const shuffledQuestions = _.shuffle(test.questions);
//     res.json(shuffledQuestions);
//   });
//   app.post('/api/tests/:id/questions', async (req, res) => {
//     try {
//       const test = await Test.findById(req.params.id);
//       if (!test) {
//         return res.status(404).json({ message: 'Test not found' });
//       }
  
//       const question = new Question({
//         text: req.body.text,
//         options: req.body.options,
//         correctAnswer: req.body.correctAnswer,
//         type: req.body.type || 'mcq'
//       });
  
//       await question.save();
//       test.questions.push(question._id);
//       await test.save();
  
//       res.status(201).json(question);
//     } catch (err) {
//       console.error('Error creating question:', err);
//       res.status(500).json({ message: 'Server error' });
//     }
//   });
  

  

// // Submit test route
// app.post('/api/tests/:id/submit', async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { answers, userId } = req.body; // Make sure to send userId from frontend
  
//       // Find the test and populate questions
//       const test = await Test.findById(id).populate('questions');
//       if (!test) {
//         return res.status(404).json({ message: 'Test not found' });
//       }
  
//       // Calculate score
//       let correctAnswers = 0;
//       const totalQuestions = test.questions.length;
  
//       answers.forEach(answer => {
//         const question = test.questions.find(q => q._id.toString() === answer.questionId);
//         if (question && question.correctAnswer === answer.answer) {
//           correctAnswers++;
//         }
//       });
  
//       const score = (correctAnswers / totalQuestions) * 100;
  
//       // Create test result with user ID
//       const testResult = new TestResult({
//         user: userId, // Add user ID here
//         test: test._id,
//         answers: answers.map(({ questionId, answer }) => ({
//           questionId,
//           selectedAnswer: answer
//         })),
//         score,
//         totalQuestions,
//         completedAt: new Date()
//       });
  
//       await testResult.save();
  
//       res.json({
//         score,
//         totalQuestions,
//         correctAnswers,
//         message: 'Test submitted successfully'
//       });
  
//     } catch (error) {
//       console.error('Error submitting test:', error);
//       res.status(500).json({ message: 'Error submitting test' });
//     }
//   });    
//   app.get('/api/users/:id/exam-history', async (req, res) => {
//     try {
//       const userId = req.params.id;
//       console.log('Fetching exam history for user ID:', userId);
  
//       // Validate if userId is in correct format
//       if (!mongoose.Types.ObjectId.isValid(userId)) {
//         console.log('Invalid user ID format');
//         return res.status(400).json({ message: 'Invalid user ID format' });
//       }
  
//       const testResults = await TestResult.find({ user: userId })
//         .populate('test', 'title')
//         .sort('-completedAt');
  
//       console.log('Found test results:', testResults);
  
//       const examHistory = testResults.map(result => ({
//         id: result._id,
//         testTitle: result.test?.title || 'Untitled Test',
//         score: result.score,
//         totalQuestions: result.totalQuestions,
//         date: result.completedAt
//       }));
  
//       res.json(examHistory);
//     } catch (err) {
//       console.error('Error in exam-history route:', err);
//       res.status(500).json({ message: 'Server error' });
//     }
//   });
  
//   app.get('/api/users/:id/performance', async (req, res) => {
//     try {
//       const userId = req.params.id;
//       console.log('Fetching performance for user ID:', userId);
  
//       if (!mongoose.Types.ObjectId.isValid(userId)) {
//         console.log('Invalid user ID format');
//         return res.status(400).json({ message: 'Invalid user ID format' });
//       }
  
//       const testResults = await TestResult.find({ user: userId })
//         .populate('test', 'title')
//         .sort('completedAt');
  
//       console.log('Found performance data:', testResults);
  
//       const performanceData = testResults.map(result => ({
//         testTitle: result.test?.title || 'Untitled Test',
//         score: result.score,
//         date: result.completedAt
//       }));
  
//       res.json(performanceData);
//     } catch (err) {
//       console.error('Error in performance route:', err);
//       res.status(500).json({ message: 'Server error' });
//     }
//   });
   
//   app.get('/api/tests/:testId/questions', async (req, res) => {
//     try {
//       const test = await Test.findById(req.params.testId).populate('questions');
//       if (!test) {
//         return res.status(404).json({ message: 'Test not found' });
//       }
//       res.json(test.questions);
//     } catch (err) {
//       console.error('Error fetching questions:', err);
//       res.status(500).json({ error: err.message });
//     }
//   });
  
//   // Add a new question to a test
//   app.post('/api/tests/:testId/questions', async (req, res) => {
//     try {
//       const { text, options, correctAnswer, type } = req.body;
//       const question = new Question({
//         text,
//         options,
//         correctAnswer,
//         type: type || 'mcq'
//       });
//       await question.save();
  
//       const test = await Test.findById(req.params.testId);
//       if (!test) {
//         return res.status(404).json({ message: 'Test not found' });
//       }
  
//       test.questions.push(question._id);
//       await test.save();
  
//       res.status(201).json(question);
//     } catch (err) {
//       console.error('Error creating question:', err);
//       res.status(500).json({ error: err.message });
//     }
//   });
  
//   // Update a question
//   app.put('/api/tests/:testId/questions/:questionId', async (req, res) => {
//     try {
//       const { text, options, correctAnswer, type } = req.body;
//       const question = await Question.findByIdAndUpdate(
//         req.params.questionId,
//         { text, options, correctAnswer, type },
//         { new: true }
//       );
//       res.json(question);
//     } catch (err) {
//       console.error('Error updating question:', err);
//       res.status(500).json({ error: err.message });
//     }
//   });
  
//   // Delete a question
//   app.delete('/api/tests/:testId/questions/:questionId', async (req, res) => {
//     try {
//       await Question.findByIdAndDelete(req.params.questionId);
//       const test = await Test.findById(req.params.testId);
//       test.questions = test.questions.filter(q => q.toString() !== req.params.questionId);
//       await test.save();
//       res.sendStatus(204);
//     } catch (err) {
//       console.error('Error deleting question:', err);
//       res.status(500).json({ error: err.message });
//     }
//   });
//   app.get('/api/tests/:id', async (req, res) => {
//     try {
//       const test = await Test.findById(req.params.id)
//         .populate('questions', 'text options correctAnswer'); // Add this populate call
  
//       if (!test) {
//         return res.status(404).json({ message: 'Test not found' });
//       }
  
//       res.json(test);
//     } catch (err) {
//       console.error('Error fetching test:', err);
//       res.status(500).json({ message: 'Server error' });
//     }
//   });

// app.get('/api/tests/stats', async (req, res) => {
//   try {
//     // First check if there are any results
//     const hasResults = await TestResult.exists();
//     if (!hasResults) {
//       return res.json({}); // Return empty object if no results exist
//     }

//     const stats = await TestResult.aggregate([
//       {
//         $group: {
//           _id: '$test',
//           attempts: { $sum: 1 },
//           avgScore: { $avg: { $multiply: ['$score', 100] } } // Convert to percentage
//         }
//       }
//     ]);

//     const statsMap = {};
//     stats.forEach(stat => {
//       if (stat._id) {
//         statsMap[stat._id.toString()] = {
//           attempts: stat.attempts,
//           avgScore: Math.round(stat.avgScore || 0)
//         };
//       }
//     });

//     console.log('Sending stats:', statsMap); // Debug log
//     res.json(statsMap);
//   } catch (error) {
//     console.error('Error in /api/tests/stats:', error);
//     res.status(500).json({ 
//       message: 'Error fetching test statistics',
//       error: error.message 
//     });
//   }
// });

// app.get('/api/users/:userId/test-attempts', async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     // Validate userId
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ message: 'Invalid user ID' });
//     }

//     // Check if user exists
//     const hasAttempts = await TestResult.exists({ user: userId });
//     if (!hasAttempts) {
//       return res.json([]); // Return empty array if no attempts exist
//     }

//     const attempts = await TestResult.find({ user: userId })
//       .distinct('test');

//     console.log('Found attempts for user:', attempts); // Debug log
//     res.json(attempts);
//   } catch (error) {
//     console.error('Error in /api/users/:userId/test-attempts:', error);
//     res.status(500).json({ 
//       message: 'Error fetching user attempts',
//       error: error.message 
//     });
//   }
// });


//   // WebSocket
//   io.on('connection', (socket) => {
//     socket.on('updateTime', ({ testId, timeLeft }) => {
//       socket.broadcast.emit('timeUpdate', { testId, timeLeft });
//     });
//   });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));




const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const http = require("http")
const socketIo = require("socket.io")
const config = require("./config")
const routes = require("./routes")
const socketHandler = require("./socketHandler")

const app = express()
const server = http.createServer(app)
const io = socketIo(server, config.socketOptions)

// Middleware
app.use(cors(config.corsOptions))
app.use(express.json())

// MongoDB connection
mongoose
  .connect(config.mongoURI, config.mongoOptions)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err))

// Routes
app.use("/api", routes)

// WebSocket
io.on("connection", socketHandler)

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

