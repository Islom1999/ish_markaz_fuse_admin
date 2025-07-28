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
    },
    {
      field: 'username',
      header: 'username',
    },
    {
      field: 'tg_type',
      header: 'tg_type',
    },
    {
      field: 'chanel',
      header: 'chanel',
    },
    {
      field: 'token',
      header: 'token',
    },
    {
      field: 'region.name',
      header: 'region.name',
    },
    {
      field: 'district.name',
      header: 'district.name',
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
