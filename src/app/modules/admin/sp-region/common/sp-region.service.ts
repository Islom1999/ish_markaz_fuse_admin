import { Injectable } from '@angular/core'
import { ISpRegion } from './sp-region.model'
import { BaseCrudService, GridResponse, GridServiceMaterial, GridRequestParams } from 'app/shared'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class SpRegionService extends BaseCrudService<ISpRegion> {
  constructor() {
    super('admin/sp-region')
  }
}

@Injectable({
  providedIn: 'root',
})
export class SpRegionGridService extends GridServiceMaterial<ISpRegion> {
  constructor(private $api: SpRegionService) {
    super()
  }

  getAllData(
    params: GridRequestParams & { filters?: string }
  ): Observable<GridResponse<ISpRegion>> {
    return this.$api.getAllPagination(params)
  }
}
