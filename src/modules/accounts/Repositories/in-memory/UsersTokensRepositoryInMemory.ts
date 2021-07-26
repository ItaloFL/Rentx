import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { utc } from "dayjs";
import { IUsersTokensRepository } from "../IUsersTokensRepository";



class UsersTokensRepositoryInMemory implements IUsersTokensRepository{
  
  userTokens: UserTokens[] = []

  async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens()

    Object.assign(userToken,{
      expires_date,
      refresh_token,
      user_id
    })

    this.userTokens.push(userToken)

    return userToken
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
    return this.userTokens.find(userToken => user_id === user_id && userToken.refresh_token === refresh_token)
  }
  async deleteById(id: string): Promise<void> {
    const userToken = this.userTokens.find(userToken => userToken.id === id)
    this.userTokens.splice(this.userTokens.indexOf(userToken))
  }
  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    return this.userTokens.find((user) => user.refresh_token === refresh_token)
  }
}

export { UsersTokensRepositoryInMemory }