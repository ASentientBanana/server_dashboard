
export type User = {
    username: string,
    id: string
}

export type NewUser = {
    username: string,
    password: string
}

export type AuthRegisterUserResponse = {
    username: string,
    id: string,
    password: string
}

export type AuthUserDBResponse = {
    username: string,
    id: string,
    password: string
}