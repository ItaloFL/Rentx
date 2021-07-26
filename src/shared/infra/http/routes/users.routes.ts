import { Router } from 'express'

import multer from 'multer'

import uploadConfig from '@config/upload'

import { CreateUserController  } from '@modules/accounts/UseCases/CreateUser/CreateUserController'
import { UpdateUserAvatarController } from '@modules/accounts/UseCases/UpdateUserAvatar/UpdateUserAvatarController'
import { ensureaAutenticadeted } from '../middlewares/ensureAutenticated' 
import { ProfileUserController } from '@modules/accounts/UseCases/profileUser/ProfileUserController'




const usersRoutes = Router()

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController()
const updateUserController = new UpdateUserAvatarController()
const profileUserController = new ProfileUserController()
 
usersRoutes.post("/", createUserController.handle)

usersRoutes.patch("/avatar", ensureaAutenticadeted ,uploadAvatar.single("avatar") ,updateUserController.handle)

usersRoutes.get("/profile", ensureaAutenticadeted, profileUserController.handle)

export { usersRoutes }