import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { SpDistrictService } from '../common/sp-district.service'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { ISpDistrict } from '../common/sp-district.model'
import { SpRegionService } from '../../sp-region/common/sp-region.service'
import { toSignal } from '@angular/core/rxjs-interop'
import { MatSelectModule } from '@angular/material/select'

@Component({
  selector: 'app-sp-district-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './sp-district-form.component.html',
  styleUrl: './sp-district-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpDistrictFormComponent {
  private $service = inject(SpDistrictService)
  private $serviceRegion = inject(SpRegionService)
  dialogRef = inject(MatDialogRef<SpDistrictFormComponent>)
  fb = inject(FormBuilder)

  regions = toSignal(this.$serviceRegion.getAll(), {
    initialValue: [],
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: { district?: ISpDistrict }) {
    if (data?.district) {
      this.form.patchValue(data.district)
    }
  }

  form = this.fb.group({
    region_id: ['', Validators.required],
    name_uz: ['', Validators.required],
    name_kr: ['', Validators.required],
    name_ru: ['', Validators.required],
  })

  submit() {
    if (this.form.valid) {
      if (this.data.district) {
        this.$service.update(this.data.district.id, this.form.value).subscribe({
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
    if (this.data.district) {
      this.$service.delete(this.data.district.id).subscribe({
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
