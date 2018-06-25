import { Component, OnInit, Input } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { FileService } from '../../services/file.service';
import { FileUploadResponseModel } from '../../models/file-upload-response-model';
import { FileUploadModel } from '../../models/result-model';

@Component({
  selector: 'app-multiple-file-upload',
  templateUrl: './multiple-file-upload.component.html',
  styleUrls: ['./multiple-file-upload.component.css']
})
export class MultipleFileUploadComponent implements OnInit {
  @Input() maxFiles = 100;

  errors: Array<string> = [];
  uploadedFiles: FileUploadModel[] = [];
  showDefaultContent = true;

  constructor(
    private fileService: FileService
  ) { }

  ngOnInit() {
  }

  onSelect(event, form) {
    this.showDefaultContent = event.files.length <= 0;
  }

  onRemove(event, form) {
    this.showDefaultContent = form.files.length <= 1;
  }

  async onUpload(event, form) {
    for (const file of event.files) {
      if (this.uploadedFiles.length < this.maxFiles) {
        const formData: FormData = new FormData();
        formData.append('file', file);
        const response = await this.fileService.upload(formData);
        const responseObject = JSON.parse(response) as FileUploadResponseModel;
        if (responseObject.status) {
          const item = new FileUploadModel();
          item.fullUrl = responseObject.fullUrl;
          item.name = responseObject.name;
          item.path = responseObject.path;
          item.size = file.size;
          item.imagePath = responseObject.path + '/' + responseObject.name;
          this.uploadedFiles.push(item);
        } else {
          for (let i = 0; i < responseObject.messages.length; i++) {
            this.errors.push(responseObject.messages[i]);
          }
        }
      } else {
        this.errors.push('Error: At a time you can upload only ' + this.maxFiles + ' files');
      }
    }
    form.clear();
    this.showDefaultContent = true;
  }
}
