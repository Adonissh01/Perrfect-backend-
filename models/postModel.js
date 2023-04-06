const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        fullName: {
            type: String,
            required: true,
        },
        picturePath: {
            String,
        },
        petAge: {
            type: String,
            required: true,
            maxlength: 2,
        },
        petBreed: {
            type: String,
            required: true,
            minlength: 3,

        },
        petGender: {
            type: String,
            required: true,
            minlength: 4,
            maxlength: 6,
        },
        petName: {
            type: String,
            required: true,

        },
        reason: {
            type: String,
            required: true,
            maxlength: 200,
            trim: true,
        }

    },

    { timestamps: true }
);
module.exports = mongoose.model("Post",postSchema);