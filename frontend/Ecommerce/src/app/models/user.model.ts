import { UserRole } from "../core/auth/models/token.model";

export interface User {
    id:        string,
    userName:  string,
    firstName: string,
    lastName:  string,
    email:     string,
    role:      UserRole,
    createdOn: Date,
    updatedOn: Date
}