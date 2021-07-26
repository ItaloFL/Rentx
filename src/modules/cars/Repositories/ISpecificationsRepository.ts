import { Specification } from "../infra/typeorm/entities/Specification";

import { ISpecificationDTO } from '../dtos/ISpecificationDTO'




interface ISpecificationRepository{
    create( { name, description }: ISpecificationDTO) : Promise<Specification>;
    findByName(name: string): Promise<Specification>;
    findByIds(ids: string[]): Promise<Specification[]>
}


export { ISpecificationRepository }