import { IBaseModel } from 'app/core/services/bace.model'
import { ISpDistrict } from '../../sp-district/common/sp-district.model'
import { ISpSubCategory } from '../../sp-sub-category/common/sp-sub-category.model'

export interface IClientResumeToCategory extends IBaseModel {
  sub_category_id: string
  sub_category?: ISpSubCategory
  client_resume_id?: string
  client_resume?: IClientResume
}

export interface IClientResume extends IBaseModel {
  bigint_id?: string
  description?: string
  experience_text: string
  price_text?: string
  phone?: string
  fullname?: string
  username?: string

  district_id: string
  district?: ISpDistrict

  client_user_id?: string
  // client_user?: IClientUser;

  client_resume_to_category?: IClientResumeToCategory[]
}
