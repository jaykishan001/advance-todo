import mongoose, { Schema } from "mongoose"
import { ProjectSchema } from "./project.model";
import { User } from "./user.model";

const notesSchema = new mongoose.Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project"
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})


export const NotesSchema = mongoose.model('NotesSchema', notesSchema);