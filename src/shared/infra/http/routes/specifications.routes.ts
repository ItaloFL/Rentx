import {  Router } from 'express'
import { ensureaAutenticadeted } from '../middlewares/ensureAutenticated';
import { CreateSpecificationController } from '@modules/cars/UseCases/CreateSpecification/CreateSpecificationController';
import { ensureAdmin } from '../middlewares/ensureAdmin';


const createSpecificationController = new CreateSpecificationController();

const specificationsRoutes = Router()

specificationsRoutes.post("/",ensureaAutenticadeted, ensureAdmin, createSpecificationController.handle) 




export { specificationsRoutes }