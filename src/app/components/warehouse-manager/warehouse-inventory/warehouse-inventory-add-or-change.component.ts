import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WarehouseInventoryService } from '../../../services/warehouse-inventory.service';
import { ProductService } from '../../../services/product.service';
import { ConfigSetting } from '../../../common/configSetting';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { KeyValueModel } from '../../../models/result-model';
import { WarehouseInventoryModel, WarehouseInventoryDetailModel } from '../../../models/warehouse/warehouse-inventory-model';
import { ProductDetailModel } from '../../../models/product-model/product-detail-model';
import { WarehouseInventoryAddOrChangeImeiComponent } from '../../../components/warehouse-manager/warehouse-inventory/warehouse-inventory-add-or-change-imei.component';
import { WarehouseInventoryAddQuantityComponent } from './warehouse-inventory-add-quantity.component';

declare var App: any;
declare var jquery: any;
declare var $: any;

@Component({
    selector: 'app-warehouse-inventory-add-or-change',
    templateUrl: './warehouse-inventory-add-or-change.component.html',
})
export class WarehouseInventoryAddOrChangeComponent implements OnInit {
    @ViewChild(WarehouseInventoryAddOrChangeImeiComponent) imeiForm: WarehouseInventoryAddOrChangeImeiComponent;
    @ViewChild(WarehouseInventoryAddQuantityComponent) warehourePriceForm: WarehouseInventoryAddQuantityComponent;
    id: string;
    vendorSelectedId: string;
    warehouseSelectedId: string;
    saleSelectedId: string;
    senderSelectedId: string;
    productSelectedId: string;
    types: KeyValueModel[];
    statuses: KeyValueModel[];
    outOfStockTypes: KeyValueModel[];
    productStatuses: KeyValueModel[];
    productStatusesParam: KeyValueModel[];
    warehouseInventory: WarehouseInventoryModel;
    products: WarehouseInventoryDetailModel[];
    newProduct: WarehouseInventoryDetailModel;
    productSerialRequired: boolean;
    onGetStatus: boolean;
    onGetProductInfoStatus: boolean;
    onSaveWarehouseInventoryStatus: boolean;
    onSaveProductStatus: boolean;
    formValid: boolean;
    productFormValid: boolean;
    warehouseInventoryDetailSearchProductParam: string;
    warehouseInventoryDetailSearchProductStatusParam = 0;
    onSearchWarehouseInventoryDetailStatus: boolean;
    onGetWarehouseInventoryDetailStatus: boolean;
    onChangeQuantityIsOutOfStockStatus: boolean;
    pageIndex = 1;
    pageSize: number;
    totalRow: number;
    isChangeProduct = false;
    constructor(
        private warehouseInventoryService: WarehouseInventoryService,
        private productService: ProductService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.route.paramMap.subscribe((param: ParamMap) => {
            this.id = param.get('id');
            if (this.id == null || this.id === undefined) {
                this.id = '';
            }
            console.log(this.id);
        });
    }

    async ngOnInit() {
        this.formValid = true;
        this.productFormValid = true;
        this.warehouseInventory = new WarehouseInventoryModel();
        this.products = [];
        this.newProduct = new WarehouseInventoryDetailModel();
        await this.onGet();
        setTimeout(() => {
            App.blockUI();
            this.onRegisterVendorSelect2();
            this.onRegisterWarehouseSelect2();
            this.onRegisterSaleSelect2();
            this.onRegisterSenderSelect2();
            this.onRegisterProductSelect2();
            this.onRegisterWarehouseInventoryDetailSearchProductSelect2();
            $('#outdate').inputmask('d/m/y', {
                'placeholder': 'dd/mm/yyyy'
            }); // multi-char placeholder
            App.unblockUI();
        }, 100);

    }
    async onGet(): Promise<void> {
        if (this.onGetStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        this.onGetStatus = true;
        App.blockUI();
        try {
            const response = await this.warehouseInventoryService.get(this.id);
            if (response.status) {
                $('#product').val(null).trigger('change');
                this.productSelectedId = '';
                this.newProduct.productId = '';
                this.warehouseInventory = response.warehouseInventory;
                this.newProduct = response.newProduct;
                this.productStatuses = response.productStatuses;
                this.productStatusesParam = response.productStatusesParam;
                this.types = response.types;
                this.outOfStockTypes = response.outOfStockTypes;
                $('#outdate').val(this.newProduct.outDate);
                this.productSerialRequired = false;
                this.products = response.products;
                this.pageIndex = response.pageIndex + 1;
                this.pageSize = response.pageSize;
                this.totalRow = response.totalRow;
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
                this.selectComponentEvent
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
    productCreateParametersFun(params, $this) {
        const query = {
            keyword: params.term,
            isBaseProduct: false,
            warehouseId: $this.warehouseInventory.warehouseId
        };
        return query;
    }
    formatRepo(repo) {
        if (repo.loading) {
            return repo.text;
        }
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
        $this.vendorSelectedId = id;
        $this.warehouseInventory.vendorId = id;
    }

    async onRegisterWarehouseSelect2(): Promise<void> {
        const $this = this;
        try {
            ConfigSetting.Select2AjaxRegister(
                '#warehouse',
                ConfigSetting.UrlPathWarehouseAutocomplete,
                this.createParametersFunWarehouse,
                $this,
                'Search Warehouse',
                this.processResultsWarehouse,
                this.formatRepo,
                this.formatRepoSelection,
                this.selectComponentEventWarehouse
            );
        } catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
    }
    createParametersFunWarehouse(params, $this) {
        const query = {
            keyword: params.term,
            vendorId: $this.vendorSelectedId
        };
        return query;
    }
    processResultsWarehouse(data, params) {
        return {
            results: data.warehouses
        };
    }
    selectComponentEventWarehouse(e, $this) {
        const id = e.params.data.id;
        $this.warehouseSelectedId = id;
        $this.warehouseInventory.warehouseId = id;
    }

    async onRegisterSaleSelect2(): Promise<void> {
        const $this = this;
        try {
            ConfigSetting.Select2AjaxRegister(
                '#sale',
                ConfigSetting.UrlPathCustomerAutocomplete,
                this.createParametersFun,
                $this,
                'Search sale',
                this.processResultsSale,
                this.formatRepo,
                this.formatRepoSelection,
                this.selectComponentEventSale
            );
        } catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
    }
    processResultsSale(data, params) {
        return {
            results: data.customers
        };
    }
    selectComponentEventSale(e, $this) {
        const id = e.params.data.id;
        $this.saleSelectedId = id;
        $this.warehouseInventory.saleUserId = id;
    }

    async onRegisterSenderSelect2(): Promise<void> {
        const $this = this;
        try {
            ConfigSetting.Select2AjaxRegister(
                '#sender',
                ConfigSetting.UrlPathCustomerAutocomplete,
                this.createParametersFun,
                $this,
                'Search sale',
                this.processResultsSender,
                this.formatRepo,
                this.formatRepoSelection,
                this.selectComponentEventSender
            );
        } catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
    }
    processResultsSender(data, params) {
        return {
            results: data.customers
        };
    }
    selectComponentEventSender(e, $this) {
        const id = e.params.data.id;
        $this.senderSelectedId = id;
        $this.warehouseInventory.senderUserId = id;
    }
    async onRegisterProductSelect2(): Promise<void> {
        const $this = this;
        try {
            let url = ConfigSetting.UrlPathProductAutoComplete;
            if (this.warehouseInventory.isOutOfStock) {
                url = ConfigSetting.UrlPathProductAutoCompleteByWarehouseInventory;
            }
            ConfigSetting.Select2AjaxRegister(
                '#product',
                url,
                this.productCreateParametersFun,
                $this,
                'Search product',
                this.processResultsProduct,
                this.formatRepo,
                this.formatRepoSelection,
                this.selectComponentEventProduct
            );
        } catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
    }
    processResultsProduct(data, params) {
        return {
            results: data.products
        };
    }
    selectComponentEventProduct(e, $this) {
        const id = e.params.data.id;
        if ($this.id == null || $this.id === undefined || $this.id.length === 0) {
            ConfigSetting.ShowError('Please created Warehouse inventory.');
            $('#product').val(null).trigger('change');
            $this.productSelectedId = '';
            $this.newProduct.productId = '';
        } else {
            $this.productSelectedId = id;
            $this.newProduct.productId = id;
            $this.onGetProductInfo();
        }

    }

    async onGetProductInfo(): Promise<void> {
        if (this.onGetProductInfoStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        this.onGetProductInfoStatus = true;
        App.blockUI();
        try {
            const response = await this.productService.GetWarehouseInventoryProductInfo(this.productSelectedId);
            if (response.status) {
                const productInfo = response.product;
                this.newProduct.weight = productInfo.weight;
                this.newProduct.width = productInfo.width;
                this.newProduct.height = productInfo.height;
                this.newProduct.length = productInfo.length;
                this.productSerialRequired = productInfo.serialRequired;
                this.productSerialRequired = true;
            } else {
                ConfigSetting.ShowErrores(response.messages);
            }
        } catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
        finally {
            this.onGetProductInfoStatus = false;
            App.unblockUI();
        }

    }

    async onShowImeiForm(): Promise<void> {
        if (this.newProduct.imeis == null || this.newProduct.imeis === undefined) {
            this.newProduct.imeis = [];
        }
        if (this.productSelectedId == null || this.productSelectedId === undefined || this.productSelectedId === '') {
            ConfigSetting.ShowError('Please select one product.');
        } else {
            await this.imeiForm.onSetImeis(this.warehouseInventory.vendorId, this.warehouseInventory.warehouseId, this.productSelectedId, this.newProduct.imeis);
            $('#imeiForm').modal('show');
        }

    }
    async onChangeImeiSucess(imeis: string[]): Promise<void> {
        this.newProduct.imeis = imeis;
        if (this.newProduct.imeis == null || this.newProduct.imeis === undefined) {
            this.newProduct.imeis = [];
        }
    }

    async onSaveWarehouseInventory(form: any): Promise<void> {
        if (this.onSaveWarehouseInventoryStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        this.onSaveWarehouseInventoryStatus = true;
        App.blockUI();
        try {
            this.formValid = form.valid;
            if (this.formValid) {
                let response;
                let isAdd = false;
                if (this.id.length === 0) {
                    response = await this.warehouseInventoryService.add(
                        this.warehouseInventory.name,
                        this.warehouseInventory.type,
                        this.warehouseInventory.vendorId,
                        this.warehouseInventory.warehouseId,
                        this.warehouseInventory.saleUserId,
                        this.warehouseInventory.senderUserId,
                        this.warehouseInventory.description,
                        this.warehouseInventory.isOutOfStock,
                        this.warehouseInventory.outOfStockType,
                        this.warehouseInventory.outOfStockTypeDescription);
                    isAdd = true;
                } else {
                    response = await this.warehouseInventoryService.change(
                        this.warehouseInventory.id,
                        this.warehouseInventory.version,
                        this.warehouseInventory.name,
                        this.warehouseInventory.type,
                        this.warehouseInventory.vendorId,
                        this.warehouseInventory.warehouseId,
                        this.warehouseInventory.saleUserId,
                        this.warehouseInventory.senderUserId,
                        this.warehouseInventory.description,
                        this.warehouseInventory.outOfStockType,
                        this.warehouseInventory.outOfStockTypeDescription);
                }
                if (response.status) {
                    this.id = response.objectId;
                    this.warehouseInventory.id = response.objectId;
                    this.warehouseInventory.code = response.code;
                    ConfigSetting.ShowSuccess('Save sucess.');
                    if (isAdd) {
                        this.router.navigate([ConfigSetting.WarehouseInventoryChangePage, this.id]);
                    }
                } else {
                    ConfigSetting.ShowErrores(response.messages);
                }
            }

        } catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
        finally {
            this.onSaveWarehouseInventoryStatus = false;
            App.unblockUI();
        }
    }

    async onSaveProduct(productForm: any): Promise<void> {
        if (this.onSaveProductStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        this.onSaveProductStatus = true;
        App.blockUI();
        try {
            if (this.productSerialRequired) {
                if (this.newProduct.imeis == null || this.newProduct.imeis === undefined || this.newProduct.imeis.length <= 0) {
                    ConfigSetting.ShowError('Please input Serial because product is sesial required.');
                    return;
                }
            }
            this.newProduct.outDate = $('#outdate').val();
            this.productFormValid = productForm.valid;
            if (this.productFormValid) {
                let isAddProduct = true;
                if (this.newProduct.id != null && this.newProduct.id !== undefined && this.newProduct.id.length > 0) {
                    isAddProduct = false;
                }
                let response;
                if (isAddProduct) {
                    response = await this.warehouseInventoryService.addProduct(this.newProduct, this.warehouseInventory.id, this.warehouseInventory.version);
                } else {
                    response = await this.warehouseInventoryService.changeProduct(this.newProduct, this.warehouseInventory.id, this.warehouseInventory.version);
                }
                if (response.status) {
                    ConfigSetting.ShowSuccess('Save sucess.');
                    await this.onGet();
                } else {
                    ConfigSetting.ShowErrores(response.messages);
                }
            }

        } catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
        finally {
            this.onSaveProductStatus = false;
            App.unblockUI();
        }
    }
    async onChangeQuantity(quantity: number): Promise<void> {
        this.newProduct.quantity = quantity;
    }
    async onChangeQuantityIsOutOfStock(): Promise<void> {
        if (!this.warehouseInventory.isOutOfStock) {
            return;
        }
        if (this.onChangeQuantityIsOutOfStockStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        try {
            this.onChangeQuantityIsOutOfStockStatus = true;
            App.blockUI();
            const response = await this.warehouseInventoryService.warehouseInventoryDetailGetTotalQuantity(
                this.warehouseInventory.vendorId, this.warehouseInventory.warehouseId, this.newProduct.productId);
            if (response.status) {
                ConfigSetting.ShowSuccess('Save sucess.');
                const totalQuantity = response.totalQuantity;
                if (totalQuantity < this.newProduct.quantity) {
                    ConfigSetting.ShowError('Max quantity is:' + totalQuantity);
                    this.newProduct.quantity = totalQuantity;
                }
            } else {
                this.newProduct.quantity = 0;
                ConfigSetting.ShowErrores(response.messages);

            }
        } catch (error) {
            this.newProduct.quantity = 0;
            ConfigSetting.ShowErrorException(error);
        } finally {
            this.onChangeQuantityIsOutOfStockStatus = false;
            App.unblockUI();
        }
    }
    async onRegisterWarehouseInventoryDetailSearchProductSelect2(): Promise<void> {
        const $this = this;
        try {
            ConfigSetting.Select2AjaxRegister(
                '#warehouseInventoryDetailSearchProduct',
                ConfigSetting.UrlPathProductAutoComplete,
                this.createParametersFun,
                $this,
                'Search product',
                this.processResultsProduct,
                this.formatRepo,
                this.formatRepoSelection,
                this.selectComponentEventWarehouseInventoryDetailSearchProduct,
                this.unSelectComponentEventWarehouseInventoryDetailSearchProduct,
                0,
                300,
                true
            );
        } catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
    }
    selectComponentEventWarehouseInventoryDetailSearchProduct(e, $this) {
        const id = e.params.data.id;
        $this.warehouseInventoryDetailSearchProductParam = id;
    }
    unSelectComponentEventWarehouseInventoryDetailSearchProduct(e, $this) {
        const id = e.params.data.id;
        $this.warehouseInventoryDetailSearchProductParam = null;
    }
    async onWarehouseInventoryDetailSearchProductClearValue(): Promise<void> {
        this.warehouseInventoryDetailSearchProductParam = '';
        $('#warehouseInventoryDetailSearchProduct').val(null).trigger('change');
    }

    async onSearchWarehouseInventoryDetail(): Promise<void> {
        if (this.onSearchWarehouseInventoryDetailStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        this.onSearchWarehouseInventoryDetailStatus = true;
        App.blockUI();
        try {
            const response = await this.warehouseInventoryService.getWarehouseInventoryDetails(this.id,
                this.warehouseInventoryDetailSearchProductParam,
                this.warehouseInventoryDetailSearchProductStatusParam,
                this.pageIndex - 1,
                this.pageSize
            );
            if (response.status) {
                this.products = response.products;
                this.pageIndex = response.pageIndex + 1;
                this.pageSize = response.pageSize;
                this.totalRow = response.totalRow;
            } else {
                ConfigSetting.ShowErrores(response.messages);
            }
        } catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
        finally {
            this.onSearchWarehouseInventoryDetailStatus = false;
            App.unblockUI();
        }
    }

    pageChanged(page: number) {
        this.pageIndex = page;
        this.onSearchWarehouseInventoryDetail();
    }

    async onGetWarehouseInventoryDetail(id): Promise<void> {
        this.isChangeProduct = true;
        if (this.onGetWarehouseInventoryDetailStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        this.onGetWarehouseInventoryDetailStatus = true;
        App.blockUI();
        try {
            const response = await this.warehouseInventoryService.getWarehouseInventoryDetail(id);
            if (response.status) {
                this.newProduct = response.product;
                this.productSelectedId = this.newProduct.productId;
                this.productSerialRequired = this.newProduct.serialRequired;
            } else {
                ConfigSetting.ShowErrores(response.messages);
            }
        } catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
        finally {
            this.onGetWarehouseInventoryDetailStatus = false;
            App.unblockUI();
        }
    }

    async onChangeCancel(): Promise<void> {
        this.isChangeProduct = false;
        await this.onGet();
    }

    async onShowAccountingForm(warehouseDetailId: string, quantity: number): Promise<void> {
        try {
            await this.warehourePriceForm.onGets(warehouseDetailId);
            $('#formAccounting').modal('show');
        } catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
    }

}
