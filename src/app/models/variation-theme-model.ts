import { ProductAttributeModel } from './product-attr-model';

export class VariationThemeModel {
    variationThemeId: string;
    variationThemeName: string;
    isUsed: boolean;
    status: number;
    statusName: string;
}

export class VariationThemeAttributeMappingModel {
    variationThemeId: string;
    variationThemeName: string;
    attributeId: string;
    attributeName: string;
    status: number;
    statusName: string;
    attributeType: number;
    attributeTypeName: string;
    baseUnitId: string;
    baseUnitName: string;
}

export class CategoryVariationThemeAddRequest {
    variationThemeId: number[];
    categoryId: string;
}

export class CategoryVariationThemeMapping {
    variationThemeId: number;
    categoryId: string;
    variationThemeName: string;
}
export class AttributeModel {
    attributeId: number;
    attributeName: string;
}

