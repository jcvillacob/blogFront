import { Category } from "./category.model";
import { User } from "./user.model";


export interface Post {
    _id?: string;
    title: string;
    image?: string;
    content: string;
    author: User;
    createdAt: Date;
    updatedAt: Date;
    category: Category;
    tags: string[];
    __v?: number;
}
