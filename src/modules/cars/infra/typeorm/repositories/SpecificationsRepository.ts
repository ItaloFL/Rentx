import { getRepository, Repository } from "typeorm";


import { ISpecificationDTO } from "@modules/cars/dtos/ISpecificationDTO";
import { ISpecificationRepository } from "@modules/cars/Repositories/ISpecificationsRepository";
import { Specification } from "../entities/Specification";



class SpecificationRepository implements ISpecificationRepository{
    private repository: Repository<Specification>

    

    constructor(){
        this.repository = getRepository(Specification)
    }
    
    async create({ name, description }: ISpecificationDTO): Promise<Specification> {
        
        const specification = this.repository.create({
            name,
            description,
        })

        await this.repository.save(specification)

        return specification
    }


     async list(): Promise<Specification[]> {
        const listall = await this.repository.find()

        return listall
    }

    async findByName(name: string) : Promise<Specification> {
        const findNames = await this.repository.findOne({ name })

        return findNames
    }


    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await this.repository.findByIds(ids)

        return specifications
    }

}



export { SpecificationRepository }