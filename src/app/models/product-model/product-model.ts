import { ProductContentModel } from './product-content-model';
import { ProductAttributeInfoModel } from './product-attribute-info-model';
import { ProductAttributeLogisticModel } from './product-attribute-logistic-model';
import { ProductVariantModel } from './product-variant-model';
import { ProductImageModel } from './product-image-model';
import { ProductSeoModel } from './product-seo-model';
import { ProductCategoryModel } from './product-category-model';
import { KeyValueModel } from '../result-model';

export class ProductModel {
    id: string;
    version: number;
    productContent: ProductContentModel;
    productAttributeInfo: ProductAttributeInfoModel;
    productAttributeLogistic: ProductAttributeLogisticModel;
    productVariantModel: ProductVariantModel;
    productImageModel: ProductImageModel;
    productSeoModel: ProductSeoModel;
    productCategoryModel: ProductCategoryModel;
    productConfigs: ProductConfigs;
    isInitData: boolean;
}

export class ProductConfigs {
    measureUnits: string;
    productType: KeyValueModel[];
    productMediaType: KeyValueModel[];
}
