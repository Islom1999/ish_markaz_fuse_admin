import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { SpDistrictGridService, SpDistrictService } from './common/sp-district.service'
import { GridServiceMaterial, IColumn, MaterialGridComponent } from 'app/shared'
import { MatDialog } from '@angular/material/dialog'
import { SpDistrictFormComponent } from './sp-district-form/sp-district-form.component'
import { ISpDistrict } from './common/sp-district.model'

@Component({
  selector: 'app-sp-district',
  imports: [MaterialGridComponent],
  templateUrl: './sp-district.component.html',
  styleUrl: './sp-district.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    SpDistrictService,
    SpDistrictGridService,
    {
      provide: GridServiceMaterial,
      useExisting: SpDistrictGridService,
    },
  ],
})
export class SpDistrictComponent {
  private $service = inject(SpDistrictService)
  private $serviceGrid = inject(SpDistrictGridService)
  private dialog = inject(MatDialog)

  columns: IColumn[] = [
    {
      field: 'name_uz',
      header: 'name_uz',
      is_filter: true,
    },
    {
      field: 'name_kr',
      header: 'name_kr',
      is_filter: true,
    },
    {
      field: 'name_ru',
      header: 'name_ru',
      is_filter: true,
    },
  ]

  onClickAdd(event: any) {
    this.dialog
      .open(SpDistrictFormComponent, {
        data: {},
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.$serviceGrid.onLoadPage(this.$serviceGrid.pageEvent)
        }
      })
  }

  onRowSelect(event: ISpDistrict) {
    this.dialog
      .open(SpDistrictFormComponent, {
        data: { district: event },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.$serviceGrid.onLoadPage(this.$serviceGrid.pageEvent)
        }
      })
  }
}