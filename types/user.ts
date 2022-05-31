
export type User = {

}

export type NewUser = {
    username: string,
    password: string
}

export type AuthRegisterUserResponse = {
    username: string,
    id: number,
    password: string
}

export type AuthUserDBResponse = {
    username: string,
    id: number,
    password: string
}