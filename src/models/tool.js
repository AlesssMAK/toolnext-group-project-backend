import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const toolSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    pricePerDay: {
      type: Number,
      required: true,
      min: 0,
    },

    images: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
    },

    specifications: {
      type: Map,
      of: String,
      default: {},
    },

    rentalTerms: {
      type: String,
      required: false,
    },

    bookedDates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
      },
    ],

    feedbacks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feedback',
      },
    ],
  },

  { timestamps: true },
);

export const Tool = model('Tool', toolSchema);
