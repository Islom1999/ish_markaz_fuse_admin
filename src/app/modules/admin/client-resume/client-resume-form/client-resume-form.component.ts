import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  Inject,
} from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectChange, MatSelectModule } from '@angular/material/select'
import { SpRegionService } from '../../sp-region/common/sp-region.service'
import { IClientResume, ResumeStatus, ResumeStatusText } from '../common/client-resume.model'
import { ClientResumeService } from '../common/client-resume.service'
import { SpDistrictService } from '../../sp-district/common/sp-district.service'
import { ISpSubCategory } from '../../sp-sub-category/common/sp-sub-category.model'
import { SpCategoryService } from '../../sp-category/common/sp-category.service'
import { SpSubCategoryService } from '../../sp-sub-category/common/sp-sub-category.service'

@Component({
  selector: 'app-client-resume-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './client-resume-form.component.html',
  styleUrl: './client-resume-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientResumeFormComponent {
  private $service = inject(ClientResumeService)
  private $serviceRegion = inject(SpRegionService)
  private $serviceDistrict = inject(SpDistrictService)
  private $serviceCategory = inject(SpCategoryService)
  private $serviceSubCategory = inject(SpSubCategoryService)

  cdr = inject(ChangeDetectorRef)
  dialogRef = inject(MatDialogRef<ClientResumeFormComponent>)
  fb = inject(FormBuilder)

  regions = toSignal(this.$serviceRegion.getAll(), {
    initialValue: [],
  })
  districts = toSignal(this.$serviceDistrict.getAll(), {
    initialValue: [],
  })
  categories = toSignal(this.$serviceCategory.getAll(), {
    initialValue: [],
  })
  subCategories = toSignal(this.$serviceSubCategory.getAll(), {
    initialValue: [],
  })
  subCategoriesFilter: ISpSubCategory[] = []
  posterStatus = Object.values(ResumeStatus)
  resumeStatusText = ResumeStatusText

  constructor(@Inject(MAT_DIALOG_DATA) public data: { clientResume?: IClientResume }) {
    if (this.subCategories().length > 0) {
      this.subCategoriesFilter = [...this.subCategories()]
      this.cdr.markForCheck()
    }

    if (data?.clientResume) {
      this.form.patchValue({
        ...data.clientResume,
        region_id: data.clientResume.district.region_id,
      })

      const array = this.form.get('client_resume_to_category') as FormArray
      array.clear()

      if (data?.clientResume?.client_resume_to_category?.length) {
        data.clientResume.client_resume_to_category.forEach((item) => {
          array.push(
            this.fb.group({
              sub_category_id: [item.sub_category_id, Validators.required],
            }),
          )
        })
      }

      effect(() => {
        const list = this.subCategories()
        if (list.length > 0) {
          this.subCategoriesFilter = [...list]
          this.cdr.markForCheck()
        }
        if (data?.clientResume?.client_resume_to_category?.[0]) {
          const subCategory = this.subCategories().find(
            (sc) => sc.id == data?.clientResume?.client_resume_to_category?.[0].sub_category_id,
          )
          if (subCategory?.category_id)
            this.form.get('category_id')?.patchValue(subCategory?.category_id)
        }
      })
    }
  }

  form = this.fb.group({
    experience_text: ['', Validators.required],
    price_text: ['', Validators.required],
    phone: ['', Validators.required],
    fullname: ['', Validators.required],
    region_id: ['', Validators.required],
    district_id: ['', Validators.required],
    category_id: ['', Validators.required],
    resume_status: [''],
    username: [''],
    description: [''],
    client_resume_to_category: this.fb.array([], Validators.required),
  })

  onCategoryChange(categoryId: string) {
    const category = this.categories().find((c) => c.id == categoryId)
    if (category) {
      const subCategories = this.subCategories().filter((sc) => sc?.category_id === category.id)
      this.subCategoriesFilter = [...subCategories]
      this.cdr.markForCheck()
    }
  }

  onSubCategorySelect(event: MatSelectChange) {
    const selected = event.value as string[]
    const formArray = this.form.get('client_resume_to_category') as FormArray
    formArray.clear()

    for (const id of selected) {
      formArray.push(this.fb.group({ sub_category_id: [id] }))
    }
  }

  getSelectedSubCategoryIds(): string[] {
    const formArray = this.form.get('client_resume_to_category') as FormArray
    return formArray.controls.map((ctrl) => ctrl.value.sub_category_id)
  }

  submit() {
    if (this.form.valid) {
      const {
        resume_status,
        experience_text,
        price_text,
        phone,
        fullname,
        district_id,
        username,
        client_resume_to_category,
        region_id,
        category_id,
        description,
      } = this.form.value
      const bodyData = {
        resume_status,
        experience_text,
        price_text,
        phone,
        fullname,
        district_id,
        username,
        client_resume_to_category,
      }
      if (this.data.clientResume) {
        this.$service.update(this.data.clientResume.id, bodyData as IClientResume).subscribe({
          next: () => {
            this.dialogRef.close(true)
          },
          error: (err) => {
            console.log(err)
          },
        })
      } else {
        this.$service.create(bodyData as IClientResume).subscribe({
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
    if (this.data.clientResume) {
      this.$service.delete(this.data.clientResume.id).subscribe({
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
