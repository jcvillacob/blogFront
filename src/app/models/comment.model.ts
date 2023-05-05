import { User } from "./user.model";

export interface Comment {
    _id?: string;
    content: string;
    author?: User;
    post?: string;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
    editing?: boolean;
}
