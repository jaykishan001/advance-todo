import mongoose, { Schema } from "mongoose"
import { ProjectSchema } from "./project.model";
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants";
const projectmemberSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    role: {
        type: String,
        enum: AvailableUserRoles,
        default: UserRolesEnum.MEMBER
    }
})


export const Projectmember = mongoose.model('Projectmember', projectmemberSchema);