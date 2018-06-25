
import { Headers } from '@angular/http';
import { Convert } from './convert';
import { Dictionary } from '../models/dictionary';
import { forEach } from '@angular/router/src/utils/collection';
import { retry } from 'rxjs/operators/retry';

declare var jquery: any;
declare var $: any;
declare var AjaxRequest: any;

export class ConfigSetting {
  public static BASE_URL = 'http://localhost:62009/api/';
  // public static BASE_URL = 'http://local.gico.cms/api/';

  public static Headers: Headers = new Headers({ 'Content-Type': 'application/json' });

  public static CDN_URL = 'http://192.168.1.251:5000';

  public static UrlPathLogin = 'Account/GenerateToken';
  public static UrlPathRegister = 'Account/Register';
  public static UrlPathCheckLogin = 'Account/CheckLogin';

  public static UrlPathShardingInit = 'ShardingConfig/Init';
  public static UrlPathShardingAddOrChange = 'ShardingConfig/AddOrChange';
  public static UrlPathShardingGet = 'ShardingConfig/Get';
  public static UrlPathShardingGets = 'ShardingConfig/Gets';

  public static UrlPathCProductAttributeGets = 'AttrCategory/GetProductAttr';
  public static UrlPathCategoryGets = 'Category/Gets';
  public static UrlPathCategoryGet = 'Category/Get';
  public static UrlPathCategoryGetCategorys = 'Category/GetCategorys';
  public static UrlPathCategoryAddOrChange = 'Category/AddOrChange';
  public static UrlPathCategoryAttrGets = 'Category/GetListAttr';
  public static UrlPathCategoryManufacturerGets = 'Category/GetListManufacturer';
  public static UrlPathAttrCategoryAdd = 'AttrCategory/Add';
  public static UrlPathAttrCategoryChange = 'AttrCategory/Change';
  public static UrlPathAttrCategoryGet = 'AttrCategory/Get';
  public static UrlPathAttrCategoryRemove = 'AttrCategory/Remove';
  public static UrlPathAttributeCategoryByCategoryId = 'AttrCategory/GetAttributeCategoryByCategoryId';

  public static UrlPathVariationThemeAttributeMappingsGet = 'VariationTheme/GetAttributes';
  public static UrlPathGetCategoryVariationThemes = 'VariationTheme/GetCategoryVariationThemes';
  public static UrlPathVariationThemeSearch = 'VariationTheme/Search';
  public static UrlPathVariationThemeAdd = 'VariationTheme/Add';
  public static UrlPathVariationThemeChange = 'VariationTheme/Change';
  public static UrlPathVariationThemeActive = 'VariationTheme/Active';
  public static UrlPathVariationThemeRemove = 'VariationTheme/Remove';
  public static UrlPathVariationThemeAttributeMappingRemove = 'VariationTheme/VariationThemeAttributeMappingRemove';
  public static UrlPathVariationGet = 'VariationTheme/Get';
  public static UrlPathVariationThemeAttributeMappingAddOrChange = 'VariationTheme/VariationThemeAttributeMappingAddOrChange';
  public static UrlPathCategoryVariationThemeMappingAdd = 'VariationTheme/Add';
  public static UrlPathCategoryVariationThemeMappingRemove = 'VariationTheme/Remove';

  public static UrlPathManufacturerRemove = 'ManufacturerCategoryMapping/Remove';
  public static UrlPathManufacturerGets = 'ManufacturerCategoryMapping/Gets';
  public static UrlPathManufacturerAdd = 'ManufacturerCategoryMapping/Add';

  public static UrlPathMenuGets = 'Menu/Gets';
  public static UrlPathMenuGet = 'Menu/Get';
  public static UrlPathMenuAddOrChange = 'Menu/AddOrChange';
  public static UrlPathMenuBannerMappingGet = 'Menu/GetBanners';
  public static UrlPathMenuBannerMappingAdd = 'Menu/AddBanner';
  public static UrlPathMenuBannerMappingRemove = 'Menu/RemoveBanner';
  public static UrlPathMenuPositionGets = 'MenuPosition/Gets';
  public static UrlPathMenuPositionGet = 'MenuPosition/Get';
  public static UrlPathMenuPositionAdd = 'MenuPosition/Add';
  public static UrlPathMenuPositionChange = 'MenuPosition/Change';
  public static UrlPathMenuPositionRemove = 'MenuPosition/Remove';

  public static UrlPathAdminMenuGets = 'AdminMenu/Gets';
  public static UrlPathAdminMenuGet = 'AdminMenu/GetById';
  public static UrlPathAdminMenuAddOrChange = 'AdminMenu/AddOrChange';

  public static UrlPathCustomerSearch = 'Customer/Index';
  public static UrlPathCustomerGet = 'Customer/Get';
  public static UrlPathCustomerAddOrChange = 'Customer/AddOrChange';
  public static UrlPathCustomerAutocomplete = 'Customer/AutoComplete';

  public static UrlPathDepartmentSearch = 'Role/Index';
  public static UrlPathDepartmentGet = 'Role/DepartmentGet';
  public static UrlPathDepartmentAdd = 'Role/DepartmentAdd';
  public static UrlPathDepartmentChange = 'Role/DepartmentChange';
  public static UrlPathRoleSearch = 'Role/RoleSearch';
  public static UrlPathRoleAdd = 'Role/RoleAdd';
  public static UrlPathRoleChange = 'Role/RoleChange';
  public static UrlPathActionDefineSearch = 'Role/ActionDefineSearch';
  public static UrlPathPermissionChangeByRole = 'Role/PermissionChangeByRole';
  public static UrlPathPermissionPermissionGet = 'Role/PermissionGet';

  public static UrlPathLanguageSearch = 'Language/Index';
  public static UrlPathLanguageAdd = 'Language/Add';
  public static UrlPathLanguageChange = 'Language/Change';

  public static UrlPathFileUpload = 'File/Index';

  public static UrlPathLocation = 'Location/Index';
  public static UrlPathGetDictrictByProvinceId = 'Location/Districs';
  public static UrlPathGetDistrcisByProvinceIds = 'Location/GetDistrcisByProvinceIds';
  public static UrlPathGetWardByDictrictId = 'Location/Ward';
  public static UrlPathGetStreetByWardId = 'Location/Street';
  public static UrlPathGetProvinceById = 'Location/GetProvinceById';
  public static UrlPathGetDistrictById = 'Location/GetDistrictById';
  public static UrlPathGetWardById = 'Location/GetWardById';
  public static UrlPathGetStreetById = 'Location/GetStreetById';
  public static UrlPathProvinceAddOrUpdate = 'Location/ProvinceAddOrUpdate';
  public static UrlPathDistrictAdd = 'Location/DistrictAdd';
  public static UrlPathDistrictUpdate = 'Location/DistrictUpdate';
  public static UrlPathWardAdd = 'Location/WardAdd';
  public static UrlPathWardUpdate = 'Location/WardUpdate';
  public static UrlPathStreetUpdate = 'Location/StreetUpdate';
  public static UrlPathLocationDelete = 'Location/Delete';
  public static UrlPathStreetSearch = 'Location/GetAllStreet';
  public static UrlPathStreetAdd = 'Location/StreetAdd';
  public static UrlPathStreetAddByWardId = 'Location/StreetAddByWardId';
  public static UrlPathWardStreetDelete = 'Location/WardStreetDelete';
  public static UrlPathLocationDistrictAutocomplete = 'Location/DistrictAutocomplete';
  public static UrlPathLocationWardAutocomplete = 'Location/WardAutocomplete';

  public static UrlPathConfigSearch = 'Config/Index';
  public static UrlPathConfigGetByKey = 'Config/GetConfigByKey';
  public static UrlPathConfigAdd = 'Config/Add';
  public static UrlPathConfigUpdate = 'Config/Update';
  public static UrlPathConfigDelete = 'Config/Delete';

  public static UrlPathBinlocationTypeGets = 'BinLocationType/Gets';
  public static UrlPathBinLocationTypeGetById = 'BinLocationType/GetById';
  public static UrlPathBinLocationTypeAdd = 'BinLocationType/Add';
  public static UrlPathBinLocationTypeUpdate = 'BinLocationType/Update';
  public static UrlPathBinLocationTypeChangeStatus = 'BinLocationType/ChangeStatus';

  public static UrlPathCommissionSearch = 'Commission/Index';
  public static UrlPathCommissionGetById = 'Commission/GetCommissionById';
  public static UrlPathCommissionAdd = 'Commission/Add';
  public static UrlPathCommissionUpdate = 'Commission/Update';
  public static UrlPathCommissionChangeStatus = 'Commission/ChangeStatus';
  public static UrlPathCommissionGetCategoryEnableByVendorId = 'Commission/GetCommissionAndCategoryEnable';

  public static UrlPathLocaleSearch = 'LocaleStringResource/Index';
  public static UrlPathCustoUrlPathLocaleGet = 'LocaleStringResource/Get';
  public static UrlPathLocaleAdd = 'LocaleStringResource/Add';
  public static UrlPathLocaleChange = 'LocaleStringResource/Change';

  public static UrlPathMeasureSearch = 'MeasureUnit/Index';
  public static UrlPathMeasureAdd = 'MeasureUnit/Add';
  public static UrlPathMeasureChange = 'MeasureUnit/Change';

  public static UrlPathEmailOrSmsSearch = 'EmailOrSms/Index';
  public static UrlPathEmailOrSmsGetDetail = 'EmailOrSms/GetDetail';
  public static UrlPathEmailOrSmsGetVerifyDetail = 'EmailOrSms/GetVerifyDetail';

  public static UrlPathGetVendors = 'Vendor/GetVendors';
  public static UrlPathVendorSearch = 'Vendor/Index';
  public static UrlPathVendorGet = 'Vendor/Get';
  public static UrlPathVendorAdd = 'Vendor/Add';
  public static UrlPathVendorChange = 'Vendor/Change';
  public static UrlPathVendorAutoComplete = 'Vendor/AutoComplete';
  public static UrlPathVendorAndCommissionAdd = 'Vendor/CommissionAdd';

  public static UrlPathDistanceGeocoding = 'Distance/Geocoding';

  public static UrlPathGetWarehouses = 'Warehouse/GetWarehouses';
  public static UrlPathWarehouseSearch = 'Warehouse/Index';
  public static UrlPathWarehouseGet = 'Warehouse/Get';
  public static UrlPathWarehouseChange = 'Warehouse/Change';
  public static UrlPathWarehouseRemove = 'Warehouse/Remove';
  public static UrlPathWarehouseAdd = 'Warehouse/Add';
  public static UrlPathWarehouseAutocomplete = 'Warehouse/AutoComplete';
  public static UrlPathWarehouseSearchByVendor = 'Warehouse/WarehouseSearch';
  public static UrlPathWarehouseGetByMutipleId = 'Warehouse/GetByMutipleId';
  public static UrlPathWarehouseVendorInventoryInit = 'Warehouse/WarehouseVendorInventoryInit';
  public static UrlPathWarehouseVendorInventorySearch = 'Warehouse/WarehouseVendorInventorySearch';
  public static UrlPathWarehouseVendorInventoryGetById = 'Warehouse/WarehouseVendorInventoryGetById';
  public static UrlPathWarehouseVendorInventoryAddProduct = 'Warehouse/WarehouseVendorInventoryAddProduct';
  public static UrlPathWarehouseVendorInventoryChange = 'Warehouse/WarehouseVendorInventoryChange';

  public static UrlPathProductGetConfigs = 'Product/GetConfigs';
  public static UrlPathProductSearch = 'Product/Search';
  public static UrlPathProductGetProductById = 'Product/GetProductById';
  public static UrlPathProductGetWarehouseInventoryProductInfo = 'Product/GetWarehouseInventoryProductInfo';
  public static UrlPathProductAdd = 'Product/Add';
  public static UrlPathProductChange = 'Product/Change';
  public static UrlPathProductAutoComplete = 'Product/AutoComplete';
  public static UrlPathProductAutoCompleteByWarehouseInventory = 'Product/AutoCompleteByWarehouseInventory';
  public static UrlPathProductAutoCompleteByVendor = 'Product/AutoCompleteByVendor';
  public static UrlPathProductCheckDuplicate = 'Product/CheckDuplicate';
  public static UrlPathProductGetProductToChange = 'Product/GetProductToChange';
  public static UrlPathProductCategoryMappingGetByCategoryId = 'Product/ProductCategoryMappingGetByCategoryId';
  public static UrlPathProductVendorMappingAdd = 'Product/VendorProductMappingAdd';
  public static UrlPathProductVendorMappingUpdate = 'Product/VendorProductMappingUpdate';
  public static UrlPathProductVendorMappingChangeStatus = 'Product/VendorProductMappingChangeStatus';

  public static UrlPathProductAttributeSearch = 'ProductAttribute/Search';
  public static UrlPathProductAttributeGet = 'ProductAttribute/Get';
  public static UrlPathProductAttributeAddOrUpdate = 'ProductAttribute/AddOrUpdate';
  public static UrlPathProductAttributeDelete = 'ProductAttribute/Delete';

  public static UrlPathGetRegionsTypes = 'RegionsType/GetRegionsTypes';
  public static UrlPathRegionsTypeSearch = 'RegionsType/Search';
  public static UrlPathRegionsTypeGetById = 'RegionsType/GetById';
  public static UrlPathRegionsTypeAddOrUpdate = 'RegionsType/AddOrUpdate';

  public static UrlPathConfigRegionsGetAll = 'RegionsType/ConfigRegionsGetAll';
  public static UrlPathConfigRegionsAddOrUpdate = 'RegionsType/ConfigRegionsAddOrUpdate';

  public static UrlPathProductAttributeValueSearch = 'ProductAttribute/SearchProductAttributeValue';
  public static UrlPathProductAttributeValueGet = 'ProductAttribute/GetProductAttributeValue';
  public static UrlPathProductAttributeValueAddOrUpdate = 'ProductAttribute/AddOrUpdateProductAttributeValue';
  public static UrlPathProductAttributeValueDelete = 'ProductAttribute/DeleteProductAttributeValue';

  public static UrlPathGetManufacturers = 'Manufacturer/GetManufacturers';
  public static UrlPathTestSearch = 'Manufacturer/Get';
  public static UrlPathTestSearchById = 'Manufacturer/GetById';
  public static UrlPathTestAddOrChange = 'Manufacturer/AddOrChange';
  public static UrlPathManufacturerManagementAddOrChange = 'Manufacturer/AddOrChange';


  //#region Template
  // POST URL
  public static UrlPathTemplateSearch = 'Template/Search';
  public static UrlPathTemplateGet = 'Template/Get';
  public static UrlPathTemplateAdd = 'Template/Add';
  public static UrlPathTemplateChange = 'Template/Change';
  public static UrlPathTemplateRemove = 'Template/Remove';

  public static UrlPathTemplateConfigSearch = 'TemplateConfig/Search';
  public static UrlPathTemplateConfigGet = 'TemplateConfig/Get';
  public static UrlPathTemplateConfigAdd = 'TemplateConfig/Add';
  public static UrlPathTemplateConfigChange = 'TemplateConfig/Change';
  public static UrlPathTemplateConfigCheckCodeExist = 'TemplateConfig/CheckCodeExist';
  public static UrlPathTemplateConfigRemove = 'TemplateConfig/Remove';

  public static UrlPathBannerSearch = 'Banner/Search';
  public static UrlPathBannerGet = 'Banner/Get';
  public static UrlPathBannerAdd = 'Banner/Add';
  public static UrlPathBannerChange = 'Banner/Change';
  public static UrlPathBannerRemove = 'Banner/Remove';

  public static UrlPathBannerItemSearch = 'BannerItem/Search';
  public static UrlPathBannerItemGet = 'BannerItem/Get';
  public static UrlPathBannerItemAdd = 'BannerItem/Add';
  public static UrlPathBannerItemChange = 'BannerItem/Change';
  public static UrlPathBannerItemRemove = 'BannerItem/Remove';
  // Redirect URL
  public static UrlTemplateDetail = 'Template/Search';

  public static UrlProductGroupGets = 'ProductGroup/Gets';
  public static UrlProductGroupGet = 'ProductGroup/Get';
  public static UrlProductGroupAdd = 'ProductGroup/Add';
  public static UrlProductGroupChange = 'ProductGroup/Change';
  public static UrlProductGroupGetCategories = 'ProductGroup/GetCategories';
  public static UrlProductGroupChangeCategories = 'ProductGroup/ChangeCategories';
  public static UrlProductGroupGetVendors = 'ProductGroup/GetVendors';
  public static UrlProductGroupGetVendorsConfig = 'ProductGroup/GetVendorsConfig';
  public static UrlProductGroupAddVendor = 'ProductGroup/AddVendor';
  public static UrlProductGroupRemoveVendor = 'ProductGroup/RemoveVendor';
  public static UrlProductGroupGetAttributesConfig = 'ProductGroup/GetAttributesConfig';
  public static UrlProductGroupGetAttributeConfig = 'ProductGroup/GetAttributeConfig';
  public static UrlProductGroupAddAttributes = 'ProductGroup/AddAttributes';
  public static UrlProductGroupChangeAttributes = 'ProductGroup/ChangeAttributes';
  public static UrlProductGroupRemoveAttributes = 'ProductGroup/RemoveAttributes';
  public static UrlProductGroupGetAttributes = 'ProductGroup/GetAttributes';
  public static UrlProductGroupGetAttributeValues = 'ProductGroup/GetAttributeValues';
  public static UrlProductGroupGetPriceConfig = 'ProductGroup/GetPriceConfig';
  public static UrlProductGroupChangePriceConfig = 'ProductGroup/ChangePriceConfig';
  public static UrlProductGroupGetQuantityConfig = 'ProductGroup/GetQuantityConfig';
  public static UrlProductGroupChangeQuantityConfig = 'ProductGroup/ChangeQuantityConfig';

  public static UrlProductGroupGetManufacturers = 'ProductGroup/GetManufacturers';
  public static UrlProductGroupGetManufacturersConfig = 'ProductGroup/GetManufacturersConfig';
  public static UrlProductGroupAddManufacturer = 'ProductGroup/AddManufacturer';
  public static UrlProductGroupRemoveManufacturer = 'ProductGroup/RemoveManufacturer';

  public static UrlProductGroupGetWarehouses = 'ProductGroup/GetWarehouses';
  public static UrlProductGroupGetWarehousesConfig = 'ProductGroup/GetWarehousesConfig';
  public static UrlProductGroupAddWarehouse = 'ProductGroup/AddWarehouse';
  public static UrlProductGroupRemoveWarehouse = 'ProductGroup/RemoveWarehouse';

  public static UrlProductGroupGetProducts = 'ProductGroup/GetProducts';
  public static UrlProductGroupGetProductsConfig = 'ProductGroup/GetProductsConfig';
  public static UrlProductGroupAddProduct = 'ProductGroup/AddProduct';
  public static UrlProductGroupRemoveProduct = 'ProductGroup/RemoveProduct';

  public static UrlTemplateDefineGets = 'TemplateDefine/Gets';
  public static UrlTemplateDefineGet = 'TemplateDefine/Get';
  public static UrlTemplateDefineAdd = 'TemplateDefine/Add';
  public static UrlTemplateDefineChange = 'TemplateDefine/Change';
  public static UrlTemplateDefineChangeHtml = 'TemplateDefine/ChangeHtml';
  public static UrlTemplateDefineRemove = 'TemplateDefine/Remove';

  public static UrlWarehouseInventoryGets = 'WarehouseInventory/Gets';
  public static UrlWarehouseInventoryGet = 'WarehouseInventory/Get';
  public static UrlWarehouseInventoryAdd = 'WarehouseInventory/Add';
  public static UrlWarehouseInventoryChange = 'WarehouseInventory/Change';
  public static UrlWarehouseInventoryAddProduct = 'WarehouseInventory/AddProduct';
  public static UrlWarehouseInventoryChangeProduct = 'WarehouseInventory/ChangeProduct';
  public static UrlWarehouseInventoryGetWarehouseInventoryDetails = 'WarehouseInventory/GetWarehouseInventoryDetails';
  public static UrlWarehouseInventoryGetWarehouseInventoryDetail = 'WarehouseInventory/GetWarehouseInventoryDetail';
  public static UrlWarehouseInventorySaleConfirm = 'WarehouseInventory/SaleConfirm';
  public static UrlWarehouseInventorySaleCancel = 'WarehouseInventory/SaleCancel';
  public static UrlWarehouseInventoryAccounting = 'WarehouseInventory/Accounting';
  public static UrlWarehouseInventoryCancel = 'WarehouseInventory/Cancel';
  public static UrlWarehouseInventoryApply = 'WarehouseInventory/Apply';
  public static UrlWarehouseInventoryPriceGetByDetailId = 'WarehouseInventory/GetWarehouseInventoryPriceByDetailId';
  public static UrlWarehouseInventoryPriceAddOrChange = 'WarehouseInventory/WarehouseInventoryPriceAddOrChange';
  public static UrlWarehouseInventoryDetailGetTotalQuantity = 'WarehouseInventory/WarehouseInventoryDetailGetTotalQuantity';

  public static UrlWarehouseVendorAddProduct = 'WarehouseVendor/AddProduct';
  public static UrlWarehouseVendorGetByWarehouseId = 'WarehouseVendor/Gets';

  //#endregion

  public static LoginExpiretime = 30;

  private static LocalStorageAuthenKey = 'LocalStorageAuthenKey';

  public static LoginStatus = 'LoginStatus';
  public static HomePage = '/g/admin-menu';
  public static LoginPage = '/login';
  public static CustomerDetailPage = '/g/DetailCustomer/';
  public static TemplatesPage = '/g/template';
  public static EmailSmsDetailPage = '/g/DetailEmailSms/';
  public static EmailSmsVerifyDetailPage = '/g/VerifyDetailEmailSms/';
  public static WarehouseInventoryChangePage = '/g/warehouse-inventory/change/';

  public static CreateUrl(absolutePath: string): string {
    return `${ConfigSetting.BASE_URL}${absolutePath}`;
  }

  public static set SetAuthenToken(token: string) {
    localStorage.setItem(this.LocalStorageAuthenKey, token);
  }
  public static get GetAuthenToken(): string {
    return localStorage.getItem(this.LocalStorageAuthenKey);
  }

  public static SetLoginStatus(authenToken: string, isAdministrator: boolean, actionIds: Dictionary<boolean>): void {
    const currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() + ConfigSetting.LoginExpiretime);
    const loginObject = {
      status: true,
      loginTime: currentDate.getTime(),
      isAdministrator: isAdministrator,
      actionIds: actionIds
    };
    const tmp = JSON.stringify(loginObject);
    localStorage.setItem(this.LoginStatus, tmp);
    ConfigSetting.SetAuthenToken = authenToken;
  }
  public static GetLoginStatus(): boolean {
    const tmp = localStorage.getItem(this.LoginStatus);
    if (tmp == null) {
      return false;
    }
    const loginObject = JSON.parse(tmp);
    if (loginObject == null || loginObject === undefined) {
      return false;
    }
    if (loginObject.status) {
      try {
        const currentDate = new Date();
        if (loginObject.loginTime < currentDate.getTime()) {
          return false;
        }
      } catch (ex) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }
  public static CheckPermission(actionIds: string[]): Dictionary<boolean> {
    const tmp = localStorage.getItem(this.LoginStatus);
    if (tmp == null) {
      return null;
    }
    const loginObject = JSON.parse(tmp);
    if (loginObject == null || loginObject === undefined) {
      return null;
    }
    if (loginObject.status) {
      try {
        const currentDate = new Date();
        if (loginObject.loginTime < currentDate.getTime()) {
          return null;
        }
        const permissions = new Dictionary<boolean>();
        if (loginObject.isAdministrator) {
          for (let i = 0; i < actionIds.length; i++) {
            permissions.Add(actionIds[i], true);
          }
          return permissions;
        }
        if (loginObject.actionIds == null || loginObject.actionIds === undefined || loginObject.actionIds.length <= 0) {
          return permissions;
        }
        for (let i = 0; i < actionIds.length; i++) {
          const isPermission = loginObject.actionIds.Item(actionIds[i]);
          permissions.Add(actionIds[i], isPermission === true);
        }
      } catch (ex) {
        return null;
      }
      return null;
    } else {
      return null;
    }
  }

  public static Logout() {
    localStorage.removeItem(this.LoginStatus);
    localStorage.removeItem(this.LocalStorageAuthenKey);
  }
  public static ShowWaiting() {
    $.notify({
      message: 'Please wait'
    }, {
        type: 'danger'
      });
  }
  public static ShowError(message: string) {
    console.log(message);
    $.notify({
      message: message
    }, {
        type: 'danger'
      });
  }
  public static ShowErrores(messages: string[]) {
    console.log(messages);
    const message: string = messages.join();
    $.notify({
      message: message
    }, {
        type: 'danger'
      });
  }
  public static ShowErrorException(error: any) {
    const message = 'Lỗi không xác định';
    ConfigSetting.ShowError(message + ': ' + error.message);
    throw error;
  }

  public static ShowSuccess(message: string) {
    $.notify({
      message: message
    }, {
        type: 'success'
      });
  }
  public static Select2AjaxRegister(selector: string, urlPath: string, parametersFun: any, $this, placeholder: string,
    processResults: any,
    formatRepo: any,
    formatRepoSelection: any,
    selectEvent: any,
    unSelectEvent: any = null,
    minimumInputLength: number = 0,
    delay: number = 250,
    allowClear: boolean = false,
    dropdownParent: any = null
  ) {
    const url = ConfigSetting.CreateUrl(urlPath);
    const select2 = $(selector).select2({
      ajax: {
        url: url,
        dataType: 'json',
        delay: delay,
        data: function (result) {
          const params = parametersFun(result, $this);
          return params;
        },
        transport: function (params, success, failure) {
          params.beforeSend = function (request) {
            const token: string = ConfigSetting.GetAuthenToken;
            request.setRequestHeader('Authorization', `Bearer ${token}`);
          };
          const $request = $.ajax(params);
          $request.then(success);
          $request.fail(failure);
          return $request;
        },
        processResults: processResults,
        cache: true,
      },
      escapeMarkup: function (markup) { return markup; },
      placeholder: placeholder,
      minimumInputLength: minimumInputLength,
      templateResult: formatRepo,
      templateSelection: formatRepoSelection,
      allowClear: allowClear,
      dropdownParent: dropdownParent
    });
    select2.on('select2:select', function (e) {
      selectEvent(e, $this);
    });

    if (unSelectEvent !== undefined && unSelectEvent != null) {
      select2.on('select2:unselect', function (e) {
        unSelectEvent(e, $this);
      });
    }
  }
}
