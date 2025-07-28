import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MaterialGridComponent, GridServiceMaterial, IColumn } from 'app/shared'
import { ISpPremiumPlan } from './common/sp-premium-plan.model'
import { SpPremiumPlanService, SpPremiumPlanGridService } from './common/sp-premium-plan.service'
import { SpPremiumPlanFormComponent } from './sp-premium-plan-form/sp-premium-plan-form.component'

@Component({
  selector: 'app-sp-premium-plan',
  imports: [MaterialGridComponent],
  templateUrl: './sp-premium-plan.component.html',
  styleUrl: './sp-premium-plan.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    SpPremiumPlanService,
    SpPremiumPlanGridService,
    {
      provide: GridServiceMaterial,
      useExisting: SpPremiumPlanGridService,
    },
  ],
})
export class SpPremiumPlanComponent {
  private $service = inject(SpPremiumPlanService)
  private $serviceGrid = inject(SpPremiumPlanGridService)
  private dialog = inject(MatDialog)

  columns: IColumn[] = [
    {
      field: 'name_uz',
      header: 'name_uz',
    },
    {
      field: 'name_kr',
      header: 'name_kr',
    },
    {
      field: 'name_ru',
      header: 'name_ru',
    },
    {
      field: 'price',
      header: 'price',
    },
    {
      field: 'premium_date',
      header: 'premium_date',
    },
  ]

  onClickAdd(event: any) {
    this.dialog
      .open(SpPremiumPlanFormComponent, {
        data: {},
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.$serviceGrid.onLoadPage(this.$serviceGrid.pageEvent)
        }
      })
  }

  onRowSelect(event: ISpPremiumPlan) {
    this.dialog
      .open(SpPremiumPlanFormComponent, {
        data: { premiumPlan: event },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.$serviceGrid.onLoadPage(this.$serviceGrid.pageEvent)
        }
      })
  }
}
