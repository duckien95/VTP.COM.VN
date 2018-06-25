import { Injectable } from '@angular/core';
import { ConfigSetting } from '../common/configSetting';
import { HttpClientService } from '../common/http-client.service';
import { DistanceGeocodingRequest } from '../models/distance/distance-geocoding-request';

@Injectable()
export class DistanceService {

  constructor(private httpClient: HttpClientService) { }

  async geocoding(request: DistanceGeocodingRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathDistanceGeocoding, request);
    const result = response.json() as any;
    return result;
  }
}
