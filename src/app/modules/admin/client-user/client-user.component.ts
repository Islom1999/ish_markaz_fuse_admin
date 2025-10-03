import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { GridServiceMaterial, IColumn, MaterialGridComponent } from 'app/shared'
import { ClientUserGridService, ClientUserService } from './common/client-user.service'
import { MatDialog } from '@angular/material/dialog'
import { ClientUserStatusFormComponent } from './client-user-status-form/client-user-status-form.component'
import { IClientUser } from './common/client-user.model'
import { HasPermissionDirective } from 'app/core/auth/directives/has-role.directive'

@Component({
  selector: 'app-client-user',
  imports: [MaterialGridComponent, HasPermissionDirective],
  templateUrl: './client-user.component.html',
  styleUrl: './client-user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ClientUserService,
    ClientUserGridService,
    {
      provide: GridServiceMaterial,
      useExisting: ClientUserGridService,
    },
  ],
})
export class ClientUserComponent {
  private $service = inject(ClientUserService)
  private $serviceGrid = inject(ClientUserGridService)
  private dialog = inject(MatDialog)

  columns: IColumn[] = [
    {
      field: 'fullname',
      header: 'Ismi',
      is_filter: true,
    },
    {
      field: 'phone',
      header: 'Tel raqami',
      is_filter: true,
    },
    // {
    //   field: 'region.name_uz',
    //   header: 'Viloyat',
    // },
    // {
    //   field: 'district.name_uz',
    //   header: 'Tuman',
    // },
    {
      field: 'role',
      header: 'User roli',
      is_filter: true,
    },
    {
      field: 'is_block',
      header: "Qora ro'yhat",
      is_filter: true,
      filterType: 'boolean',
    },
  ]

  onClickAdd(event: any) {
    // this.dialog
    //   .open(ClientUserStatusFormComponent, {
    //     data: {},
    //   })
    //   .afterClosed()
    //   .subscribe((res) => {
    //     if (res) {
    //       this.$serviceGrid.onLoadPage(this.$serviceGrid.pageEvent)
    //     }
    //   })
  }

  onRowSelect(event: IClientUser) {
    this.dialog
      .open(ClientUserStatusFormComponent, {
        data: { user: event },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.$serviceGrid.onLoadPage(this.$serviceGrid.pageEvent)
        }
      })
  }
}
