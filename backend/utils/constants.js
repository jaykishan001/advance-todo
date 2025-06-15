export const UserRolesEnum = {
    ADMIN: "admin",
    PROJECT_ADMIN: "project_admin",
    MEMBER: "member"
}

export const AvailableUserRoles = Object.values(UserRolesEnum);


export const TaskStatusEnum = {
    TODO: "todo",
    IN_PROGRESS: "in_progress",
    COMPLETED: "Completed",
}

export const AvailableTaskStatus = Object.values(TaskStatusEnum);