import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table'
import { SpRegionGridService, SpRegionService } from './common/sp-region.service'
import { ISpRegion } from './common/sp-region.model'
import { MaterialGridComponent } from 'app/shared/components/grid/grid.component'
import { IColumn } from 'app/shared/components/grid/common/column.model'
import { GridServiceMaterial } from 'app/shared/components/grid/common/grid.service'
import { MatDialog } from '@angular/material/dialog'
import { SpRegionFormComponent } from './sp-region-form/sp-region-form.component'

@Component({
  selector: 'app-sp-region',
  imports: [MaterialGridComponent],
  templateUrl: './sp-region.component.html',
  styleUrl: './sp-region.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    SpRegionService,
    SpRegionGridService,
    {
      provide: GridServiceMaterial,
      useExisting: SpRegionGridService,
    },
  ],
})
export class SpRegionComponent {
  private $service = inject(SpRegionService)
  private $serviceGrid = inject(SpRegionGridService)
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
      .open(SpRegionFormComponent, {
        data: {},
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.$serviceGrid.onLoadPage(this.$serviceGrid.pageEvent)
        }
      })
  }

  onRowSelect(event: ISpRegion) {
    this.dialog
      .open(SpRegionFormComponent, {
        data: { region: event },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.$serviceGrid.onLoadPage(this.$serviceGrid.pageEvent)
        }
      })
  }
}