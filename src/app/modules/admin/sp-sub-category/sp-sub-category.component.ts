import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { GridServiceMaterial, IColumn, MaterialGridComponent } from 'app/shared'
import { ISpSubCategory } from './common/sp-sub-category.model'
import { SpSubCategoryFormComponent } from './sp-sub-category-form/sp-sub-category-form.component'
import { SpSubCategoryService, SpSubCategoryGridService } from './common/sp-sub-category.service'

@Component({
  selector: 'app-sp-sub-category',
  imports: [MaterialGridComponent],
  templateUrl: './sp-sub-category.component.html',
  styleUrl: './sp-sub-category.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    SpSubCategoryService,
    SpSubCategoryGridService,
    {
      provide: GridServiceMaterial,
      useExisting: SpSubCategoryGridService,
    },
  ],
})
export class SpSubCategoryComponent {
  private $service = inject(SpSubCategoryService)
  private $serviceGrid = inject(SpSubCategoryGridService)
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
      .open(SpSubCategoryFormComponent, {
        data: {},
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.$serviceGrid.onLoadPage(this.$serviceGrid.pageEvent)
        }
      })
  }

  onRowSelect(event: ISpSubCategory) {
    this.dialog
      .open(SpSubCategoryFormComponent, {
        data: { subCategory: event },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.$serviceGrid.onLoadPage(this.$serviceGrid.pageEvent)
        }
      })
  }
}
