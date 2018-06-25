export class ProductAttributeInfoModel {
    attributes: any;
    attributeInfo: ProductAttributeInfo[];
}

export class ProductAttributeInfo {
    attributeId: number;
    attributeType: number;
    attributeName: string;
    attributeValueName: string;
    value: string;
    unitName: string;
    unitId: string;
}
