import { Injectable } from '@angular/core'
import { BaseCrudService, GridResponse, GridServiceMaterial, GridRequestParams } from 'app/shared'
import { Observable } from 'rxjs'
import { ISpDistrict } from './sp-district.model'

@Injectable({
  providedIn: 'root',
})
export class SpDistrictService extends BaseCrudService<ISpDistrict> {
  constructor() {
    super('admin/sp-district')
  }
}

@Injectable({
  providedIn: 'root',
})
export class SpDistrictGridService extends GridServiceMaterial<ISpDistrict> {
  constructor(private $api: SpDistrictService) {
    super()
  }

  getAllData(
    params: GridRequestParams & { filters?: string }
  ): Observable<GridResponse<ISpDistrict>> {
    return this.$api.getAllPagination(params)
  }
}
