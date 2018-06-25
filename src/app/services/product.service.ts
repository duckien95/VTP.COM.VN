import { VendorProductMappingModel } from './../models/product-model/product-category-model';
import { Injectable } from '@angular/core';
import { ConfigSetting } from '../common/configSetting';
import { HttpClientService } from '../common/http-client.service';
import { ProductModel } from './../models/product-model/product-model';
import { ProductSearchRequest } from '../models/product-model/product-search-request';

@Injectable()
export class ProductService {

  constructor(private httpClient: HttpClientService) { }

  async getConfigs(): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathProductGetConfigs, null);
    const result = response.json() as any;
    return result;
  }

  async search(request: ProductSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathProductSearch, request);
    const result = response.json() as any;
    return result;
  }

  async getProductById(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathProductGetProductById, request);
    const result = response.json() as any;
    return result;
  }

  async GetWarehouseInventoryProductInfo(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathProductGetWarehouseInventoryProductInfo, request);
    const result = response.json() as any;
    return result;
  }

  async add(request: ProductModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathProductAdd, request);
    const result = response.json() as any;
    return result;
  }

  async change(request: ProductModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathProductChange, request);
    const result = response.json() as any;
    return result;
  }

  async checkImeiDuplicate(vendorId: string, warehouseId: string, productId: string, imei: string): Promise<any> {
    const request = {
      vendorId,
      warehouseId,
      productId,
      imei
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathProductCheckDuplicate, request);
    const result = response.json() as any;
    return result;
  }

  async getProductToChange(id: string, categoryId: string): Promise<any> {
    const request = {
      id, categoryId
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathProductGetProductToChange, request);
    const result = response.json() as any;
    return result;
  }

  async productCategoryMappingGetByCategoryId(categoryIds: string[], vendorId: string, isRegister: boolean, productId: string): Promise<any> {
    const request = {
      categoryIds,
      vendorId,
      isRegister,
      productId
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathProductCategoryMappingGetByCategoryId, request);
    const result = response.json() as any;
    return result;
  }

  async vendorProductMappingAdd(request: VendorProductMappingModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathProductVendorMappingAdd, request);
    const result = response.json() as any;
    return result;
  }

  async vendorProductMappingUpdate(request: VendorProductMappingModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathProductVendorMappingUpdate, request);
    const result = response.json() as any;
    return result;
  }

  async vendorProductMappingChangeStatus(id: string, productId: string, vendorId: string, status: number): Promise<any> {
    const request = {
      id,
      productId,
      vendorId,
      status
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathProductVendorMappingChangeStatus, request);
    const result = response.json() as any;
    return result;
  }
}
