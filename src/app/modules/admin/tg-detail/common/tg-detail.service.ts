import { Injectable } from '@angular/core'
import { BaseCrudService, GridResponse, GridServiceMaterial } from 'app/shared'
import { Observable } from 'rxjs'
import { ITgDetail } from './tg-detail.model'

@Injectable({
  providedIn: 'root',
})
export class TgDetailService extends BaseCrudService<ITgDetail> {
  constructor() {
    super('admin/tg-detail')
  }
}

@Injectable({
  providedIn: 'root',
})
export class TgDetailGridService extends GridServiceMaterial<ITgDetail> {
  constructor(private $api: TgDetailService) {
    super()
  }

  getAllData(params: {
    page: number
    limit: number
    sort?: string
    order?: string
    filters?: string
  }): Observable<GridResponse<ITgDetail>> {
    return this.$api.getAllPagination(params)
  }
}
