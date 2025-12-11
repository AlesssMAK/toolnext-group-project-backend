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

// const toolSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         minlength: 3,
//         maxlength: 96
//     },
//     pricePerDay: {
//         type: Number,
//         required: true,
//         min: 0
//     },
//     categoryId: {
//         type: mongoose.Schema.Types.Mixed,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true,
//         minlength: 20,
//         maxlength: 2000
//     },
//     terms: {
//         type: String,
//         required: true,
//         minlength: 20,
//         maxlength: 1000
//     },
//     specifications: {
//         type: String,
//         maxlength: 1000
//     },
//     images: {
//         type: 'file',
//         validate: {
//             validator: function(v) {
//                 return v.mimetype === 'image/jpeg' || v.mimetype === 'image/png';
//             },
//             message: 'File type must be jpg or png'
//         },
//         required: true,
//         maxSize: 1024 // 1MB in kilobytes
//     }
// });