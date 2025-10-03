import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { GridServiceMaterial, IColumn, MaterialGridComponent } from 'app/shared'
import { ClientResumeService, ClientResumeGridService } from './common/client-resume.service'
import { MatDialog } from '@angular/material/dialog'
import { ClientResumeFormComponent } from './client-resume-form/client-resume-form.component'
import { IClientResume } from './common/client-resume.model'

@Component({
  selector: 'app-client-resume',
  imports: [MaterialGridComponent],
  templateUrl: 'client-resume.component.html',
  styleUrl: './client-resume.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ClientResumeService,
    ClientResumeGridService,
    {
      provide: GridServiceMaterial,
      useExisting: ClientResumeGridService,
    },
  ],
})
export class ClientResumeComponent {
  private $service = inject(ClientResumeService)
  private $serviceGrid = inject(ClientResumeGridService)
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
      field: 'experience_text',
      header: 'experience_text',
      is_filter: true,
    },
    {
      field: 'price_text',
      header: 'price_text',
      is_filter: true,
    },
  ]

  onClickAdd(event: any) {
    this.dialog
      .open(ClientResumeFormComponent, {
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

  onRowSelect(event: IClientResume) {
    this.dialog
      .open(ClientResumeFormComponent, {
        data: { clientResume: event },
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