export class CommissionRequest {
    id: string;
    vendorId: string;
    categoryId: string;
}

export class CommissionResponse {
    id: string;
    vendorId: string;
    categoryId: string;
    commission: string;
    categoryName: string;
    status: number;
    isShowStopSellButton: boolean;
    isShowRegisterButton: boolean;
    isShowActiveButton: boolean;
}

