import { Router } from 'express';

import "reflect-metadata";


import multer from 'multer'

import { ImportCategoryController, } from '@modules/cars/UseCases/importCategory/ImportCategoryController';
import  { CreateCategoryController } from '@modules/cars/UseCases/CreateCategory/CreateCategoryController'
import { ListCategoryController } from '@modules/cars/UseCases/ListCategory/ListCategoryController'
import { ensureaAutenticadeted } from '../middlewares/ensureAutenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';



const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoryController();
const importCategoryController = new ImportCategoryController();


const categorieRoutes = Router();

const upload = multer({
   dest: './tmp' 
})

categorieRoutes.post("/" ,ensureaAutenticadeted, ensureAdmin, createCategoryController.handle)

categorieRoutes.get("/",ensureaAutenticadeted, listCategoriesController.handle)

categorieRoutes.post('/import',ensureaAutenticadeted,ensureAdmin, upload.single("file"), importCategoryController.handle)






export default categorieRoutes 