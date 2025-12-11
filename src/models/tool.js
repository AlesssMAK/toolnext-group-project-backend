import { Schema } from 'mongoose';
import { model } from 'mongoose';

const toolSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        pricePerDay: {
            type: Number,
            required: true,
        },
        categoryId: {
            
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        terms: {
            type: String,
            required: true,
        },
        specifications: {
            type: String,
        },
        images: {
            type: String,
            required: true,
        },
    },

    {
    timestamps: true,
    versionKey: false,
    },
);
toolSchema.index({ name: "text" });

export const Tool = model('Tool', toolSchema);

