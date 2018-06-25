import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { WarehouseService } from '../../../services/warehouse.service';
import { WarehouseModel } from '../../../models/warehouse/warehouse-model';
import { VendorModel } from '../../../models/vendor-model/vendor-model';
import { KeyValueModel } from '../../../models/result-model';

declare var App: any;
declare var $: any;

@Component({
    selector: 'app-warehouse-vendor-inventory-add-product',
    templateUrl: './warehouse-vendor-inventory-add-product.component.html'
})
export class WarehouseVendorInventoryAddProductComponent implements OnInit {
    warehouseIds: string[] = [];
    vendorId: string;
    productId: string;
    warehousesSelected: KeyValueModel[];
    vendorSelected: KeyValueModel;
    productSelected: KeyValueModel;
    quantity = 0;
    safetyStock = 0;
    sellPrice = 0;
    startDateTimeUtc: string;
    endDateTimeUtc: string;
    onSaveProductStatus: boolean;
    isShowAddNew: boolean;
    isSelectAllWarehouFromVendor: boolean;
    constructor(
        private warehouseService: WarehouseService
    ) { }

    async ngOnInit() {

    }

    onInit(warehousesSelected: KeyValueModel[], vendorSelected: KeyValueModel, productSelected: KeyValueModel) {
        this.isShowAddNew = true;
        this.warehousesSelected = warehousesSelected;
        this.vendorSelected = vendorSelected;
        this.productSelected = productSelected;
        this.productId = this.productSelected.value;
        this.vendorId = this.vendorSelected.value;
        this.warehouseIds = [];
        for (let i = 0; i < warehousesSelected.length; i++) {
            this.warehouseIds.push(warehousesSelected[i].value);
        }
        this.vendorId = this.vendorSelected.value;
        this.productId = this.productSelected.value;
        setTimeout(() => {
            App.blockUI();
            this.onRegisterVendorSelect2();
            this.onRegisterWarehouseSelect2();
            this.onRegisterProductSelect2();
            $('.date-picker').datepicker({
                rtl: App.isRTL(),
                orientation: 'left',
                autoclose: true
            });
            App.unblockUI();
        }, 100);
    }
    async onChangeSelectAllWarehouFromVendor(): Promise<void> {
        if (this.isSelectAllWarehouFromVendor) {
            $('#warehouseIdInWarehouseVendorInventoryAddProduct').select2('enable', false);
        } else {
            $('#warehouseIdInWarehouseVendorInventoryAddProduct').select2('enable');
        }
    }
    async onHideAddNewProduct(): Promise<void> {
        this.isShowAddNew = false;
    }
    async onSaveProduct(productForm: any): Promise<void> {
        if (this.onSaveProductStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        try {
            this.startDateTimeUtc = $('#effective_time input[name=\'from\']').val();
            this.endDateTimeUtc = $('#effective_time input[name=\'to\']').val();
            this.onSaveProductStatus = true;
            App.blockUI();
            if (productForm.valid) {
                const response = await this.warehouseService.addProductVendorInventory(this.productId, this.quantity,
                    this.safetyStock, this.sellPrice, this.startDateTimeUtc, this.endDateTimeUtc, this.vendorId,
                    this.warehouseIds, this.isSelectAllWarehouFromVendor);
                if (response.status) {
                    ConfigSetting.ShowSuccess('Save sucess.');
                    this.isShowAddNew = false;
                } else {
                    ConfigSetting.ShowErrores(response.messages);
                }
            }
        } catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
        finally {
            App.unblockUI();
            this.onSaveProductStatus = false;
        }
    }
    async onRegisterVendorSelect2(): Promise<void> {
        const $this = this;
        try {
            ConfigSetting.Select2AjaxRegister(
                '#vendorIdInWarehouseVendorInventoryAddProduct',
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
                '#warehouseIdInWarehouseVendorInventoryAddProduct',
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
    async onRegisterProductSelect2(): Promise<void> {
        const $this = this;
        try {
            ConfigSetting.Select2AjaxRegister(
                '#productIdInWarehouseVendorInventoryAddProduct',
                ConfigSetting.UrlPathProductAutoCompleteByVendor,
                this.createParametersProduct,
                $this,
                'Chọn sản phẩm',
                this.processResultsProduct,
                this.formatRepo,
                this.formatRepoSelection,
                this.selectComponentEventProduct
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
    createParametersProduct(params, $this) {
        if (params.term === undefined) { params.term = ''; }
        const query = {
            keyword: params.term,
            vendorId: $this.vendorId
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
    selectVendorEvent(e, $this) {
        const id = e.params.data.id;
        $this.vendorId = id;
        $this.warehouseIds = [];
        $this.productId = '';
        $('#warehouseIdInWarehouseVendorInventoryAddProduct').empty().trigger('change');
        $('#productIdInWarehouseVendorInventoryAddProduct').empty().trigger('change');
    }
    selectWarehouseEvent(e, $this) {
        const id = e.params.data.id;
        $this.warehouseIds.push(id);
    }
    unSelectWarehouseEvent(e, $this) {
        const id = e.params.data.id;
        const index = $this.warehouseIds.indexOf(id);
        if (index > -1) {
            $this.warehouseIds.splice(index, 1);
        }
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

}
