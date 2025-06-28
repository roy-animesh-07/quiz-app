const mongoose = require("mongoose");

const quizesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    questions: [
        {
            questionText: {
                type: String,
                required: true,
            },
            options: [
                {
                    optionText: {
                        type: String,
                        required: true,
                    },
                    isCorrect: {
                        type: Boolean,
                        default: false,
                    },
                },
            ],
        },
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    resultOut: {
        type : Boolean,
        default :false,
    },
    upvote: {
        type : Number,
        default:0,
    },
    downvote: {
        type:Number,
        default:0,
    },
    upvotedBy :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    forall :{
        type: Boolean,
        default: false,
    },
    downvotedBy :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", quizesSchema);

module.exports = Quiz;