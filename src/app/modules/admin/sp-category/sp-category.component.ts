import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { GridServiceMaterial, IColumn, MaterialGridComponent } from 'app/shared'
import { ISpCategory } from './common/sp-category.model'
import { SpCategoryService, SpCategoryGridService } from './common/sp-category.service'
import { SpCategoryFormComponent } from './sp-category-form/sp-category-form.component'

@Component({
  selector: 'app-sp-category',
  imports: [MaterialGridComponent],
  templateUrl: './sp-category.component.html',
  styleUrl: './sp-category.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    SpCategoryService,
    SpCategoryGridService,
    {
      provide: GridServiceMaterial,
      useExisting: SpCategoryGridService,
    },
  ],
})
export class SpCategoryComponent {
  private $service = inject(SpCategoryService)
  private $serviceGrid = inject(SpCategoryGridService)
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
  ]

  onClickAdd(event: any) {
    this.dialog
      .open(SpCategoryFormComponent, {
        data: {},
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.$serviceGrid.onLoadPage(this.$serviceGrid.pageEvent)
        }
      })
  }

  onRowSelect(event: ISpCategory) {
    this.dialog
      .open(SpCategoryFormComponent, {
        data: { category: event },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.$serviceGrid.onLoadPage(this.$serviceGrid.pageEvent)
        }
      })
  }
}
