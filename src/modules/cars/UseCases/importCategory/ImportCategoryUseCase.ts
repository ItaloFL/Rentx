import fs from 'fs'
import csvParse from 'csv-parse'
import { CategorieRepository } from '@modules/cars/infra/typeorm/repositories/CategoryRepository'
import { inject, injectable } from 'tsyringe'

interface IImportCategory{
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase{
    constructor(
    @inject("CategorieRepository")
    private categoryRepository: CategorieRepository
    ){}

    async loadCategories(file : Express.Multer.File) :Promise<IImportCategory[]> {

        return new Promise((resolve, reject) =>{
            const stream = fs.createReadStream(file.path)

            const categories: IImportCategory[] = []

            const parseFile = csvParse()
        
            stream.pipe(parseFile)

            parseFile.on("data", async (line) =>{
            
            const [name, description] = line;
            categories.push({
                name,
                description
            });
        })
        .on("end", () =>{
            fs.promises.unlink(file.path)
            resolve(categories)
        })
        .on("error", (err) =>{
            reject(err);
        });
        })
    }

    async execute(file: Express.Multer.File) :Promise<void> {

        const categories = await this.loadCategories(file)
        
        categories.map(async(category) =>{
            const { name, description } = category

            const categoryExist = await this.categoryRepository.findbyName(name);


            if(!categoryExist){
                await this.categoryRepository.create({
                    name, 
                    description,
                });
            }
        })
        
    }
}


export { ImportCategoryUseCase }