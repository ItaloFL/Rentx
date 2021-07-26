import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { ISpecificationRepository } from "@modules/cars/Repositories/ISpecificationsRepository";

interface IRequest{
    name: string,
    description: string,
}

@injectable()
class CreateSpecificationUseCase{
    constructor(
    @inject("SpecificationRepository")
    private specificationRepository : ISpecificationRepository
    ){}

     async execute( {name, description}: IRequest ) : Promise<void>{
        const SpecificationsExist = await this.specificationRepository.findByName(name)
        
        if(SpecificationsExist){
            throw new AppError("Specificação ja existente!")
        }

        await this.specificationRepository.create({ name, description })   
    }

}


export { CreateSpecificationUseCase }