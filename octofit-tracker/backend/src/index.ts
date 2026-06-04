import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { ActivityModel } from './models/Activity';
import { LeaderboardModel } from './models/Leaderboard';
import { TeamModel } from './models/Team';
import { UserModel } from './models/User';
import { WorkoutModel } from './models/Workout';

const app = express();
const port = 8000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
const frontendOrigin = codespaceName
  ? `https://${codespaceName}-5173.app.github.dev`
  : 'http://localhost:5173';
const allowedOrigins = ['http://localhost:5173', frontendOrigin];

app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  })
);

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-backend',
    apiBaseUrl,
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.get('/api/users/', async (_req, res) => {
  const users = await UserModel.find().sort({ createdAt: -1 }).lean();
  res.json({ count: users.length, apiBaseUrl, users });
});

app.get('/api/teams/', async (_req, res) => {
  const teams = await TeamModel.find().populate('members', 'name email').lean();
  res.json({ count: teams.length, apiBaseUrl, teams });
});

app.get('/api/activities/', async (_req, res) => {
  const activities = await ActivityModel.find()
    .sort({ completedAt: -1 })
    .populate('userId', 'name email')
    .lean();
  res.json({ count: activities.length, apiBaseUrl, activities });
});

app.get('/api/leaderboard/', async (_req, res) => {
  const leaderboard = await LeaderboardModel.find()
    .sort({ rank: 1 })
    .populate('userId', 'name')
    .populate('teamId', 'name')
    .lean();
  res.json({ count: leaderboard.length, apiBaseUrl, leaderboard });
});

app.get('/api/workouts/', async (_req, res) => {
  const workouts = await WorkoutModel.find().sort({ difficulty: 1, durationMinutes: 1 }).lean();
  res.json({ count: workouts.length, apiBaseUrl, workouts });
});

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error', err);
  res.status(500).json({ error: 'Internal server error' });
});

const startServer = async () => {
  try {
    await mongoose.connect(mongoUri, { dbName: 'octofit_db' });
    app.listen(port, () => {
      console.log(`OctoFit backend listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start backend service', error);
    process.exit(1);
  }
};

void startServer();
