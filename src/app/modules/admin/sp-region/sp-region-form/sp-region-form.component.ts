import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { ISpRegion } from '../common/sp-region.model'
import { SpRegionService } from '../common/sp-region.service'

@Component({
  selector: 'app-sp-region-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './sp-region-form.component.html',
  styleUrl: './sp-region-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpRegionFormComponent {
  private $service = inject(SpRegionService)
  dialogRef = inject(MatDialogRef<SpRegionFormComponent>)
  fb = inject(FormBuilder)

  constructor(@Inject(MAT_DIALOG_DATA) public data: { region?: ISpRegion }) {
    if (data?.region) {
      this.form.patchValue(data.region)
    }
  }

  form = this.fb.group({
    name_uz: ['', Validators.required],
    name_kr: ['', Validators.required],
    name_ru: ['', Validators.required],
  })

  submit() {
    if (this.form.valid) {
      if (this.data.region) {
        this.$service.update(this.data.region.id, this.form.value).subscribe({
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
    if (this.data.region) {
      this.$service.delete(this.data.region.id).subscribe({
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
