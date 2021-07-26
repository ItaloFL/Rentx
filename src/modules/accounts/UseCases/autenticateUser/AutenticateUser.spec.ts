import { AppError } from "@shared/errors/AppError"
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO"
import { UsersRepositoryInMemory } from "@modules/accounts/Repositories/in-memory/UsersRepositoryInMemory"
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase"
import { AutenticateUserUseCase } from "./autenticateUserUseCase"
import { UsersTokensRepositoryInMemory } from "@modules/accounts/Repositories/in-memory/UsersTokensRepositoryInMemory"
import { DayjsDateProvider } from "@shared/container/providers/DayProvider/implementations/DayjsDateProvider"


let usersRepositoryInMemory: UsersRepositoryInMemory
let autenticateUserUseCase: AutenticateUserUseCase
let createUserUseCase: CreateUserUseCase
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dateProvider: DayjsDateProvider


describe("Authenticate User", () => {


    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
        dateProvider = new DayjsDateProvider()
        autenticateUserUseCase = new AutenticateUserUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider
        )
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    })

    it("should be able to autenticate user", async () => {
        const user: ICreateUserDTO = {
            driver_liscense: "0098978",
            email: "user@test@gmail.com",
            name: "user test",
            password: "test"
        };

        await createUserUseCase.execute(user)

        const result = await autenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        })

        expect(result).toHaveProperty("token")

        
    });


    it("should not be able to autenticate a no exist accound", async () => {
        await expect(autenticateUserUseCase.execute({
                email: "false@test@gmail.com",
                password: "1235"
            })
        ).rejects.toEqual(new AppError("Usuario ou senha incorretos"))
    })


    it("should not be able to autenticate to incorrect password", async () => {
        const user : ICreateUserDTO = {
            driver_liscense: "9999",
            email: "user@test.com",
            password: "1234",
            name: "user test"
        }

        await createUserUseCase.execute(user)

        await expect(autenticateUserUseCase.execute({
                email: user.email,
                password: "incorrectPassword"
            })
        ).rejects.toEqual(new AppError("Usuario ou senha incorretos"))
    })
})