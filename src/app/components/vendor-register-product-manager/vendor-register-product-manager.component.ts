import { CommissionService } from './../../services/commission.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigSetting } from '../../common/configSetting';
import { CommissionRequest } from '../../models/commission-request-model';
import { VendorCategoryRegisterComponent } from './vendor-category-register/vendor-category-register.component';
import { VendorProductRegisterComponent } from './vendor-product-register/vendor-product-register.component';

declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-vendor-register-product-manager',
  templateUrl: './vendor-register-product-manager.component.html',
  styleUrls: ['./vendor-register-product-manager.component.css']
})
export class VendorRegisterProductManagerComponent implements OnInit {
  @ViewChild(VendorCategoryRegisterComponent) vendorCategoryRegister: VendorCategoryRegisterComponent;
  @ViewChild(VendorProductRegisterComponent) vendorProductRegister: VendorProductRegisterComponent;
  vendorId: number;
  isSearch: boolean;
  constructor(
    private commissionService: CommissionService
  ) { }

  ngOnInit() {
    this.onRegisterVedorSearch();
  }

  async onSearch() {
    if (this.isSearch) {
      if (this.vendorCategoryRegister === undefined) {
        this.vendorProductRegister.ngInitData();
      } else {
        this.vendorCategoryRegister.onSearchComission();
      }
    }
    this.isSearch = true;
  }

  //#region select2 vendorSearch
  async onRegisterVedorSearch(): Promise<void> {
    const $this = this;
    try {
      ConfigSetting.Select2AjaxRegister(
        '#vendorSearch',
        ConfigSetting.UrlPathGetVendors,
        this.createParametersFunVendorSearch,
        $this,
        'Lựa chọn nhà cung cấp',
        this.processResultsVendorSearch,
        this.formatRepoVendorSearch,
        this.formatRepoSelectionVendorSearch,
        this.selectComponentEventVendorSearch,
        this.unSelectComponentEventVendorSearch,
        0,
        300,
        false
      );
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  createParametersFunVendorSearch(params, $this) {
    if (params.term === undefined) { params.term = ''; }
    const query = {
      name: params.term
    };
    return query;
  }
  formatRepoVendorSearch(repo) {
    if (repo.loading) { return repo.text; }
    return repo.text;
  }
  formatRepoSelectionVendorSearch(repo) {
    return repo.text;
  }
  processResultsVendorSearch(data, params) {
    return {
      results: data
    };
  }
  selectComponentEventVendorSearch(e, $this) {
    const id = e.params.data.id;
    $this.vendorId = id;
  }
  unSelectComponentEventVendorSearch(e, $this) {
    const id = e.params.data.id;
    $this.vendorId = null;
  }
  //#endregion

}
