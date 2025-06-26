const { response } = require("express");
const mongoose = require("mongoose");

const quizResponseSchema = new mongoose.Schema(
    {
        quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
        required: true,
        },
        user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        },
        response: [
        {   
            question: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "quizes.questions",
                required: true,
            },
            selectedOptions: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "quizes.questions.options",
                },
            ],
        },
        ],
        score: {
        type: Number,
        default: 0,
        },
        submittedAt: {
        type: Date,
        default: Date.now,
        },
   });

const quizResponse = mongoose.models.quizResponse || mongoose.model("quizResponse", quizResponseSchema);

module.exports = quizResponse;