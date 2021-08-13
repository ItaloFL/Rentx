import { inject, injectable } from "tsyringe";
import "reflect-metadata";
import { IUserRepository } from "@modules/accounts/Repositories/IUsersRepository";

import { sign } from 'jsonwebtoken'
 


import { AppError } from '@shared/errors/AppError'
import { IUsersTokensRepository } from "@modules/accounts/Repositories/IUsersTokensRepository";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DayProvider/IDateProvider";
import { compare } from "bcryptjs";

interface IRequest{ 
    email: string;
    password: string;
}

interface IResponse{
    user:{
        name: string;
        email: string;
    };
    token: string
    refresh_token: string
}




@injectable()
class AutenticateUserUseCase {

    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private DateProvider: IDateProvider
    ){}

    async execute({email, password} : IRequest) :Promise<IResponse>{

        const user = await this.userRepository.findByEmail(email)
        const { expires_in_refresh_token, expires_in_token, secret_refresh_token, secret_token, expires_refresh_token_days } = auth


        if(!user){
            throw new AppError("Usuario ou senha incorretos")
        }

        const passwordMatch = await compare(password, user.password)


        if(!passwordMatch){
            throw new AppError("Usuario ou senha incorretos")
        }

        const token = sign({}, secret_token ,{
            subject: user.id,
            expiresIn: expires_in_token
            
        })

        const refresh_token = sign({ email }, secret_refresh_token, {
            subject: user.id,
            expiresIn: expires_in_refresh_token
        })

        const refresh_token_expires_date = this.DateProvider.addDays(expires_refresh_token_days)

        await this.usersTokensRepository.create({
            user_id: user.id,
            expires_date: refresh_token_expires_date,
            refresh_token 
        })

        const tokenReturn: IResponse ={
            token,
            user:{
                name: user.name,
                email: user.email
            },
            refresh_token
        }

        return tokenReturn
    }


}


export { AutenticateUserUseCase }