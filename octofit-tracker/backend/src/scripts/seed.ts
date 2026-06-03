import mongoose from 'mongoose';
import { ActivityModel } from '../models/Activity';
import { LeaderboardModel } from '../models/Leaderboard';
import { TeamModel } from '../models/Team';
import { UserModel } from '../models/User';
import { WorkoutModel } from '../models/Workout';

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

const seed = async () => {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(mongoUri, { dbName: 'octofit_db' });

  await Promise.all([
    ActivityModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
    TeamModel.deleteMany({}),
    UserModel.deleteMany({}),
    WorkoutModel.deleteMany({})
  ]);

  const users = await UserModel.insertMany([
    {
      name: 'Maya Chen',
      email: 'maya.chen@octofit.dev',
      age: 29,
      fitnessLevel: 'advanced',
      goals: ['build endurance', '10k prep']
    },
    {
      name: 'Noah Garcia',
      email: 'noah.garcia@octofit.dev',
      age: 34,
      fitnessLevel: 'intermediate',
      goals: ['fat loss', 'weekly consistency']
    },
    {
      name: 'Aisha Patel',
      email: 'aisha.patel@octofit.dev',
      age: 26,
      fitnessLevel: 'beginner',
      goals: ['mobility', 'core strength']
    },
    {
      name: 'Liam Johnson',
      email: 'liam.johnson@octofit.dev',
      age: 31,
      fitnessLevel: 'intermediate',
      goals: ['muscle gain', 'better posture']
    }
  ]);

  const teams = await TeamModel.insertMany([
    {
      name: 'Trail Blazers',
      description: 'Outdoor cardio team pushing weekly distance goals',
      members: [users[0]._id, users[1]._id],
      totalPoints: 1820
    },
    {
      name: 'Core Crushers',
      description: 'Strength and mobility focused training squad',
      members: [users[2]._id, users[3]._id],
      totalPoints: 1575
    }
  ]);

  await UserModel.updateMany(
    { _id: { $in: [users[0]._id, users[1]._id] } },
    { teamName: 'Trail Blazers' }
  );
  await UserModel.updateMany(
    { _id: { $in: [users[2]._id, users[3]._id] } },
    { teamName: 'Core Crushers' }
  );

  await ActivityModel.insertMany([
    {
      userId: users[0]._id,
      type: 'run',
      durationMinutes: 52,
      caloriesBurned: 540,
      completedAt: new Date('2026-06-01T06:45:00Z')
    },
    {
      userId: users[1]._id,
      type: 'cycle',
      durationMinutes: 38,
      caloriesBurned: 460,
      completedAt: new Date('2026-06-01T18:30:00Z')
    },
    {
      userId: users[2]._id,
      type: 'yoga',
      durationMinutes: 40,
      caloriesBurned: 210,
      completedAt: new Date('2026-06-02T07:10:00Z')
    },
    {
      userId: users[3]._id,
      type: 'strength',
      durationMinutes: 47,
      caloriesBurned: 390,
      completedAt: new Date('2026-06-02T19:05:00Z')
    },
    {
      userId: users[0]._id,
      type: 'walk',
      durationMinutes: 30,
      caloriesBurned: 150,
      completedAt: new Date('2026-06-03T12:15:00Z')
    }
  ]);

  await LeaderboardModel.insertMany([
    {
      userId: users[0]._id,
      teamId: teams[0]._id,
      points: 975,
      rank: 1,
      weekLabel: '2026-W23'
    },
    {
      userId: users[1]._id,
      teamId: teams[0]._id,
      points: 845,
      rank: 2,
      weekLabel: '2026-W23'
    },
    {
      userId: users[3]._id,
      teamId: teams[1]._id,
      points: 800,
      rank: 3,
      weekLabel: '2026-W23'
    },
    {
      userId: users[2]._id,
      teamId: teams[1]._id,
      points: 775,
      rank: 4,
      weekLabel: '2026-W23'
    }
  ]);

  await WorkoutModel.insertMany([
    {
      title: 'Tempo Run Builder',
      difficulty: 'advanced',
      focusArea: 'Cardio endurance',
      durationMinutes: 55,
      equipmentNeeded: ['running shoes', 'gps watch'],
      recommendedForGoals: ['build endurance', '10k prep']
    },
    {
      title: 'Home HIIT Burn',
      difficulty: 'intermediate',
      focusArea: 'Fat loss',
      durationMinutes: 28,
      equipmentNeeded: ['mat', 'dumbbells'],
      recommendedForGoals: ['fat loss', 'weekly consistency']
    },
    {
      title: 'Mobility Flow Reset',
      difficulty: 'beginner',
      focusArea: 'Mobility',
      durationMinutes: 24,
      equipmentNeeded: ['yoga mat'],
      recommendedForGoals: ['mobility', 'core strength']
    },
    {
      title: 'Upper Body Strength Block',
      difficulty: 'intermediate',
      focusArea: 'Strength',
      durationMinutes: 42,
      equipmentNeeded: ['bench', 'barbell'],
      recommendedForGoals: ['muscle gain', 'better posture']
    }
  ]);

  console.log('Seed complete: users, teams, activities, leaderboard, workouts inserted.');
};

seed()
  .then(async () => {
    await mongoose.disconnect();
    process.exit(0);
  })
  .catch(async (error) => {
    console.error('Seed failed', error);
    await mongoose.disconnect();
    process.exit(1);
  });
