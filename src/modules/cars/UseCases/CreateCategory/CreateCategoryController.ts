import { Request, Response } from 'express'
import CategoryServiceUseCase from './CategoryServiceUseCase';

import { container } from 'tsyringe'

import "reflect-metadata";



class CreateCategoryController{
    

    async handle(request:Request, response:Response) :Promise<Response> {
        const { name, description } = request.body

        const categoryServiceUseCase = container.resolve(CategoryServiceUseCase)
        
        await categoryServiceUseCase.execute({name, description})

        return response.status(201).json({message: "Categoria criada com sucesso!"})
    }


}

export { CreateCategoryController }