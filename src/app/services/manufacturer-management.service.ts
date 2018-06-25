import { Injectable } from '@angular/core';
import { ManufacturerGetRequest } from '../models/manufacturer-management-model';
import { ConfigSetting } from '../common/configSetting';
import { HttpClientService } from '../common/http-client.service';

@Injectable()
export class ManufacturerManagementService {

  constructor(private httpClient: HttpClientService) { }
  async getManufacturers(request: ManufacturerGetRequest): Promise<any> {

    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathTestSearch, request);
    const result = response.json() as any;
    return result;
  }

  async getManufacturerById(id: string): Promise<any> {
    const request = new ManufacturerGetRequest();
    request.id = id;
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathTestSearchById, request);
    const result = response.json() as any;
    return result;
  }

  async save(request: ManufacturerGetRequest): Promise<any> {
    const url = ConfigSetting.UrlPathManufacturerManagementAddOrChange;
    const response = await this.httpClient.postJsonWithAuthen(url, request);
    const result = response.json() as any;
    return result;
  }
}
