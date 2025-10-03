import { Injectable } from '@angular/core'
import { BaseCrudService, GridResponse, GridServiceMaterial, GridRequestParams } from 'app/shared'
import { Observable } from 'rxjs'
import { IClientResume } from './client-resume.model'

@Injectable({
  providedIn: 'root',
})
export class ClientResumeService extends BaseCrudService<IClientResume> {
  constructor() {
    super('admin/client-resume')
  }
}

@Injectable({
  providedIn: 'root',
})
export class ClientResumeGridService extends GridServiceMaterial<IClientResume> {
  constructor(private $api: ClientResumeService) {
    super()
  }

  getAllData(
    params: GridRequestParams & { filters?: string }
  ): Observable<GridResponse<IClientResume>> {
    return this.$api.getAllPagination(params)
  }
}
