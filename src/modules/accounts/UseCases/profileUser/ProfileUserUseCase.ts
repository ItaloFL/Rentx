import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { UserMap } from "@modules/accounts/mapper/UserMap";
import { IUserRepository } from "@modules/accounts/Repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ProfileUserUseCase{

  constructor(
    @inject("UserRepository")
    private usersRepository: IUserRepository
  ){}

  async execute(id: string): Promise<IUserResponseDTO>{

    const user = await this.usersRepository.findById(id)

    return UserMap.toDTO(user)
  }

}

export { ProfileUserUseCase }