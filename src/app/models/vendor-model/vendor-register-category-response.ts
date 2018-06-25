import { CommissionResponse } from '../commission-request-model';

export class VendorRegisterCategoryRequest {
    commissions: CommissionResponse[];
    categoryIds: string[];
}

