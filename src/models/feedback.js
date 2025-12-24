import { Schema, model } from 'mongoose';

const feedbackSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    toolId: {
      type: Schema.Types.ObjectId,
      ref: 'Tool',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Feedback = model('Feedback', feedbackSchema);
