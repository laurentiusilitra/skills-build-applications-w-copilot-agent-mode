import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    weekLabel: { type: String, required: true }
  },
  { timestamps: true }
);

leaderboardSchema.index({ weekLabel: 1, rank: 1 }, { unique: true });

export type LeaderboardDocument = InferSchemaType<typeof leaderboardSchema>;

export const LeaderboardModel = mongoose.model('Leaderboard', leaderboardSchema);
