import { KeyValueModel } from '../result-model';

export class ProductCategoryModel {
    mainCategory: string;
    mainCategoryId: string;
    subCategories: KeyValueModel[];
}

export class VendorProductMappingModel {
    id: string;
    vendorId: string;
    productId: string;
    categoryId: string;
    vendorSku: string;
    vat: string;
    vatEx: string;
    barcode: string;
    productName: string;
    productCode: string;
    urlImage: string;
    productCreatDate: string;
    statusName: string;
}
