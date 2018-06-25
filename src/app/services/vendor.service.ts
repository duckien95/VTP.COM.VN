import { Injectable } from '@angular/core';
import { ConfigSetting } from '../common/configSetting';
import { HttpClientService } from '../common/http-client.service';
import { VendorSearchRequest } from '../models/vendor-model/vendor-search-request';
import { VendorAddOrChangeModel } from '../models/vendor-model/vendor-add-or-change-model';
import { CommissionResponse } from '../models/commission-request-model';

@Injectable()
export class VendorService {

  constructor(private httpClient: HttpClientService) { }
  async search(request: VendorSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathVendorSearch, request);
    const result = response.json() as any;
    return result;
  }
  async get(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathVendorGet, request);
    const result = response.json() as any;
    return result;
  }
  async save(vendor: VendorAddOrChangeModel): Promise<any> {
    const request = vendor;
    let url = '';
    if (vendor.id !== undefined && vendor.id != null && vendor.id !== '') {
      url = ConfigSetting.UrlPathVendorChange;
    } else {
      url = ConfigSetting.UrlPathVendorAdd;
    }
    const response = await this.httpClient.postJsonWithAuthen(url, request);
    const result = response.json() as any;
    return result;
  }
  // async autocomplete(keyword: string): Promise<any> {
  //   const request = {
  //     keyword
  //   };
  //   const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathVendorAutoComplete, request);
  //   const result = response.json() as any;
  //   return result;
  // }
  async commissionAdd(commissions: any): Promise<any> {
    const request = {
      commissions
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathVendorAndCommissionAdd, request);
    const result = response.json() as any;
    return result;
  }
}
