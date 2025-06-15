import mongoose, { Schema } from "mongoose"
const sabtaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: "Task",
        required: true,
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project"
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})


export const SubTask = mongoose.model('SubTask', sabtaskSchema);