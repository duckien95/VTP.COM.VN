import { ResultModel, KeyValueModel, BaseModel } from './result-model';

export class AdminMenuManagerModel {
    types: KeyValueModel[];
    positions: KeyValueModel[];
    parents: AdminMenuModel[];
    menus: AdminMenuModel[];
    menu: AdminMenuModel;
}

export class AdminMenuModel extends BaseModel {
    parentId: string;
    name: string;
    type: number;
    objectId: string;
    url: string;
    condition: string;
    positionId: number;
    isPublish: boolean;
    priority: number;
}
