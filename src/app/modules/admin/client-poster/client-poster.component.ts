import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MaterialGridComponent, GridServiceMaterial, IColumn } from 'app/shared'
import { ClientPosterFormComponent } from './client-poster-form/client-poster-form.component'
import { IClientPoster } from './common/client-poster.model'
import { ClientPosterService, ClientPosterGridService } from './common/client-poster.service'

@Component({
  selector: 'app-client-poster',
  imports: [MaterialGridComponent],
  templateUrl: './client-poster.component.html',
  styleUrl: './client-poster.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ClientPosterService,
    ClientPosterGridService,
    {
      provide: GridServiceMaterial,
      useExisting: ClientPosterGridService,
    },
  ],
})
export class ClientPosterComponent {
  private $service = inject(ClientPosterService)
  private $serviceGrid = inject(ClientPosterGridService)
  private dialog = inject(MatDialog)

  columns: IColumn[] = [
    {
      field: 'bigint_id',
      header: 'bigint_id',
      is_filter: true,
    },
    {
      field: 'fullname',
      header: 'fullname',
      is_filter: true,
    },
    {
      field: 'username',
      header: 'username',
      is_filter: true,
    },
    {
      field: 'phone',
      header: 'phone',
      is_filter: true,
    },
    {
      field: 'description',
      header: 'description',
      is_filter: true,
    },
    {
      field: 'price_text',
      header: 'price_text',
      is_filter: true,
    },
  ]

  breakpointObserver
  onClickAdd(event: any) {
    this.dialog
      .open(ClientPosterFormComponent, {
        data: {},
        panelClass: 'custom-dialog-container',
        maxHeight: '90vh',
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.$serviceGrid.onLoadPage(this.$serviceGrid.pageEvent)
        }
      })
  }

  onRowSelect(event: IClientPoster) {
    this.dialog
      .open(ClientPosterFormComponent, {
        data: { ClientPoster: event },
        panelClass: 'custom-dialog-container',
        maxHeight: '90vh',
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.$serviceGrid.onLoadPage(this.$serviceGrid.pageEvent)
        }
      })
  }
}