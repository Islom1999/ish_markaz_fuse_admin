import { IBaseModel } from 'app/core/services/bace.model'

export interface ISpPremiumPlan extends IBaseModel {
  name_uz: string
  name_ru: string
  name_kr: string
  price: number
  premium_date: number
}
