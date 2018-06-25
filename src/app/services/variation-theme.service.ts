import { Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { ConfigSetting } from '../common/configSetting';
import { VariationThemeModel, CategoryVariationThemeAddRequest, VariationThemeAttributeMappingModel } from '../models/variation-theme-model';
import { VariationThemeSearchRequest } from '../models/variationtheme/VariationThemeSearchRequest';
@Injectable()
export class VariationThemeService {

  constructor(private httpClient: HttpClientService) { }

  async getVariationThemeAttributeMappingsByVariationThemeId(variationThemeId: string): Promise<any> {
    const request = {
      variationThemeId: variationThemeId
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathVariationThemeAttributeMappingsGet, request);
    const result = response.json() as any;
    return result;
  }

  async search(request: VariationThemeSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathVariationThemeSearch, request);
    const result = response.json() as any;
    return result;
  }

  async add(category_VariationTheme: CategoryVariationThemeAddRequest): Promise<any> {
    const request = {
      category_VariationTheme_Mapping: category_VariationTheme
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCategoryVariationThemeMappingAdd, request);
    const result = response.json() as any;
    return result;
  }

  // async remove(categoryId: string, variationThemeId: number): Promise<any> {
  //   const request = {
  //     categoryId: categoryId,
  //     variationThemeId: variationThemeId
  //   };
  //   const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCategoryVariationThemeMappingRemove, request);
  //   const result = response.json() as any;
  //   return result;
  // }

  async getById(id: string) {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathVariationGet, request);
    const result = response.json() as any;
    return result;
  }

  async removeVariationThemeAttributeMapping(model: VariationThemeAttributeMappingModel) {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathVariationThemeAttributeMappingRemove, model);
    const result = response.json() as any;
    return result;
  }

  async onSave(model: VariationThemeModel) {
    const request = {
      model: model
    };
    let url = ConfigSetting.UrlPathVariationThemeAdd;
    if (model.variationThemeId != null && model.variationThemeId !== undefined && model.variationThemeId.length > 0) {
      url = ConfigSetting.UrlPathVariationThemeChange;
    }
    const response = await this.httpClient.postJsonWithAuthen(url, request);
    const result = response.json() as any;
    return result;
  }

  async saveVariationThemeAttributeMapping(modelOld: VariationThemeAttributeMappingModel, model: VariationThemeAttributeMappingModel) {
    let request;
    if (modelOld != null && modelOld !== undefined) {
      request = {
        variationThemeIdOld: modelOld.variationThemeId,
        attributeIdOld: modelOld.attributeId,
        attributeTypeOld: modelOld.attributeType,
        baseUnitIdOld: modelOld.baseUnitId,
        variationThemeId: model.variationThemeId,
        attributeId: model.attributeId,
        attributeType: model.attributeType,
        baseUnitId: model.baseUnitId
      };
    } else {
      request = {
        variationThemeId: model.variationThemeId,
        attributeId: model.attributeId,
        attributeType: model.attributeType,
        baseUnitId: model.baseUnitId
      };
    }

    const url = ConfigSetting.UrlPathVariationThemeAttributeMappingAddOrChange;
    const response = await this.httpClient.postJsonWithAuthen(url, request);
    const result = response.json() as any;
    return result;
  }

  async active(id): Promise<any> {
    const request = {
      VariationThemeId: id
    };
    const url = ConfigSetting.UrlPathVariationThemeActive;
    const response = await this.httpClient.postJsonWithAuthen(url, request);
    const result = response.json() as any;
    return result;
  }
  async remove(id): Promise<any> {
    const request = {
      VariationThemeId: id
    };
    const url = ConfigSetting.UrlPathVariationThemeRemove;
    const response = await this.httpClient.postJsonWithAuthen(url, request);
    const result = response.json() as any;
    return result;
  }
}
