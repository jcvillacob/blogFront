export interface User {
    _id?: string;
    name: string;
    email: string;
    password?: string;
    role: UserRole;
    createdAt?: Date;
    __v?: number;
}

export enum UserRole {
    Author = 'author',
    Commenter = 'commenter',
    Admin = 'Admin',
}
