import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true
    },
    focusArea: { type: String, required: true },
    durationMinutes: { type: Number, required: true, min: 5 },
    equipmentNeeded: [{ type: String }],
    recommendedForGoals: [{ type: String }]
  },
  { timestamps: true }
);

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;

export const WorkoutModel = mongoose.model('Workout', workoutSchema);
