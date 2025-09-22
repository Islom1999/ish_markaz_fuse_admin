import { IBaseModel } from 'app/core/services/bace.model'

export enum UserRole {
  ARTISAN = 'ARTISAN',
  CLIENT = 'CLIENT',
}

// export const UserRoleList = {
//   [UserRole.ARTISAN]: '🛠 Usta',
//   [UserRole.CLIENT]: '👤 Mijoz',
// }

export const UserRoleList = [
  { value: UserRole.ARTISAN, label: '🛠 Usta' },
  { value: UserRole.CLIENT, label: '👤 Mijoz' },
]

export interface IClientUser extends IBaseModel {
  bigint_id: string
  image_file_id: any
  fullname: string
  phone: string
  about: any
  username: string
  email: any
  location: any
  telegram_id: string
  role: string
  is_success: boolean
  premium_end_date: any
  hash: any
  otp_code: any
  otp_code_expire: any
  is_block: boolean
  region_id: string
  district_id: string
}

export class IClientUserStatusDto {
  role: UserRole
  is_block: boolean
}
