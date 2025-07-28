import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Inject,
} from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { AdminRoleService } from '../../admin-role/common/admin-role.service'
import { ITgDetail, TgType, TgTypeText } from '../common/tg-detail.model'
import { TgDetailService } from '../common/tg-detail.service'
import { SpDistrictService } from '../../sp-district/common/sp-district.service'
import { SpRegionService } from '../../sp-region/common/sp-region.service'

@Component({
  selector: 'app-tg-detail-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './tg-detail-form.component.html',
  styleUrl: './tg-detail-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TgDetailFormComponent {
  private $service = inject(TgDetailService)
  private $serviceRegion = inject(SpRegionService)
  private $serviceDistrict = inject(SpDistrictService)
  private $cdr = inject(ChangeDetectorRef)
  dialogRef = inject(MatDialogRef<TgDetailFormComponent>)
  fb = inject(FormBuilder)

  tgTypes = Object.values(TgType)
  tgTypeText = TgTypeText

  regions = toSignal(this.$serviceRegion.getAll(), {
    initialValue: [],
  })
  districts = toSignal(this.$serviceDistrict.getAll(), {
    initialValue: [],
  })

  form = this.fb.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    tg_type: ['', Validators.required],
    chanel: [null],
    token: [null],
    region_id: [null],
    district_id: [null],
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: { TgDetail?: ITgDetail }) {
    if (data?.TgDetail) {
      this.form.patchValue({
        ...data.TgDetail,
      })
    }
  }

  submit() {
    if (this.form.valid) {
      const payload = { ...this.form.value }

      Object.keys(payload).forEach((key) => {
        if (payload[key] == '' || payload[key] == null) {
          delete payload[key]
        }
      })

      if (this.data.TgDetail) {
        this.$service.update(this.data.TgDetail.id, payload as any).subscribe({
          next: () => {
            this.dialogRef.close(true)
          },
          error: (err) => {
            console.log(err)
          },
        })
      } else {
        this.$service.create(payload as any).subscribe({
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
    if (this.data.TgDetail) {
      this.$service.delete(this.data.TgDetail.id).subscribe({
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
