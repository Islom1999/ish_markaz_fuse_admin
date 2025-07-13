import { Injectable } from '@angular/core'
import { BaseCrudService, GridResponse, GridServiceMaterial } from 'app/shared'
import { Observable } from 'rxjs'
import { ISpSubCategory } from './sp-sub-category.model'

@Injectable({
  providedIn: 'root',
})
export class SpSubCategoryService extends BaseCrudService<ISpSubCategory> {
  constructor() {
    super('admin/sp-sub-category')
  }
}

@Injectable({
  providedIn: 'root',
})
export class SpSubCategoryGridService extends GridServiceMaterial<ISpSubCategory> {
  constructor(private $api: SpSubCategoryService) {
    super()
  }

  getAllData(params: {
    page: number
    limit: number
    sort?: string
    order?: string
    filters?: string
  }): Observable<GridResponse<ISpSubCategory>> {
    return this.$api.getAllPagination(params)
  }
}
