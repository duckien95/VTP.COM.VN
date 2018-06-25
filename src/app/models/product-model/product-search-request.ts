export class ProductSearchRequest {
    searchTerm: string;
    listCategoryId: number[];
    warehouseId: number[];
    merchantId: number[];
    manufactureIds: number[];
    status: number;
    createdDateRange: DateTimeRange;
    isVisible: number;
    productItemType: number;
    instock: boolean;
    productId: number;
    isBaseProduct: boolean;
    includeVariation: boolean;
    pageIndex: number;
    pageSize: number;
}

export class DateTimeRange {
    FromDate: Date;
    ToDate: Date;
}
