export class RegionsTypeItemModel {
    id: string;
    name: string;
    note: string;
    status: number;
    standardDeliveryFee: number;
    fastDeliveryFee: number;
    price: RegionsTypeRangeModel;
    km: RegionsTypeRangeModel;
    kg: RegionsTypeRangeModel;
    formulas: RegionsTypeFormulaModel[];
}

export class RegionsTypeFormulaModel {
    formula: string;
    typeId: number;
    typeName: string;
    x1: string;
    x2: string;
    x3: string;
    x4: string;
    status: boolean;
}

export class RegionsTypeRangeModel {
    from: number;
    to: number;
}
