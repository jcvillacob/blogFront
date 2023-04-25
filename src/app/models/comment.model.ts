export interface Comment {
    _id?: string;
    content: string;
    author: string;
    post: string;
    createdAt: Date;
    updatedAt: Date;
    __v?: number;
}
