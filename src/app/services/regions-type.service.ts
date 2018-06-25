import { Injectable } from '@angular/core';
import { ConfigSetting } from '../common/configSetting';
import { HttpClientService } from '../common/http-client.service';
import { RegionsTypeSearchRequest } from '../models/regions-type/regions-type-search-request';
import { RegionsTypeAddOrUpdateRequest } from '../models/regions-type/regions-type-add-or-update-request';
import { ConfigRegionsModel } from '../models/regions-type/config-regions-model';

@Injectable()
export class RegionsTypeService {

  constructor(private httpClient: HttpClientService) { }

  async search(request: RegionsTypeSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathRegionsTypeSearch, request);
    const result = response.json() as any;
    return result;
  }

  async getById(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathRegionsTypeGetById, request);
    const result = response.json() as any;
    return result;
  }

  async addOrUpdate(request: RegionsTypeAddOrUpdateRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathRegionsTypeAddOrUpdate, request);
    const result = response.json() as any;
    return result;
  }

  async configRegionsGetAll(): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathConfigRegionsGetAll, null);
    const result = response.json() as any;
    return result;
  }

  async configRegionsAddOrUpdate(request: ConfigRegionsModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathConfigRegionsAddOrUpdate, request);
    const result = response.json() as any;
    return result;
  }
}
