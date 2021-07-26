import { CreateCarController } from '@modules/cars/UseCases/CreateCar/CreateCarController'
import { CreateCarsSpecificationController } from '@modules/cars/UseCases/CreateCarSpecification/CreateCarsSpecificationController'
import { ListAvailableCarsController } from '@modules/cars/UseCases/ListAvailableCars/ListAvailableCarsController'
import { UploadCarImagesController } from '@modules/cars/UseCases/UploadImages/UploadCarImagesController'
import { Router } from 'express'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureaAutenticadeted } from '../middlewares/ensureAutenticated'

import multer from 'multer'

import uploadConfig from '@config/upload'

const carsRouter = Router()

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarsSpecificationController = new CreateCarsSpecificationController()
const uploadCarImagesController = new UploadCarImagesController()

const upload = multer(uploadConfig);


carsRouter.post("/",ensureaAutenticadeted, ensureAdmin,  createCarController.handle)
carsRouter.get("/available", listAvailableCarsController.handle)
carsRouter.post("/specifications/:id",ensureaAutenticadeted, ensureAdmin, createCarsSpecificationController.handle)
carsRouter.post("/images/:id", ensureaAutenticadeted,ensureAdmin, upload.array("images"),uploadCarImagesController.handle)


export { carsRouter }