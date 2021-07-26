import { IUserRepository } from "@modules/accounts/Repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/Repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DayProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { v4 as uuid } from 'uuid'
import { resolve } from 'path'

@injectable()
class SendForgotPasswordMailUseCase{

  constructor(
    @inject("UserRepository")
    private usersRepository: IUserRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("MailProvider")
    private mailProvider: IMailProvider
  ){}

  async execute(email: string): Promise<void>{

    const user = await this.usersRepository.findByEmail(email);

    const Templatepath = resolve(__dirname, "..", "..", "views", "Emails", "ForgotPassword.hbs")

    if(!user){
      throw new AppError("User does not exist!")
    }

    const token = uuid()

    const expires_date = this.dateProvider.addHours(3)

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date
    })

    const variables = {
      name: user.name,  
      link: `${process.env.FORGOT_MAIL_URL}${token}`
    }

    await this.mailProvider.sendMail(
      email,
      "Recuperação de senha",
      variables,
      Templatepath
    )
  }

}

export { SendForgotPasswordMailUseCase }
