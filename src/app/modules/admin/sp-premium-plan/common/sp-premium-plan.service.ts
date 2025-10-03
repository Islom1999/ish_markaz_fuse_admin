import { Injectable } from '@angular/core'
import { BaseCrudService, GridResponse, GridServiceMaterial, GridRequestParams } from 'app/shared'
import { Observable } from 'rxjs'
import { ISpPremiumPlan } from './sp-premium-plan.model'

@Injectable({
  providedIn: 'root',
})
export class SpPremiumPlanService extends BaseCrudService<ISpPremiumPlan> {
  constructor() {
    super('admin/sp-premium-plan')
  }
}

@Injectable({
  providedIn: 'root',
})
export class SpPremiumPlanGridService extends GridServiceMaterial<ISpPremiumPlan> {
  constructor(private $api: SpPremiumPlanService) {
    super()
  }

  getAllData(
    params: GridRequestParams & { filters?: string }
  ): Observable<GridResponse<ISpPremiumPlan>> {
    return this.$api.getAllPagination(params)
  }
}
