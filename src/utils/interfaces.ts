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

export interface ReservationStatus {
  id: number
  name: string
  slug: string
  description?: string | null
}

export interface Reservation {
  id: number
  user_id: number
  equipment_id: number
  start_time: string
  end_time: string
  reservation_status_id: number
  notes: string | null
  rejection_reason: string | null
  approved_by: number | null
  approved_at: string | null
  user?: { id: number; name: string; last_name: string }
  equipment?: { id: number; name: string }
  reservation_status?: ReservationStatus
  created_at?: string
  updated_at?: string
  deleted_at?: string | null
}

export type ReservationPayload = Pick<Reservation, 'user_id' | 'equipment_id' | 'start_time' | 'end_time' | 'notes'>

export interface ReservationGeneralData {
  users: { id: number; name: string; last_name: string }[]
  equipments: { id: number; name: string }[]
  statuses: ReservationStatus[]
}

export interface ReportRequestStatus {
  id: number
  name: string
  slug: string
}

export interface ReportRequestType {
  id: number
  name: string
  slug: string
}

export interface ReportFile {
  id: number
  file_path: string
  file_name: string
  generated_at: string
}

export interface ReportRequest {
  id: number
  user_id: number
  report_request_type_id: number
  start_date: string | null
  end_date: string | null
  report_request_status_id: number
  filters: object | null
  user?: { id: number; name: string; last_name: string }
  report_request_type?: ReportRequestType
  report_request_status?: ReportRequestStatus
  reports?: ReportFile[]
  created_at?: string
  updated_at?: string
  deleted_at?: string | null
}

export type ReportRequestPayload = Pick<ReportRequest, 'user_id' | 'report_request_type_id' | 'start_date' | 'end_date'>