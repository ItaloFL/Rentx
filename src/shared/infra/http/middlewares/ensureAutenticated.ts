import { AppError } from "@shared/errors/AppError";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { Request, Response , NextFunction } from "express";

import { verify } from 'jsonwebtoken'
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import auth from "@config/auth";





interface IpayLoad{
    sub: string
}


export async function ensureaAutenticadeted(request: Request, response: Response, next: NextFunction) {


    const authHeader = request.headers.authorization

    if(!authHeader){
        throw new AppError("Token não valido ou faltando.", 401)
    }

    const [, token] = authHeader.split(" ")

    try {
        const { sub: user_id } = verify(
            token,
            auth.secret_token
        ) as IpayLoad

        request.user = {
            id: user_id,
        }

        next()
    } catch {
        throw new AppError("Token invalido", 401)
    }
}