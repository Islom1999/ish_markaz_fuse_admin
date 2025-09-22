import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { ClientUserService } from '../common/client-user.service'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { IClientUser, UserRole, UserRoleList } from '../common/client-user.model'
import { MatSelectModule } from '@angular/material/select'

@Component({
  selector: 'app-client-user-status-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatButtonModule],
  templateUrl: './client-user-status-form.component.html',
  styleUrl: './client-user-status-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientUserStatusFormComponent {
  private $service = inject(ClientUserService)
  dialogRef = inject(MatDialogRef<ClientUserStatusFormComponent>)
  fb = inject(FormBuilder)
  userRoleList = UserRoleList

  constructor(@Inject(MAT_DIALOG_DATA) public data: { user?: IClientUser }) {
    if (data?.user) {
      this.form.patchValue(data.user as any)
    }
  }

  form = this.fb.group({
    is_block: [false, Validators.required],
    role: [UserRole.CLIENT, Validators.required],
  })

  submit() {
    if (this.form.valid) {
      if (this.data.user) {
        this.$service.update(this.data.user.id, this.form.value as any).subscribe({
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
}
