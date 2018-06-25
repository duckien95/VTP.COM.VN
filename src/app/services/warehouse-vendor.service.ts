// import { WarehouseVendorModel } from './../models/warehouse/warehouse-vendor-model';
// import { Injectable } from '@angular/core';
// import { ConfigSetting } from '../common/configSetting';
// import { HttpClientService } from '../common/http-client.service';
// import { WarehouseInventoryDetailModel } from '../models/warehouse/warehouse-inventory-model';

// @Injectable()
// export class WarehouseVendorService {

//     constructor(private httpClient: HttpClientService) { }

//     async add(request: WarehouseVendorModel): Promise<any> {
//         const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlWarehouseVendorAddProduct, request);
//         const result = response.json() as any;
//         return result;
//     }

//     async getByWarehouseId(id: string): Promise<any> {
//         const request = {
//             warehouseId: id
//         };
//         const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlWarehouseVendorGetByWarehouseId, request);
//         const result = response.json() as any;
//         return result;
//     }
// }
