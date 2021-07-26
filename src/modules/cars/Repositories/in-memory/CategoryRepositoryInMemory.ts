import { ICreateCategoryDTO } from "../../dtos/ICreateCategoryDTO";
import { Category } from "../../infra/typeorm/entities/Category";
import { ICategoryRepository } from "../ICategoryRepository";




class CategoryRepositoryInMemory implements ICategoryRepository{
    
    categories: Category[] = []

    
    async findbyName(name: string): Promise<Category> {
        const category = this.categories.find((category) => category.name === name)

        return category
    }
    async list(): Promise<Category[]> {
        const listCategory = this.categories;

        return listCategory
    }
    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = new Category()

        Object.assign(category, {
            name,
            description
        })

        this.categories.push(category)
    }



}


export { CategoryRepositoryInMemory }