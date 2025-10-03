import { Injectable } from '@angular/core'
import { BaseCrudService, GridResponse, GridServiceMaterial, GridRequestParams } from 'app/shared'
import { Observable } from 'rxjs'
import { IClientUser, IClientUserStatusDto } from './client-user.model'

@Injectable({
  providedIn: 'root',
})
export class ClientUserService extends BaseCrudService<IClientUser> {
  constructor() {
    super('admin/client-user')
  }

  update(id: string, data: Partial<IClientUserStatusDto>): Observable<IClientUser> {
    return this.baseApi.put<IClientUser>(`${this.endpoint}/${id}`, data)
  }
}

@Injectable({
  providedIn: 'root',
})
export class ClientUserGridService extends GridServiceMaterial<IClientUser> {
  constructor(private $api: ClientUserService) {
    super()
  }

  getAllData(
    params: GridRequestParams & { filters?: string }
  ): Observable<GridResponse<IClientUser>> {
    return this.$api.getAllPagination(params)
  }
}
