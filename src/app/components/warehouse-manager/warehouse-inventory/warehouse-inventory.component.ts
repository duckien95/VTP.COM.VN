import { Component, OnInit, ViewChild } from '@angular/core';
import { WarehouseInventoryService } from '../../../services/warehouse-inventory.service';
import { ConfigSetting } from '../../../common/configSetting';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { KeyValueModel } from '../../../models/result-model';
import { WarehouseInventoryModel } from '../../../models/warehouse/warehouse-inventory-model';
import { forEach } from '@angular/router/src/utils/collection';

declare var App: any;
declare var jquery: any;
declare var $: any;

@Component({
    selector: 'app-warehouse-inventory',
    templateUrl: './warehouse-inventory.component.html',
})
export class WarehouseInventoryComponent implements OnInit {
    keyword: string;
    type = 0;
    vendorId: string;
    saleUserId: string;
    status = 0;
    warehouseId: string;
    pageIndex: number;
    pageSize: number;
    totalRow: number;
    types: KeyValueModel[];
    statuses: KeyValueModel[];
    outOfStockTypes: KeyValueModel[];
    warehouseInventorys: WarehouseInventoryModel[];
    getsStatus: boolean;
    onGetStatus: boolean;
    onSaleConfirmStatus: boolean;
    onSaleCancelStatus: boolean;
    onCancelStatus: boolean;
    onAccountingStatus: boolean;
    onApplyStatus: boolean;
    constructor(
        private warehouseInventoryService: WarehouseInventoryService,
        private router: ActivatedRoute
    ) { }

    ngOnInit() {
        this.onGets();
        this.onRegisterVedorSearch();
        this.onRegisterWarehouseSearch();
    }

    async onGets(): Promise<void> {
        if (this.getsStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        this.getsStatus = true;
        App.blockUI();
        try {
            const response = await this.warehouseInventoryService.gets(this.keyword, this.type, this.vendorId, this.saleUserId, this.status, this.warehouseId, this.pageIndex);
            if (response.status !== true) {
                ConfigSetting.ShowErrores(response.messages);
            } else {
                this.types = response.types;
                this.statuses = response.statuses;
                this.warehouseInventorys = response.warehouseInventorys;
                this.totalRow = response.totalRow;
                this.pageIndex = response.pageIndex;
                this.pageSize = response.pageSize;
            }
        } catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
        finally {
            this.getsStatus = false;
            App.unblockUI();
        }
    }
    // #region select2 vendor
    async onRegisterVedorSearch(): Promise<void> {
        const $this = this;
        try {
            ConfigSetting.Select2AjaxRegister(
                '#vendorSearchId',
                ConfigSetting.UrlPathGetVendors,
                this.createParametersFunVendorSearch,
                $this,
                'Select vendor',
                this.processResultsVendorSearch,
                this.formatRepoVendorSearch,
                this.formatRepoSelectionVendorSearch,
                this.selectComponentEventVendorSearch,
                this.unSelectComponentEventVendorSearch,
                1,
                300,
                true
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
    // #endregion

    // #region select2 vendor
    async onRegisterWarehouseSearch(): Promise<void> {
        const $this = this;
        try {
            ConfigSetting.Select2AjaxRegister(
                '#warehouseSearchId',
                ConfigSetting.UrlPathWarehouseAutocomplete,
                this.createParametersFunWarehouseSearch,
                $this,
                'Select warehouse',
                this.processResultsWarehouseSearch,
                this.formatRepoWarehouseSearch,
                this.formatRepoSelectionWarehouseSearch,
                this.selectComponentEventWarehouseSearch,
                this.unSelectComponentEventWarehouseSearch,
                0,
                300,
                true
            );
        } catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
    }
    createParametersFunWarehouseSearch(params, $this) {
        if (params.term === undefined) { params.term = ''; }
        const query = {
            keyword: params.term
        };
        return query;
    }
    formatRepoWarehouseSearch(repo) {
        if (repo.loading) { return repo.text; }
        return repo.text;
    }
    formatRepoSelectionWarehouseSearch(repo) {
        return repo.text;
    }
    processResultsWarehouseSearch(data, params) {
        return {
            results: data.warehouses
        };
    }
    selectComponentEventWarehouseSearch(e, $this) {
        const id = e.params.data.id;
        $this.warehouseId = id;
    }
    unSelectComponentEventWarehouseSearch(e, $this) {
        const id = e.params.data.id;
        $this.warehouseId = null;
    }
    // #endregion

    async onGet(id: string): Promise<void> {
        if (this.onGetStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        this.onGetStatus = true;
        App.blockUI();
        try {
            const response = await this.warehouseInventoryService.get(id);
            if (response.status) {

            } else {
                ConfigSetting.ShowErrores(response.messages);
            }
        } catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
        finally {
            this.onGetStatus = false;
            App.unblockUI();
        }
    }

    async onRemove(id: string, version: number): Promise<void> {
        try {
            const response = await this.warehouseInventoryService.remove(id, version);
            if (response.status) {
                ConfigSetting.ShowSuccess('Save sucess.');
            } else {
                ConfigSetting.ShowErrores(response.messages);
            }
        } catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
    }

    async onSaleConfirm(id: string, version: number) {
        if (this.onSaleConfirmStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        this.onSaleConfirmStatus = true;
        App.blockUI();
        try {
            const response = await this.warehouseInventoryService.saleConfirm(id, version);
            if (response.status) {
                ConfigSetting.ShowSuccess('Save sucess.');
                await this.onGets();
            } else {
                ConfigSetting.ShowErrores(response.messages);
            }
        } catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
        finally {
            this.onSaleConfirmStatus = false;
            App.unblockUI();
        }
    }

    async onSaleCancel(id: string, version: number) {
        if (this.onSaleCancelStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        this.onSaleCancelStatus = true;
        App.blockUI();
        try {
            const response = await this.warehouseInventoryService.saleCancel(id, version);
            if (response.status) {
                ConfigSetting.ShowSuccess('Save sucess.');
                await this.onGets();
            } else {
                ConfigSetting.ShowErrores(response.messages);
            }
        } catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
        finally {
            this.onSaleCancelStatus = false;
            App.unblockUI();
        }
    }

    async onCancel(id: string, version: number) {
        if (this.onCancelStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        this.onCancelStatus = true;
        App.blockUI();
        try {
            const response = await this.warehouseInventoryService.cancel(id, version);
            if (response.status) {
                ConfigSetting.ShowSuccess('Save sucess.');
                await this.onGets();
            } else {
                ConfigSetting.ShowErrores(response.messages);
            }
        } catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
        finally {
            this.onCancelStatus = false;
            App.unblockUI();
        }
    }

    async onAccounting(id: string, version: number) {
        if (this.onAccountingStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        this.onAccountingStatus = true;
        App.blockUI();
        try {
            const response = await this.warehouseInventoryService.accounting(id, version);
            if (response.status) {
                ConfigSetting.ShowSuccess('Save sucess.');
                await this.onGets();
            } else {
                ConfigSetting.ShowErrores(response.messages);
            }
        } catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
        finally {
            this.onAccountingStatus = false;
            App.unblockUI();
        }
    }

    async onApply(id: string, version: number) {
        if (this.onApplyStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        this.onApplyStatus = true;
        App.blockUI();
        try {
            const response = await this.warehouseInventoryService.apply(id, version);
            if (response.status) {
                ConfigSetting.ShowSuccess('Save sucess.');
                await this.onGets();
            } else {
                ConfigSetting.ShowErrores(response.messages);
            }
        } catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
        finally {
            this.onApplyStatus = false;
            App.unblockUI();
        }
    }
}
