import { container } from "tsyringe"
import { CreateUserUseCase } from "./CreateUserUseCase"
import { Request, Response } from 'express'



class CreateUserController {


    async handle(request: Request, response:Response) :Promise<Response>{

        const { 
        name,
        email,
        password,
        driver_liscense
        } = request.body

        const createUserUseCase = container.resolve(CreateUserUseCase)

        await createUserUseCase.execute({
            name,
            email, 
            password, 
            driver_liscense 
        })



        return response.status(201).json({
            message: "Usuario Criado com sucesso"
        })


    }


}


export { CreateUserController }