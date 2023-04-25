export interface Post {
    _id?: string;
    title: string;
    content: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
    category: string;
    tags: string[];
    __v?: number;
}
