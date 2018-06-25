import { Injectable } from '@angular/core';
import { ConfigSetting } from '../common/configSetting';
import { HttpClientService } from '../common/http-client.service';
import { MenuModel } from '../models/menu-manager-model';
import { AdminMenuModel } from '../models/admin-menu-model';
@Injectable()
export class AdminMenuService {

  constructor(private httpClient: HttpClientService) { }

  async gets(positionId: number): Promise<any> {
    const request = {
      positionId
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathAdminMenuGets, request);
    const result = response.json() as any;
    return result;
  }

  async get(id: string, positionId: number): Promise<any> {
    const request = {
      id,
      positionId
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathAdminMenuGet, request);
    const result = response.json() as any;
    return result;
  }

  async addOrChange(model: AdminMenuModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathAdminMenuAddOrChange, model);
    const result = response.json() as any;
    return result;
  }
}
