import { inject, injectable } from "tsyringe";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { CategorieRepository } from "@modules/cars/infra/typeorm/repositories/CategoryRepository";



@injectable()
class ListCategoryUseCase{

    constructor(
        @inject("CategorieRepository")
        private categoryRepository: CategorieRepository
    ){}

    async execute(): Promise<Category[]>{

        const all = await this.categoryRepository.list()


        return all
        
    }

}



export { ListCategoryUseCase }