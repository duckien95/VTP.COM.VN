export class WarehouseVendorModel {
    id: string;
    productId: string;
    vendorId: string;
    warehouseId: string;
    quantity: number;
    sellPrice: string;
    safetyStock: number;
    startDateTimeUtc: string;
}

export class WarehouseVendorResponseModel {
    id: string;
    productName: string;
    productCode: string;
    quantity: number;
    safetyStock: number;
    sellPrice: string;
    startDateTimeUtc: Date;
    updatedDateUtc: Date;
}
