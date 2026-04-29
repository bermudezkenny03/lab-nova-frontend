export interface Module {
    id: number
    name?: string
    slug?: string
    icon?: string
    route?: string
    children?: Module[]
    permissions: any[]
}
export interface User {
    id: string
    name: string
    last_name: string
    email: string
    user_detail: UserDetail | null
    company_id: string
    role: Role
}

export interface Role {
    id: string
    name: string
    description: string
}
export interface UserDetail {
    gender: string
    addon_address: string
    address: string
    birthdate: string
    created_at: string
    deleted_at: string | null
    notes: string
}

export interface Parameter {
    id: number
    name: string
}
