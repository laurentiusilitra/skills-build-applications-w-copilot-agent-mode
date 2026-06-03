import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['run', 'cycle', 'swim', 'yoga', 'strength', 'walk'],
      required: true
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    completedAt: { type: Date, required: true }
  },
  { timestamps: true }
);

export type ActivityDocument = InferSchemaType<typeof activitySchema>;

export const ActivityModel = mongoose.model('Activity', activitySchema);
