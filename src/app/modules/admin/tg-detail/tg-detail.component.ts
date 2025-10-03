import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { GridServiceMaterial, IColumn, MaterialGridComponent } from 'app/shared'
import { ITgDetail } from './common/tg-detail.model'
import { TgDetailGridService, TgDetailService } from './common/tg-detail.service'
import { TgDetailFormComponent } from './tg-detail-form/tg-detail-form.component'

@Component({
  selector: 'app-tg-detail',
  imports: [MaterialGridComponent],
  templateUrl: './tg-detail.component.html',
  styleUrl: './tg-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: GridServiceMaterial,
      useExisting: TgDetailGridService,
    },
  ],
})
export class TgDetailComponent {
  private $service = inject(TgDetailService)
  private $serviceGrid = inject(TgDetailGridService)
  private dialog = inject(MatDialog)

  columns: IColumn[] = [
    {
      field: 'name',
      header: 'name',
      is_filter: true,
    },
    {
      field: 'username',
      header: 'username',
      is_filter: true,
    },
    {
      field: 'tg_type',
      header: 'tg_type',
      is_filter: true,
    },
    {
      field: 'chanel',
      header: 'chanel',
      is_filter: true,
    },
    {
      field: 'token',
      header: 'token',
      is_filter: true,
    },
    {
      field: 'region.name',
      header: 'region.name',
      is_filter: false,
    },
    {
      field: 'district.name',
      header: 'district.name',
      is_filter: false,
    },
  ]

  onClickAdd(event: any) {
    this.dialog
      .open(TgDetailFormComponent, {
        data: {},
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.$serviceGrid.onLoadPage(this.$serviceGrid.pageEvent)
        }
      })
  }

  onRowSelect(event: ITgDetail) {
    this.dialog
      .open(TgDetailFormComponent, {
        data: { TgDetail: event },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.$serviceGrid.onLoadPage(this.$serviceGrid.pageEvent)
        }
      })
  }
}



