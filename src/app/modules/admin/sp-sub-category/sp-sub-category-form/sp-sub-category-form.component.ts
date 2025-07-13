import { ChangeDetectionStrategy, Component, inject, Inject } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { SpRegionService } from '../../sp-region/common/sp-region.service'
import { ISpSubCategory } from '../common/sp-sub-category.model'
import { SpSubCategoryService } from '../common/sp-sub-category.service'
import { SpCategoryService } from '../../sp-category/common/sp-category.service'

@Component({
  selector: 'app-sp-sub-category-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './sp-sub-category-form.component.html',
  styleUrl: './sp-sub-category-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpSubCategoryFormComponent {
  private $service = inject(SpSubCategoryService)
  private $serviceCategory = inject(SpCategoryService)
  dialogRef = inject(MatDialogRef<SpSubCategoryFormComponent>)
  fb = inject(FormBuilder)

  categories = toSignal(this.$serviceCategory.getAll(), {
    initialValue: [],
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: { subCategory?: ISpSubCategory }) {
    if (data?.subCategory) {
      this.form.patchValue(data.subCategory)
    }
  }

  form = this.fb.group({
    category_id: ['', Validators.required],
    name_uz: ['', Validators.required],
    name_kr: ['', Validators.required],
    name_ru: ['', Validators.required],
  })

  submit() {
    if (this.form.valid) {
      if (this.data.subCategory) {
        this.$service.update(this.data.subCategory.id, this.form.value).subscribe({
          next: () => {
            this.dialogRef.close(true)
          },
          error: (err) => {
            console.log(err)
          },
        })
      } else {
        this.$service.create(this.form.value).subscribe({
          next: () => {
            this.dialogRef.close(true)
          },
          error: (err) => {
            console.log(err)
          },
        })
      }
    }
  }

  delete() {
    if (this.data.subCategory) {
      this.$service.delete(this.data.subCategory.id).subscribe({
        next: () => {
          this.dialogRef.close(true)
        },
        error: (err) => {
          console.log(err)
        },
      })
    }
  }
}
