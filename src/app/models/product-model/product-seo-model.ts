import { FileUploadModel } from '../result-model';

export class ProductSeoModel {
    metaTitle: string;
    metaDescription: string;
    metaKeyword: string;
    metaRobotIndex: boolean;
    metaRobotFollow: boolean;
    canonicalURL: string;
    facebookSharingImage: FileUploadModel;
}
