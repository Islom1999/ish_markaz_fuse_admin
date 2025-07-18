import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  Inject,
} from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ReactiveFormsModule, FormBuilder, FormArray, Validators } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule, MatSelectChange } from '@angular/material/select'
import { SpCategoryService } from '../../sp-category/common/sp-category.service'
import { SpDistrictService } from '../../sp-district/common/sp-district.service'
import { SpRegionService } from '../../sp-region/common/sp-region.service'
import { ISpSubCategory } from '../../sp-sub-category/common/sp-sub-category.model'
import { SpSubCategoryService } from '../../sp-sub-category/common/sp-sub-category.service'
import { PosterStatus, PosterStatusText, IClientPoster } from '../common/client-poster.model'
import { ClientPosterService } from '../common/client-poster.service'

@Component({
  selector: 'app-client-poster-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './client-poster-form.component.html',
  styleUrl: './client-poster-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientPosterFormComponent {
  private $service = inject(ClientPosterService)
  private $serviceRegion = inject(SpRegionService)
  private $serviceDistrict = inject(SpDistrictService)
  private $serviceCategory = inject(SpCategoryService)
  private $serviceSubCategory = inject(SpSubCategoryService)

  cdr = inject(ChangeDetectorRef)
  dialogRef = inject(MatDialogRef<ClientPosterFormComponent>)
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
  posterStatus = Object.values(PosterStatus)
  posterStatusText = PosterStatusText

  constructor(@Inject(MAT_DIALOG_DATA) public data: { ClientPoster?: IClientPoster }) {
    if (this.subCategories().length > 0) {
      this.subCategoriesFilter = [...this.subCategories()]
      this.cdr.markForCheck()
    }

    if (data?.ClientPoster) {
      this.form.patchValue({
        ...data.ClientPoster,
        region_id: data.ClientPoster?.district?.region_id,
      })

      const array = this.form.get('client_poster_to_category') as FormArray
      array.clear()

      if (data?.ClientPoster?.client_poster_to_category?.length) {
        data.ClientPoster.client_poster_to_category.forEach((item) => {
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
        if (data?.ClientPoster?.client_poster_to_category?.[0]) {
          const subCategory = this.subCategories().find(
            (sc) => sc.id == data?.ClientPoster?.client_poster_to_category?.[0].sub_category_id,
          )
          if (subCategory?.category_id)
            this.form.get('category_id')?.patchValue(subCategory?.category_id)
        }
      })
    }
  }

  form = this.fb.group({
    price_text: ['', Validators.required],
    phone: ['', Validators.required],
    fullname: ['', Validators.required],
    region_id: ['', Validators.required],
    district_id: ['', Validators.required],
    category_id: ['', Validators.required],
    description: ['', Validators.required],
    poster_status: [''],
    username: [''],
    client_poster_to_category: this.fb.array([], Validators.required),
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
    const formArray = this.form.get('client_poster_to_category') as FormArray
    formArray.clear()

    for (const id of selected) {
      formArray.push(this.fb.group({ sub_category_id: [id] }))
    }
  }

  getSelectedSubCategoryIds(): string[] {
    const formArray = this.form.get('client_poster_to_category') as FormArray
    return formArray.controls.map((ctrl) => ctrl.value.sub_category_id)
  }

  submit() {
    if (this.form.valid) {
      const {
        description,
        poster_status,
        price_text,
        phone,
        fullname,
        district_id,
        username,
        client_poster_to_category,
        region_id,
        category_id,
      } = this.form.value
      const bodyData = {
        description,
        poster_status,
        price_text,
        phone,
        fullname,
        district_id,
        username,
        client_poster_to_category,
      }
      if (this.data.ClientPoster) {
        this.$service.update(this.data.ClientPoster.id, bodyData as IClientPoster).subscribe({
          next: () => {
            this.dialogRef.close(true)
          },
          error: (err) => {
            console.log(err)
          },
        })
      } else {
        this.$service.create(bodyData as IClientPoster).subscribe({
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
    if (this.data.ClientPoster) {
      this.$service.delete(this.data.ClientPoster.id).subscribe({
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
