import { container } from 'tsyringe'

import'@shared/container/providers'

import { ICategoryRepository } from '@modules/cars/Repositories/ICategoryRepository'
import { CategorieRepository } from '@modules/cars/infra/typeorm/repositories/CategoryRepository'
import { ISpecificationRepository } from '@modules/cars/Repositories/ISpecificationsRepository'

import { IUserRepository } from '@modules/accounts/Repositories/IUsersRepository'
import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { SpecificationRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository'
import { ICarsRepository } from '@modules/cars/Repositories/ICarsRepository'
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository'
import { ICarsImageRepository } from '@modules/cars/Repositories/ICarsImageRepository'
import { CarsImageRepository } from '@modules/cars/infra/typeorm/repositories/CarsImageRepository'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalsRepository'
import { IUsersTokensRepository } from '@modules/accounts/Repositories/IUsersTokensRepository'
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository'


container.registerSingleton<ICategoryRepository>(
    "CategorieRepository",
    CategorieRepository
);

container.registerSingleton<ISpecificationRepository>(
    "SpecificationRepository",
    SpecificationRepository
);

container.registerSingleton<IUserRepository>(
    "UserRepository",
    UserRepository
);

container.registerSingleton<ICarsRepository>(
    "CarsRepository",
    CarsRepository
)

container.registerSingleton<ICarsImageRepository>(
    "CarsImageRepository",
    CarsImageRepository
)

container.registerSingleton<IRentalsRepository>(
    "RentalsRepository",
    RentalsRepository
)

container.registerSingleton<IUsersTokensRepository>(
    "UsersTokensRepository",
    UsersTokensRepository
)

