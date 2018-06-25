import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
// import { WarehouseVendorModel, WarehouseVendorResponseModel } from '../../../models/warehouse/warehouse-vendor-model';
// import { WarehouseVendorService } from '../../../services/warehouse-vendor.service';
// import { WarehouseVendorComponent } from './warehouse-vendor.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { WarehouseService } from '../../../services/warehouse.service';
import { WarehouseModel } from '../../../models/warehouse/warehouse-model';
import { VendorModel } from '../../../models/vendor-model/vendor-model';
import { WarehouseVendorInventoryAddProductComponent } from './warehouse-vendor-inventory-add-product.component';
import { Jsonp } from '@angular/http';
import { KeyValueModel } from '../../../models/result-model';
import { WarehouseProductMappingModel } from '../../../models/warehouse/warehouse-product-mapping-model';
import { Dictionary } from '../../../models/dictionary';
import { forEach } from '@angular/router/src/utils/collection';
declare var App: any;
declare var $: any;

@Component({
  selector: 'app-warehouse-vendor-inventory',
  templateUrl: './warehouse-vendor-inventory.component.html'
})
export class WarehouseVendorInventoryComponent implements OnInit {
  @ViewChild(WarehouseVendorInventoryAddProductComponent) warehouseVendorInventoryAddProduct: WarehouseVendorInventoryAddProductComponent;
  warehouseIds: string[] = [];
  warehouses: WarehouseModel[];
  vendorId = '';
  vendor: VendorModel;
  manufacturerId: string;
  minQuantity = 0;
  maxQuantity = 1000000;
  productId: string;
  onGetsStatus: boolean;
  onSearchProductInventoryStatus: boolean;
  pageIndex = 0;
  pageSize = 30;
  totalRow = 0;
  onGetProductVendorInventoryStatus: boolean;
  warehouseVendorInventories: WarehouseProductMappingModel[];
  warehouseVendorInventoriesIsChange: Dictionary<boolean>;
  onSaveChangeStatus: boolean;
  constructor(
    private route: ActivatedRoute,
    private warehouseService: WarehouseService
  ) {
    this.route.params.subscribe(params => {
      const id: string = params.id;
      this.warehouseIds.push(id);
    });
  }

  async ngOnInit() {
    await this.onGetWarehouses();
    setTimeout(() => {
      App.blockUI();
      this.onRegisterVendorSelect2();
      this.onRegisterWarehouseSelect2();
      this.onRegisterManufacturerSelect2();
      this.onRegisterProductSelect2();
      this.onSearchProductVendorInventory();
      App.unblockUI();
    }, 100);
  }

  async onGetWarehouses(): Promise<void> {
    if (this.onGetsStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onGetsStatus = true;
      App.blockUI();
      const response = await this.warehouseService.getWarehouseVendorInventoryInit(this.warehouseIds);
      if (response.status) {
        this.warehouses = response.warehouses;
        this.vendor = response.vendor;
        this.vendorId = this.vendor.id;
        $('#categories').jstree({
          'core': {
            'data': response.categories
          },
          'plugins': ['checkbox', 'sort']
        });
      } else {
        this.warehouses = [];
        ConfigSetting.ShowErrores(response.messages);
      }
      if (response.status === false) {
        ConfigSetting.ShowErrores(response.messages);
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      this.onGetsStatus = false;
      App.unblockUI();
    }
  }
  async onSearchProductVendorInventory(): Promise<void> {
    if (this.onSearchProductInventoryStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      const categoryIds = $('#categories').jstree('get_selected');
      this.onSearchProductInventoryStatus = true;
      App.blockUI();
      const response = await this.warehouseService.searchProductVendorInventory(
        this.vendorId, this.warehouseIds, this.manufacturerId, this.minQuantity, this.maxQuantity,
        categoryIds, this.productId, 0, this.pageIndex
      );
      if (response.status) {
        this.warehouseVendorInventories = response.warehouseVendorInventories;
        this.pageIndex = response.pageIndex;
        this.pageSize = response.pageSize;
        this.totalRow = response.totalRow;
        this.warehouseVendorInventoriesIsChange = new Dictionary<boolean>();
        this.warehouseVendorInventories.forEach(element => {
          this.warehouseVendorInventoriesIsChange.Add(element.id, false);
        });
      } else {
        this.warehouses = [];
        ConfigSetting.ShowErrores(response.messages);
      }
      if (response.status === false) {
        ConfigSetting.ShowErrores(response.messages);
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      this.onSearchProductInventoryStatus = false;
      App.unblockUI();
    }
  }
  async onShowAddNewProduct(): Promise<void> {
    const warehousesSelected = $('#warehouseId').select2('data');
    const warehouses: KeyValueModel[] = [];
    warehousesSelected.forEach(element => {
      const item: KeyValueModel = {
        text: element.text,
        value: element.id,
        checked: true
      };
      warehouses.push(item);
    });
    const vendorSelected = $('#vendorId').select2('data');
    const vendor: KeyValueModel = {
      text: vendorSelected[0].text,
      value: vendorSelected[0].id,
      checked: true
    };
    const productSelected = $('#productId').select2('data');
    const product = new KeyValueModel();
    if (productSelected.length > 0) {
      product.text = productSelected[0].text;
      product.value = productSelected[0].id;
    }
    this.warehouseVendorInventoryAddProduct.onInit(warehouses, vendor, product);

  }
  async onIsChange(id: string): Promise<void> {
    this.warehouseVendorInventoriesIsChange.Change(id, true);
  }
  async onIsChangeCancel(warehouseProductMappingModel: WarehouseProductMappingModel): Promise<void> {
    await this.onGetProductVendorInventory(warehouseProductMappingModel.vendorId, warehouseProductMappingModel.warehouseId, warehouseProductMappingModel.productId);
    this.warehouseVendorInventoriesIsChange.Change(warehouseProductMappingModel.id, false);
  }
  async onGetProductVendorInventory(vendorId: string, warehouseId: string, productId: string): Promise<void> {
    if (this.onGetProductVendorInventoryStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onGetProductVendorInventoryStatus = true;
      App.blockUI();
      const response = await this.warehouseService.getProductVendorInventory(
        vendorId, warehouseId, productId
      );
      if (response.status) {
        const warehouseVendorInventory = response.warehouseVendorInventory;
        for (let i = 0; i < this.warehouseVendorInventories.length; i++) {
          const item = this.warehouseVendorInventories[i];
          if (item.vendorId === vendorId && item.productId === productId && item.warehouseId === warehouseId) {
            this.warehouseVendorInventories[i] = warehouseVendorInventory;
            break;
          }

        }
      } else {
        this.warehouses = [];
        ConfigSetting.ShowErrores(response.messages);
      }
      if (response.status === false) {
        ConfigSetting.ShowErrores(response.messages);
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      this.onGetProductVendorInventoryStatus = false;
      App.unblockUI();
    }
  }
  async onSaveChange(warehouseProductMappingModel: WarehouseProductMappingModel): Promise<void> {
    if (this.onSaveChangeStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    this.onSaveChangeStatus = true;
    App.blockUI();
    try {
      const response = await this.warehouseService.changeProductVendorInventory(
        warehouseProductMappingModel.vendorId,
        warehouseProductMappingModel.warehouseId,
        warehouseProductMappingModel.productId,
        warehouseProductMappingModel.quantity,
        warehouseProductMappingModel.sellPrice,
        warehouseProductMappingModel.safetyStock,
        warehouseProductMappingModel.version
      );
      if (response.status) {
        ConfigSetting.ShowSuccess('Save sucess.');
        this.onIsChangeCancel(warehouseProductMappingModel);
      } else {
        ConfigSetting.ShowErrores(response.messages);
      }

    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      App.unblockUI();
      this.onSaveChangeStatus = false;
    }
  }

  async onRegisterVendorSelect2(): Promise<void> {
    const $this = this;
    try {
      ConfigSetting.Select2AjaxRegister(
        '#vendorId',
        ConfigSetting.UrlPathVendorAutoComplete,
        this.createParametersFun,
        $this,
        'Search Vendor',
        this.processResults,
        this.formatRepo,
        this.formatRepoSelection,
        this.selectVendorEvent
      );
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  async onRegisterWarehouseSelect2(): Promise<void> {
    const $this = this;
    try {
      ConfigSetting.Select2AjaxRegister(
        '#warehouseId',
        ConfigSetting.UrlPathWarehouseAutocomplete,
        this.createParametersFunWarehouse,
        $this,
        'Search warehouse',
        this.warehouseProcessResults,
        this.formatRepo,
        this.formatRepoSelection,
        this.selectWarehouseEvent,
        this.unSelectWarehouseEvent
      );
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  async onRegisterManufacturerSelect2(): Promise<void> {
    const $this = this;
    try {
      ConfigSetting.Select2AjaxRegister(
        '#manufacturerId',
        ConfigSetting.UrlPathGetManufacturers,
        this.createParametersFunManufacturers,
        $this,
        'Lựa chọn thương hiệu',
        this.processResultsManufacturers,
        this.formatRepo,
        this.formatRepoSelection,
        this.manufacturerSelectEvent,
        this.manufacturerUnSelectEvent, 0, 250, true
      );
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }

  }
  async onRegisterProductSelect2(): Promise<void> {
    const $this = this;
    try {
      ConfigSetting.Select2AjaxRegister(
        '#productId',
        ConfigSetting.UrlPathProductAutoCompleteByVendor,
        this.createParametersProduct,
        $this,
        'Chọn sản phẩm',
        this.processResultsProduct,
        this.formatRepo,
        this.formatRepoSelection,
        this.selectComponentEventProduct, this.unSelectProductEvent, 0, 250, true
      );
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  createParametersFun(params, $this) {
    const query = {
      keyword: params.term
    };
    return query;
  }
  createParametersFunWarehouse(params, $this) {
    const query = {
      keyword: params.term,
      vendorId: $this.vendorId
    };
    return query;
  }
  createParametersFunManufacturers(params, $this) {
    if (params.term === undefined) { params.term = ''; }
    const query = {
      name: params.term
    };
    return query;
  }
  createParametersProduct(params, $this) {
    if (params.term === undefined) { params.term = ''; }
    const query = {
      keyword: params.term,
      vendorId: $this.vendorId
    };
    return query;
  }
  formatRepo(repo) {
    return repo.text;
  }
  formatRepoSelection(repo) {
    return repo.text;
  }
  processResults(data, params) {
    return {
      results: data.vendors
    };
  }
  warehouseProcessResults(data, params) {
    return {
      results: data.warehouses
    };
  }
  processResultsManufacturers(data, params) {
    return {
      results: data
    };
  }
  selectVendorEvent(e, $this) {
    const id = e.params.data.id;
    $this.vendorId = id;
    $this.warehouseIds = [];
    $this.productId = '';
    $('#warehouseId').empty().trigger('change');
    $('#productId').empty().trigger('change');
  }
  selectWarehouseEvent(e, $this) {
    const id = e.params.data.id;
    $this.warehouseIds.push(id);
  }
  manufacturerSelectEvent(e, $this) {
    const id = e.params.data.id;
    $this.manufacturerId = id;
  }
  unSelectWarehouseEvent(e, $this) {
    const id = e.params.data.id;
    const index = $this.warehouseIds.indexOf(id);
    if (index > -1) {
      $this.warehouseIds.splice(index, 1);
    }
  }
  manufacturerUnSelectEvent(e, $this) {
    $this.manufacturerId = '';
  }
  processResultsProduct(data, params) {
    return {
      results: data.products
    };
  }
  selectComponentEventProduct(e, $this) {
    const id = e.params.data.id;
    $this.productId = id;
  }
  unSelectProductEvent(e, $this) {
    const id = e.params.data.id;
    $this.productId = '';
  }
}
