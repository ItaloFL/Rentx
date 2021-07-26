interface ICreateUserDTO{
    name: string
    email: string
    password: string
    driver_liscense: string
    id?: string;
    avatar?: string;
}


export { ICreateUserDTO }