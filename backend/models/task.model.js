import mongoose, { Schema } from "mongoose"
import { AvailableTaskStatus, TaskStatusEnum } from "../utils/constants";
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true, 
        trim: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    assignedToBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: AvailableTaskStatus,
        default: TaskStatusEnum.TODO
    },
    attachments: {
        type: [
            {
                url: String,
                mimetype: String, //jpg, jeeg etc
                size: Number,
            }
        ],
        default: []
    }
},{timestamps: true})


export const Task = mongoose.model('Task', taskSchema);