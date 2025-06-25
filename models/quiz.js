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
    questions: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            questionText: {
                type: String,
                required: true,
            },
            options: [
                {
                    _id: mongoose.Schema.Types.ObjectId,
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
        ref: "user",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const quizes = mongoose.models.quizes || mongoose.model("quizes", quizesSchema);

module.exports = quizes;