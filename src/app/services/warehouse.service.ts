import { Injectable } from '@angular/core';
import { ConfigSetting } from '../common/configSetting';
import { HttpClientService } from '../common/http-client.service';
import { WarehouseSearchRequest } from '../models/warehouse/warehouse-search-request';
import { WarehouseAddOrChangeModel } from '../models/warehouse/warehouse-add-or-change-model';

@Injectable()
export class WarehouseService {

  constructor(private httpClient: HttpClientService) { }

  async getWarehouses(request: WarehouseSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathGetWarehouses, request);
    const result = response.json() as any;
    return result;
  }

  async search(request: WarehouseSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathWarehouseSearch, request);
    const result = response.json() as any;
    return result;
  }

  async get(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathWarehouseGet, request);
    const result = response.json() as any;
    return result;
  }

  async gets(ids: string[]): Promise<any> {
    const request = {
      ids
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathWarehouseGetByMutipleId, request);
    const result = response.json() as any;
    return result;
  }

  async getWarehouseVendorInventoryInit(ids: string[]): Promise<any> {
    const request = {
      ids
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathWarehouseVendorInventoryInit, request);
    const result = response.json() as any;
    return result;
  }

  async change(warehouse: WarehouseAddOrChangeModel): Promise<any> {
    const request = {
      warehouse
    };

    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathWarehouseChange, request);
    const result = response.json() as any;
    return result;
  }

  async add(warehouse: WarehouseAddOrChangeModel): Promise<any> {
    const request = {
      warehouse
    };

    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathWarehouseAdd, request);
    const result = response.json() as any;
    return result;
  }

  async remove(id: string): Promise<any> {
    const request = {
      id: id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathWarehouseRemove, request);
    const result = response.json() as any;
    return result;
  }

  async searchByVendor(vendorId: string, warehouseKeyword: string, status: number, type: number, pageIndex: number): Promise<any> {
    const request = {
      vendorId,
      Keyword: warehouseKeyword,
      status,
      type,
      pageIndex,
      PageSize: 30
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathWarehouseSearchByVendor, request);
    const result = response.json() as any;
    return result;
  }

  async searchProductVendorInventory(vendorId: string, warehouseIds: string[], manufacturerId: string,
    minQuantity: number, maxQuantity: number, categoryIds: string[], productId: string, status: number, pageIndex: number): Promise<any> {
    const request = {
      vendorId,
      warehouseIds,
      manufacturerId,
      minQuantity,
      maxQuantity,
      categoryIds,
      productId,
      status,
      pageIndex,
      PageSize: 30
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathWarehouseVendorInventorySearch, request);
    const result = response.json() as any;
    return result;
  }

  async getProductVendorInventory(vendorId: string, warehouseId: string, productId: string): Promise<any> {
    const request = {
      vendorId,
      warehouseId,
      productId
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathWarehouseVendorInventoryGetById, request);
    const result = response.json() as any;
    return result;
  }

  async addProductVendorInventory(productId: string, quantity: number, safetyStock: number,
    sellPrice: number, startDateTimeUtc: string, endDateTimeUtc: string, vendorId: string,
    warehouseIds: string[], isSelectAllWarehouFromVendor: boolean): Promise<any> {
    const request = {
      productId,
      quantity,
      safetyStock,
      sellPrice,
      startDateTimeUtc,
      endDateTimeUtc,
      vendorId,
      warehouseIds,
      isSelectAllWarehouFromVendor
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathWarehouseVendorInventoryAddProduct, request);
    const result = response.json() as any;
    return result;
  }

  async changeProductVendorInventory(vendorId: string, warehouseId: string, productId: string, quantity: number,
    sellPrice: number, safetyStock: number,
    version: number): Promise<any> {
    const request = {
      vendorId,
      warehouseId,
      productId,
      quantity,
      sellPrice,
      safetyStock,
      version,
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathWarehouseVendorInventoryChange, request);
    const result = response.json() as any;
    return result;
  }
}
