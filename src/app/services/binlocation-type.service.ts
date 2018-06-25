import { Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { ConfigSetting } from '../common/configSetting';
import { BinLocationTypeRequest, BinLocationTypeModel } from '../models/binlocation-type-model';

@Injectable()
export class BinLocationTypeService {

  constructor(private httpClient: HttpClientService) { }

  async gets(request: BinLocationTypeRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBinlocationTypeGets, request);
    const result = response.json() as any;
    return result;
  }

  async getById(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBinLocationTypeGetById, request);
    const result = response.json() as any;
    return result;
  }

  async Add(request: BinLocationTypeModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBinLocationTypeAdd, request);
    const result = response.json() as any;
    return result;
  }

  async Update(request: BinLocationTypeModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBinLocationTypeUpdate, request);
    const result = response.json() as any;
    return result;
  }

  async Delete(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathBinLocationTypeChangeStatus, request);
    const result = response.json() as any;
    return result;
  }
}
