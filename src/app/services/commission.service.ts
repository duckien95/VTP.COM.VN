import { CommissionAddOrUpdateRequest } from './../models/commission-add-or-update-request-model';
import { CommissionRequest } from './../models/commission-request-model';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { ConfigSetting } from '../common/configSetting';

@Injectable()
export class CommissionService {

  constructor(private httpClient: HttpClientService) { }

  async Search(request: CommissionRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCommissionSearch, request);
    const result = response.json() as any;
    return result;
  }

  async GetCommissionByKey(request: CommissionRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCommissionGetById, request);
    const result = response.json() as any;
    return result;
  }

  async Add(request: CommissionAddOrUpdateRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCommissionAdd, request);
    const result = response.json() as any;
    return result;
  }

  async Update(request: CommissionAddOrUpdateRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCommissionUpdate, request);
    const result = response.json() as any;
    return result;
  }

  async ChangeStatus(id: string, changeStatusType: number): Promise<any> {
    const request = {
      id, changeStatusType
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCommissionChangeStatus, request);
    const result = response.json() as any;
    return result;
  }

  async GetCategoryEnable(vendorId: string): Promise<any> {
    const request = {
      vendorId
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCommissionGetCategoryEnableByVendorId, request);
    const result = response.json() as any;
    return result;
  }
}
