import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { WarehouseInventoryService } from '../../../services/warehouse-inventory.service';
import { ProductService } from '../../../services/product.service';
import { ConfigSetting } from '../../../common/configSetting';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { KeyValueModel } from '../../../models/result-model';
import { WarehouseInventoryModel, WarehouseInventoryDetailModel } from '../../../models/warehouse/warehouse-inventory-model';
import { ProductDetailModel } from '../../../models/product-model/product-detail-model';
import { ConfigAddOrUpdateRequest } from '../../../models/config-add-or-update-request-model';

declare var App: any;
declare var jquery: any;
declare var $: any;

@Component({
    selector: 'app-warehouse-inventory-add-or-change-imei',
    templateUrl: './warehouse-inventory-add-or-change-imei.component.html',
})
export class WarehouseInventoryAddOrChangeImeiComponent implements OnInit {
    @Output() reloadQuantityEvent = new EventEmitter();
    vendorId: string;
    warehouseId: string;
    productId: string;
    newImei: string;
    imeis: string[];
    onCheckNewImeiDuplicateStatus: boolean;
    constructor(
        private productService: ProductService,
    ) {
    }

    ngOnInit() {
    }
    async onSetImeis(vendorId: string, warehouseId: string, productId: string, imeis: string[]): Promise<void> {
        this.vendorId = vendorId;
        this.warehouseId = warehouseId;
        this.productId = productId;
        this.imeis = imeis;
    }
    async onGetImeis(): Promise<string[]> {
        return this.imeis;
    }

    async onAddNewImei(): Promise<void> {
        if (this.imeis === undefined || this.imeis == null) {
            this.imeis = [];
        }
        if (this.newImei == null || this.newImei === undefined || this.newImei === '') {
            ConfigSetting.ShowError('Imei not null or empty');
        } else {
            let isNotDuplicate = this.imeis.filter(word => word === this.newImei).length <= 0;
            if (!isNotDuplicate) {
                ConfigSetting.ShowError('Imei is duplicate');
                return;
            }
            isNotDuplicate = await this.onCheckNewImeiDuplicate();
            if (isNotDuplicate) {
                this.imeis.push(this.newImei);
                this.newImei = '';
            } else {

            }

        }
    }
    async onRemoveImei(index: number): Promise<void> {
        this.imeis.splice(index, 1);
    }

    async onCheckNewImeiDuplicate(): Promise<boolean> {
        if (this.onCheckNewImeiDuplicateStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        this.onCheckNewImeiDuplicateStatus = true;
        App.blockUI();
        try {
            const response = await this.productService.checkImeiDuplicate(this.vendorId, this.warehouseId, this.productId, this.newImei);
            if (response.status) {
                return true;
            } else {
                ConfigSetting.ShowErrores(response.messages);
                return false;
            }
        } catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
        finally {
            this.onCheckNewImeiDuplicateStatus = false;
            App.unblockUI();
        }
    }

    async onOk(): Promise<void> {
        if (this.imeis === undefined || this.imeis == null) {
            this.imeis = [];
        }
        this.reloadQuantityEvent.emit(this.imeis.length);
    }
}
