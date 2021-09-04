import { Category } from "./category";

export interface Classifier{
    entityType: String,
    name: String,
    categories: Category[],
}