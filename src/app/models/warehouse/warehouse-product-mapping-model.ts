export class WarehouseProductMappingModel {
    id: string;
    vendorId: string;
    vendorProductId: string;
    productId: string;
    baseProductId: number;
    warehouseId: string;
    quantity: number;
    sellPrice: number;
    status: number;
    safetyStock: number;
    startDateTimeUtc: string;
    endDateTimeUtc: number;
    qtyReserved: string;
    statusName: string;
    version: number;
}
