import { Injectable } from '@angular/core'
import { BaseCrudService, GridResponse, GridServiceMaterial } from 'app/shared'
import { Observable } from 'rxjs'
import { IClientPoster } from './client-poster.model'

@Injectable({
  providedIn: 'root',
})
export class ClientPosterService extends BaseCrudService<IClientPoster> {
  constructor() {
    super('admin/client-poster')
  }
}

@Injectable({
  providedIn: 'root',
})
export class ClientPosterGridService extends GridServiceMaterial<IClientPoster> {
  constructor(private $api: ClientPosterService) {
    super()
  }

  getAllData(params: {
    page: number
    limit: number
    sort?: string
    order?: string
    filters?: string
  }): Observable<GridResponse<IClientPoster>> {
    return this.$api.getAllPagination(params)
  }
}
