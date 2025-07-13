import { ChangeDetectionStrategy, Component, inject, Inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ISpCategory } from '../common/sp-category.model'
import { SpCategoryService } from '../common/sp-category.service'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

@Component({
  selector: 'app-sp-category-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './sp-category-form.component.html',
  styleUrl: './sp-category-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpCategoryFormComponent {
  private $service = inject(SpCategoryService)
  dialogRef = inject(MatDialogRef<SpCategoryFormComponent>)
  fb = inject(FormBuilder)

  constructor(@Inject(MAT_DIALOG_DATA) public data: { category?: ISpCategory }) {
    if (data?.category) {
      this.form.patchValue(data.category)
    }
  }

  form = this.fb.group({
    name_uz: ['', Validators.required],
    name_kr: ['', Validators.required],
    name_ru: ['', Validators.required],
  })

  submit() {
    if (this.form.valid) {
      if (this.data.category) {
        this.$service.update(this.data.category.id, this.form.value).subscribe({
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
    if (this.data.category) {
      this.$service.delete(this.data.category.id).subscribe({
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
