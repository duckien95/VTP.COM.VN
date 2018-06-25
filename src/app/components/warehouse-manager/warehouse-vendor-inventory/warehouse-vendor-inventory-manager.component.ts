import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '../../../services/warehouse.service';
import { WarehouseSearchRequest } from '../../../models/warehouse/warehouse-search-request';
import { ConfigSetting } from '../../../common/configSetting';
import { WarehouseModel } from '../../../models/warehouse/warehouse-model';
import { KeyValueModel } from '../../../models/result-model';
declare var App: any;
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-warehouse-vendor-inventory-manager',
  templateUrl: './warehouse-vendor-inventory-manager.component.html'
})
export class WarehouseVendorInventoryMangerComponent implements OnInit {
  vendorId: string;
  warehouseKeyword: string;
  status = 0;
  type = 0;
  statuses: KeyValueModel[];
  types: KeyValueModel[];
  warehouses: WarehouseModel[];
  pageIndex = 1;
  pageSize: number;
  totalRow: number;
  onGetsStatus: boolean;
  constructor(
    private warehouseService: WarehouseService,
  ) { }

  ngOnInit() {
    this.onRegisterVendorSelect2();
    this.onGets();
  }

  async onGets(): Promise<void> {
    if (this.onGetsStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onGetsStatus = true;
      App.blockUI();
      const response = await this.warehouseService.searchByVendor(this.vendorId, this.warehouseKeyword, this.status, this.type, this.pageIndex - 1);
      if (response.status) {
        this.warehouses = response.warehouses;
        this.statuses = response.statuses;
        this.types = response.types;
        this.pageIndex = response.pageIndex + 1;
        this.pageSize = response.pageSize;
        this.totalRow = response.totalRow;
      } else {
        this.warehouses = [];
        this.pageIndex = 0;
        this.pageSize = 0;
        this.totalRow = 0;
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
  async onRegisterVendorSelect2(): Promise<void> {
    const $this = this;
    try {
      ConfigSetting.Select2AjaxRegister(
        '#vendor',
        ConfigSetting.UrlPathVendorAutoComplete,
        this.createParametersFun,
        $this,
        'Search Vendor',
        this.processResults,
        this.formatRepo,
        this.formatRepoSelection,
        this.selectComponentEvent,
        this.unSelectComponentEvent, 0, 250, true,
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
  selectComponentEvent(e, $this) {
    const id = e.params.data.id;
    $this.vendorId = id;
  }
  unSelectComponentEvent(e, $this) {
    $this.vendorId = '';
  }
  pageChanged(page: number) {
    this.pageIndex = page;
    this.onGets();
  }
}
