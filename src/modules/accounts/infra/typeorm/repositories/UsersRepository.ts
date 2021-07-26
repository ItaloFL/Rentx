

import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { IUserRepository } from '@modules/accounts/Repositories/IUsersRepository';
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";


class UserRepository implements IUserRepository{

    private repository: Repository<User>

    constructor(){
        this.repository = getRepository(User)
    }
   


    async create( {name,  email, password, driver_liscense, id, avatar}: ICreateUserDTO): Promise<void> {
        
        const user = this.repository.create({
            name,
            email,
            password,
            driver_liscense,
            id,
            avatar,
        })

        await this.repository.save(user)
    }


    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email })

        return user
    }

    async findById(id: string): Promise<User>{

        const user = await this.repository.findOne(id)

        return user;
    } 


}


export { UserRepository }