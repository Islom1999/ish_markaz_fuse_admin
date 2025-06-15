import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { BaseService } from 'app/core/services/base.service';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

export interface IFileList {
  id: string
  file_title: string
  folder_name: string
  file_name: string
  is_active: boolean
  version_id: string
  created_at: string
  updated_at: string
}


@Component({
  selector: 'app-serftificat',
  imports: [RouterLink, MatIconModule, MatTooltipModule, NgIf, RouterLink, NgxDocViewerModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './serftificat.component.html',
  styleUrl: './serftificat.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SerftificatComponent implements OnInit {
  baseService = inject(BaseService)
  route = inject(ActivatedRoute)

  id: string = ''
  fileUrl: string = `${this.baseService.apiBaseUrl}/file-list/watch/`
  file: IFileList = {} as IFileList

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.fileUrl = `${this.baseService.apiBaseUrl}/file-list/watch/${this.id}`;
      // this.baseService.get(`file-list/${this.id}`).subscribe((response: IFileList) => { this.file = response })
    }

  }

  get fileType(): string {
    const extension = this.fileUrl.split('.').pop()?.toLowerCase();
    return extension || '';
  }

  get fileExtension(): string {
    if (!this.file.file_name) return '';
    return this.file.file_name.split('.').pop()?.toLowerCase() || '';
  }

  downloadFile(): void {
    const link = document.createElement('a');
    link.href = this.fileUrl;
    link.download = this.file.file_name;
    link.target = '_blank';
    link.click();
  }
}
