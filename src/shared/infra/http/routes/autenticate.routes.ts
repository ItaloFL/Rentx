import { Router } from 'express'
import { AutenticateUserController } from '@modules/accounts/UseCases/autenticateUser/autenticateUserController'
import { RefreshTokenController } from '@modules/accounts/UseCases/RefreshToken/RefreshTokenController'


const autenticateRoutes = Router()

const autenticateUserController = new AutenticateUserController()
const refreshTokenController  = new RefreshTokenController()

autenticateRoutes.post("/sesions", autenticateUserController.handle)
autenticateRoutes.post("/refresh-token", refreshTokenController.handle)



export { autenticateRoutes }