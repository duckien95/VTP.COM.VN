import { FileUploadModel } from '../result-model';

export class ProductImageModel {
    videoUrl: string;
    videoType: string;
    filesModel: FilesModel[];
}

export class FilesModel {
    image: FileUploadModel;
    videoUrl: string;
    type: string;
}
