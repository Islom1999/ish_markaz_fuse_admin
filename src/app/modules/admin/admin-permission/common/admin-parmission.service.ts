import { Injectable } from '@angular/core'
import { BaseCrudService, GridResponse, GridServiceMaterial, GridRequestParams } from 'app/shared'
import { Observable } from 'rxjs'
import { IAdminPermission } from './admin-parmission.model'

@Injectable({
  providedIn: 'root',
})
export class AdminPermissionService extends BaseCrudService<IAdminPermission> {
  constructor() {
    super('admin/admin-permission')
  }
}

@Injectable({
  providedIn: 'root',
})
export class AdminPermissionGridService extends GridServiceMaterial<IAdminPermission> {
  constructor(private $api: AdminPermissionService) {
    super()
  }

  getAllData(
    params: GridRequestParams & { filters?: string }
  ): Observable<GridResponse<IAdminPermission>> {
    return this.$api.getAllPagination(params)
  }
}
