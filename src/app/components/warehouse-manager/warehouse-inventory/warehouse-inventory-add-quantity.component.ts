import { WarehouseInventoryService } from './../../../services/warehouse-inventory.service';
import { WarehouseInvertoryPriceModel } from './../../../models/warehouse/warehouse-inventory-model';
import { Component, OnInit, Input } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';

declare var App: any;
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-warehouse-inventory-add-quantity',
  templateUrl: './warehouse-inventory-add-quantity.component.html'
})
export class WarehouseInventoryAddQuantityComponent implements OnInit {
  warehouseInventoryPrices: WarehouseInvertoryPriceModel[];
  warehouseInventoryId: string;
  warehouseInventoryDetailId: string;
  onGetsStatus: boolean;
  onSubmitStatus: boolean;
  totalQuantity = 0;
  version = 0;
  constructor(
    private warehouseInventoryService: WarehouseInventoryService,
  ) { }

  ngOnInit() {
  }

  async onGets(warehouseInventoryDetailId: string): Promise<void> {
    if (this.onGetsStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onGetsStatus = true;
      App.blockUI();
      const response = await this.warehouseInventoryService.warehouseInventoryPriceGetByDetailId(warehouseInventoryDetailId);
      if (response.status) {
        this.warehouseInventoryId = response.warehouseInventoryId;
        this.warehouseInventoryDetailId = response.warehouseInventoryDetailId;
        this.version = response.version;
        this.totalQuantity = response.totalQuantity;
        this.warehouseInventoryPrices = response.warehouseInventoryPrices as WarehouseInvertoryPriceModel[];
        if (this.warehouseInventoryPrices.length <= 0) {
          this.onAddItem(this.totalQuantity);
        }
      } else {
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

  onAddItem(quantity: number) {
    const item: WarehouseInvertoryPriceModel = {
      price: 0,
      originPrice: 0,
      quantity: quantity,
      warehouseInventoryDetailId: this.warehouseInventoryDetailId
    };
    this.warehouseInventoryPrices.push(item);
  }

  onRemove(index: number) {
    this.warehouseInventoryPrices.splice(index, 1);
  }

  async onSubmit() {
    let totalQuantity = 0;
    this.warehouseInventoryPrices.forEach(element => {
      totalQuantity += element.quantity;
    });
    if (totalQuantity !== this.totalQuantity) {
      ConfigSetting.ShowError('Quantity is not map: Total quantity is ' + this.totalQuantity + ' != input quantity ' + totalQuantity);
      return;
    }
    if (this.onSubmitStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onSubmitStatus = true;
      App.blockUI();
      const response = await this.warehouseInventoryService.warehouseInventoryPriceAdd(
        this.warehouseInventoryId, this.warehouseInventoryDetailId, this.version, this.warehouseInventoryPrices
      );
      if (response.status) {
        $('#formAccounting').modal('hide');
        ConfigSetting.ShowSuccess('Save sucess.');
      } else {
        ConfigSetting.ShowErrores(response.messages);
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      this.onSubmitStatus = false;
      App.unblockUI();
    }
  }
}
