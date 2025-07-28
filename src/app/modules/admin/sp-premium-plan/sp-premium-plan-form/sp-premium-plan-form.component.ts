import { ChangeDetectionStrategy, Component, inject, Inject } from '@angular/core'
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { ISpPremiumPlan } from '../common/sp-premium-plan.model'
import { SpPremiumPlanService } from '../common/sp-premium-plan.service'

@Component({
  selector: 'app-sp-premium-plan-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './sp-premium-plan-form.component.html',
  styleUrl: './sp-premium-plan-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpPremiumPlanFormComponent {
  private $service = inject(SpPremiumPlanService)
  dialogRef = inject(MatDialogRef<SpPremiumPlanFormComponent>)
  fb = inject(FormBuilder)

  constructor(@Inject(MAT_DIALOG_DATA) public data: { premiumPlan?: ISpPremiumPlan }) {
    if (data?.premiumPlan) {
      this.form.patchValue(data.premiumPlan)
    }
  }

  form = this.fb.group({
    name_uz: ['', Validators.required],
    name_kr: ['', Validators.required],
    name_ru: ['', Validators.required],
    price: [1000, Validators.required],
    premium_date: [1, Validators.required],
  })

  submit() {
    if (this.form.valid) {
      if (this.data.premiumPlan) {
        this.$service.update(this.data.premiumPlan.id, this.form.value).subscribe({
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
    if (this.data.premiumPlan) {
      this.$service.delete(this.data.premiumPlan.id).subscribe({
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
