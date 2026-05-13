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

export interface Category {
  id: number
  name: string
  slug: string
  description: string | null
  status: number | boolean
  created_at?: string
  updated_at?: string
  deleted_at?: string | null
}

export type CategoryPayload = Pick<Category, 'name' | 'description' | 'status'>

export interface EquipmentStatus {
  id: number
  name: string
  slug?: string
  description?: string | null
  created_at?: string
  updated_at?: string
  deleted_at?: string | null
}
export interface EquipmentImage {
  id: number
  equipment_id: number
  image_path: string
  image_name: string
  is_primary: boolean
  url: string         
  created_at?: string
  updated_at?: string
  deleted_at?: string | null
}


export interface Equipment {
  id: number
  name: string
  code: string        
  slug?: string
  description: string | null
  stock: number | null
  is_active: boolean
  category_id: number | null
  equipment_status_id: number
  // Relaciones eager-loaded
  images?: EquipmentImage[]
  category?: Category | null
  status?: EquipmentStatus
  created_at?: string
  updated_at?: string
  deleted_at?: string | null
}

export interface EquipmentGeneralData {
  categories: CategoryOption[]
  statuses: EquipmentStatusOption[]
}

export interface CategoryOption {
  id: number
  name: string
}

export interface EquipmentStatusOption {
  id: number
  name: string
}