export interface Pages {
    name: string
    path: string
    active: boolean
}

export interface Login {
    username: string
    password: string
}

export interface Register {
    firstname: string
    lastname: string
    username: string
    phone: number
    email: string
    password: string
    conpassword: string
}