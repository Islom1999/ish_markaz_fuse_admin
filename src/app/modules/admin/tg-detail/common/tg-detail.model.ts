import { IBaseModel } from 'app/core/services/bace.model'
import { ISpRegion } from '../../sp-region/common/sp-region.model'
import { ISpDistrict } from '../../sp-district/common/sp-district.model'

export enum TgType {
  channel_root = 'channel_root',
  group_root = 'group_root',
  bot_root = 'bot_root',
  group_location = 'group_location',
}

export const TgTypeText = {
  [TgType.bot_root]: 'Asosiy bot',
  [TgType.channel_root]: 'Asosiy Kanal',
  [TgType.group_root]: 'Asosiy Gruppa',
  [TgType.group_location]: 'Hududlar kanali',
}

export interface ITgDetail extends IBaseModel {
  name: string
  username: string
  tg_type: TgType
  chanel?: string
  token?: string

  region_id?: string
  region?: ISpRegion
  district_id?: string
  district?: ISpDistrict
}
