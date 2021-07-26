import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUserRepository } from "@modules/accounts/Repositories/IUsersRepository";

import "reflect-metadata";


import { hash } from 'bcryptjs'
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase{

    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ){}

    async execute( { name, password, driver_liscense, email } : ICreateUserDTO) : Promise<void>{

        const userAlreadyExists = await this.userRepository.findByEmail(email)

        if(userAlreadyExists){
            throw new AppError("User Already Exist")
        }

        const passwordHash = await hash(password, 8)
    

        await this.userRepository.create({
            name,
            password : passwordHash,
            driver_liscense,
            email
        })


    }


}


export { CreateUserUseCase }