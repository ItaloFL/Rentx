import { Router } from 'express'
import { autenticateRoutes } from './autenticate.routes'
import  categorieRoutes  from './categories.routes'
import { specificationsRoutes } from './specifications.routes'
import { usersRoutes } from './users.routes'
import { carsRouter } from './cars.routes'
import { rentalsRoutes } from './rental.routes'
import { passwordRoutes } from './password.routes'


const routes = Router()

routes.use("/categories",categorieRoutes)
routes.use("/specifications",specificationsRoutes)
routes.use("/users", usersRoutes)
routes.use("/cars", carsRouter)
routes.use("/rental", rentalsRoutes)
routes.use("/password", passwordRoutes)
routes.use(autenticateRoutes)

export { routes }