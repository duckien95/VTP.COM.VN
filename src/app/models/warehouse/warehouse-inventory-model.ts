export class WarehouseInventoryModel {
    id: string;
    code: string;
    name: string;
    type: number;
    vendorId: string;
    description: string;
    saleUserId: string;
    senderUserId: string;
    status: number;
    warehouseId: string;
    version: number;
    items: WarehouseInventoryDetailModel[];
    isOutOfStock: boolean;
    outOfStockType: number;
    outOfStockTypeDescription: string;
    isSaleConfirmButton: boolean;
    isSaleCancelButton: boolean;
    isCancelButton: boolean;
    isApplyButton: boolean;
    isAccountingButton: boolean;
}
export class WarehouseInventoryDetailModel {
    id: string;
    warehouseInventoryId: string;
    productId: string;
    quantity: number;
    outDate: string;
    description: string;
    weight: number;
    length: number;
    width: number;
    height: number;
    productStatus: number;
    imeis: string[];
    productCode: string;
    productName: string;
    productStatusName: string;
    serialRequired: boolean;
}

export class WarehouseInvertoryPriceModel {
    warehouseInventoryDetailId: string;
    price: number;
    originPrice: number;
    quantity: number;
}
