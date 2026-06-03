import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    age: { type: Number, min: 13, max: 100 },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },
    goals: [{ type: String }],
    teamName: { type: String, default: null }
  },
  { timestamps: true }
);

export type UserDocument = InferSchemaType<typeof userSchema>;

export const UserModel = mongoose.model('User', userSchema);
