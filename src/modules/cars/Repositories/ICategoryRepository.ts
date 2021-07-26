import { Category } from '../infra/typeorm/entities/Category'
import { ICreateCategoryDTO} from '../dtos/ICreateCategoryDTO'




interface ICategoryRepository{
    findbyName(name: string) : Promise<Category>;
    list(): Promise<Category[]>;
    create({ name, description}:ICreateCategoryDTO) : Promise<void>;

}


export { ICategoryRepository }