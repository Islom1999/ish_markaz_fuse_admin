import { IBaseModel } from 'app/core/services/bace.model'
import { ISpDistrict } from '../../sp-district/common/sp-district.model'
import { ISpSubCategory } from '../../sp-sub-category/common/sp-sub-category.model'

export interface IClientPosterToCategory extends IBaseModel {
  sub_category_id: string
  sub_category?: ISpSubCategory
  client_poster_id?: string
  client_poster?: IClientPoster
}

export interface IClientPoster extends IBaseModel {
  bigint_id?: string
  poster_status: PosterStatus
  description?: string
  date?: Date
  // experience_text: string
  price_text?: string
  phone?: string
  fullname?: string
  username?: string

  district_id: string
  district?: ISpDistrict

  client_user_id?: string
  // client_user?: IClientUser;
  client_poster_to_category?: IClientPosterToCategory[]
}

export enum PosterStatus {
  draft = 'draft',
  new = 'new',
  checked = 'checked',
  actived = 'actived',
  completed = 'completed',
}

export const PosterStatusText = {
  [PosterStatus.draft]: 'Qoralama',
  [PosterStatus.new]: 'Yangi',
  [PosterStatus.checked]: 'Tasdiqlandi',
  [PosterStatus.actived]: 'Faol',
  [PosterStatus.completed]: 'Bajarildi',
}
