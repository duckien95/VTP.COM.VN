import { Injectable } from '@angular/core';
import { ConfigSetting } from '../common/configSetting';
import { HttpClientService } from '../common/http-client.service';
import { CustomerSearchRequest } from '../models/customer-search-request';
import { CustomerAddOrChangeModel } from '../models/customer-add-or-change-model';

@Injectable()
export class CustomerService {

  constructor(private httpClient: HttpClientService) { }

    async search(request: CustomerSearchRequest): Promise<any> {
      const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCustomerSearch, request);
      const result = response.json() as any;
      return result;
    }
    async get(id: string): Promise<any> {
      const request = {
        id
      };
      const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCustomerGet, request);
      const result = response.json() as any;
      return result;
    }
    async save(customer: CustomerAddOrChangeModel): Promise<any> {
      const request = customer;
      const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCustomerAddOrChange, request);
      const result = response.json() as any;
      return result;
    }
}
