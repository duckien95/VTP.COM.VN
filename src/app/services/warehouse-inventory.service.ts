import { Injectable } from '@angular/core';
import { ConfigSetting } from '../common/configSetting';
import { HttpClientService } from '../common/http-client.service';
import { WarehouseInventoryDetailModel } from '../models/warehouse/warehouse-inventory-model';

@Injectable()
export class WarehouseInventoryService {

    constructor(private httpClient: HttpClientService) { }
    async gets(keyword: string, type: number, vendorId: string, saleUserId: string, status: number, warehouseId: string, pageIndex: number): Promise<any> {
        const request = {
            keyword,
            type,
            vendorId,
            saleUserId,
            status,
            warehouseId,
            pageIndex,
            pageSize: 30
        };
        const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlWarehouseInventoryGets, request);
        const result = response.json() as any;
        return result;
    }

    async get(id: string): Promise<any> {
        const request = {
            id
        };
        const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlWarehouseInventoryGet, request);
        const result = response.json() as any;
        return result;
    }
    async add(name: string, type: number, vendorId: string, warehouseId: string, saleUserId: string,
        senderUserId: string, description: string, isOutOfStock: boolean, outOfStockType: number, outOfStockTypeDescription: string): Promise<any> {
        const request = {
            name, type, vendorId, warehouseId, saleUserId, senderUserId, description, isOutOfStock, outOfStockType, outOfStockTypeDescription
        };
        const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlWarehouseInventoryAdd, request);
        const result = response.json() as any;
        return result;
    }
    async change(id: string, version: number, name: string, type: number, vendorId: string, warehouseId: string,
        saleUserId: string, senderUserId: string, description: string, outOfStockType: number, outOfStockTypeDescription: string): Promise<any> {
        const request = {
            id, version, name, type, vendorId, warehouseId, saleUserId, senderUserId, description, outOfStockType, outOfStockTypeDescription
        };
        const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlWarehouseInventoryChange, request);
        const result = response.json() as any;
        return result;
    }
    async remove(id: string, version: number): Promise<any> {
        const request = {
            id, version
        };
        const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlWarehouseInventoryChange, request);
        const result = response.json() as any;
        return result;
    }
    async addProduct(model: WarehouseInventoryDetailModel, warehouseInventoryId: string, version: number): Promise<any> {
        const request = {
            productId: model.productId,
            length: model.length,
            height: model.height,
            width: model.width,
            weight: model.weight,
            productStatus: model.productStatus,
            outDate: model.outDate,
            quantity: model.quantity,
            imeis: model.imeis,
            description: model.description,
            warehouseInventoryId: warehouseInventoryId,
            version: version
        };
        const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlWarehouseInventoryAddProduct, request);
        const result = response.json() as any;
        return result;
    }
    async changeProduct(model: WarehouseInventoryDetailModel, warehouseInventoryId: string, version: number): Promise<any> {
        const request = {
            productId: model.productId,
            length: model.length,
            height: model.height,
            width: model.width,
            weight: model.weight,
            productStatus: model.productStatus,
            outDate: model.outDate,
            quantity: model.quantity,
            imeis: model.imeis,
            description: model.description,
            warehouseInventoryId: warehouseInventoryId,
            version: version,
            id: model.id
        };
        const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlWarehouseInventoryChangeProduct, request);
        const result = response.json() as any;
        return result;
    }
    async getWarehouseInventoryDetails(warehouseInventoryId: string, productId: string, productStatus: number, pageIndex: number, pageSize: number): Promise<any> {
        const request = {
            warehouseInventoryId,
            productId,
            productStatus,
            pageIndex,
            pageSize
        };
        const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlWarehouseInventoryGetWarehouseInventoryDetails, request);
        const result = response.json() as any;
        return result;
    }

    async getWarehouseInventoryDetail(id: string): Promise<any> {
        const request = {
            id
        };
        const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlWarehouseInventoryGetWarehouseInventoryDetail, request);
        const result = response.json() as any;
        return result;
    }

    async saleConfirm(id: string, version: number): Promise<any> {
        const request = {
            id, version
        };
        const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlWarehouseInventorySaleConfirm, request);
        const result = response.json() as any;
        return result;
    }

    async saleCancel(id: string, version: number): Promise<any> {
        const request = {
            id, version
        };
        const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlWarehouseInventorySaleCancel, request);
        const result = response.json() as any;
        return result;
    }

    async accounting(id: string, version: number): Promise<any> {
        const request = {
            id, version
        };
        const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlWarehouseInventoryAccounting, request);
        const result = response.json() as any;
        return result;
    }

    async cancel(id: string, version: number): Promise<any> {
        const request = {
            id, version
        };
        const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlWarehouseInventoryCancel, request);
        const result = response.json() as any;
        return result;
    }

    async apply(id: string, version: number): Promise<any> {
        const request = {
            id, version
        };
        const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlWarehouseInventoryApply, request);
        const result = response.json() as any;
        return result;
    }

    async warehouseInventoryPriceGetByDetailId(warehouseInventoryDetailId: string): Promise<any> {
        const request = {
            warehouseInventoryDetailId
        };
        const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlWarehouseInventoryPriceGetByDetailId, request);
        const result = response.json() as any;
        return result;
    }

    async warehouseInventoryPriceAdd(warehouseInventoryId: string, warehouseInventoryDetailId: string, version: number, warehouseInventoryPrices: any): Promise<any> {
        const request = {
            warehouseInventoryId,
            warehouseInventoryDetailId,
            version,
            Items: warehouseInventoryPrices
        };
        const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlWarehouseInventoryPriceAddOrChange, request);
        const result = response.json() as any;
        return result;
    }

    async warehouseInventoryDetailGetTotalQuantity(vendorId: string, warehouseId: string, productId: string): Promise<any> {
        const request = {
            vendorId,
            warehouseId,
            productId,        };
        const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlWarehouseInventoryDetailGetTotalQuantity, request);
        const result = response.json() as any;
        return result;
    }
}
