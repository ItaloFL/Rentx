import { UsersRepositoryInMemory } from "@modules/accounts/Repositories/in-memory/UsersRepositoryInMemory"
import { UsersTokensRepositoryInMemory } from "@modules/accounts/Repositories/in-memory/UsersTokensRepositoryInMemory"
import { DayjsDateProvider } from "@shared/container/providers/DayProvider/implementations/DayjsDateProvider"
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory"
import { AppError } from "@shared/errors/AppError"
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"


let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let dateProvider: DayjsDateProvider
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let mailProvider: MailProviderInMemory

describe("Send forgot mail", () => {


  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    mailProvider = new MailProviderInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    dateProvider= new DayjsDateProvider()
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    )
  })

  afterAll ( async  ( )  =>  { 
    await  new  Promise ( resolve  =>  setTimeout ( ( )  =>  resolve (mailProvider) ,  500 ) ) ;  // evita erro de manipulação de abertura de brincadeira 
  } ) ;


  it("should be able to send a forgot password mail to user", async () => {

    const sendmail = jest.spyOn(mailProvider, "sendMail")

    await usersRepositoryInMemory.create({
      driver_liscense: "21312",
      email: "test1@create.com",
      name: "test",
      password: "test123"
    })

    await sendForgotPasswordMailUseCase.execute("test1@create.com")

    expect(sendmail).toHaveBeenCalled()
  })

  it("should not be able to send a email if user does not exist",async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("test2@test.com")
    ).rejects.toEqual(new AppError("User does not exist!"))
  })

  it("should be able to create a new userToken", async () => {

    const generateTokenMail = jest.spyOn(usersRepositoryInMemory, "create")

    await usersRepositoryInMemory.create({
      driver_liscense: "912837",
      email: "test5@create.com",
      name: "test2",
      password: "test12345"
    })

    await sendForgotPasswordMailUseCase.execute("test5@create.com")

    expect(generateTokenMail).toHaveBeenCalled
  })
})