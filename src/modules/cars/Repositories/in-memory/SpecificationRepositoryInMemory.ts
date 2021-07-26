import { ISpecificationDTO } from "@modules/cars/dtos/ISpecificationDTO";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationRepository } from "../ISpecificationsRepository";



class SpecificationRepositoryInMemory implements ISpecificationRepository{
  
  specification: Specification[] = []

  async create({ name, description }: ISpecificationDTO): Promise<Specification> {
    
    const specification = new Specification

    Object.assign(specification,{
      name,
      description
    })

    this.specification.push(specification)

    return specification;
  }
  async findByName(name: string): Promise<Specification> {
    return this.specification.find(specification => specification.name === name)
  }
  
  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specification.filter(specification => ids.includes(specification.id))

    return allSpecifications
  }


}


export { SpecificationRepositoryInMemory }