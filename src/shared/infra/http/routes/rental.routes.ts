import { CreateRentalController } from '@modules/rentals/UseCases/CreateRental/CreateRentalController'
import { DevolutionRentalController } from '@modules/rentals/UseCases/DevolutionRental/DevolutionRentalController'
import { ListRentalsByUserController } from '@modules/rentals/UseCases/ListRentalsByUser/ListRentalsByUserController'
import Router from 'express'
import { ensureaAutenticadeted } from '../middlewares/ensureAutenticated'

const rentalsRoutes = Router()

const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()
const listRentalsByUserController = new ListRentalsByUserController()


rentalsRoutes.post("/", ensureaAutenticadeted ,createRentalController.handle)
rentalsRoutes.post("/devolution/:id", ensureaAutenticadeted ,devolutionRentalController.handle)
rentalsRoutes.get("/user",ensureaAutenticadeted, listRentalsByUserController.handle)

export { rentalsRoutes }