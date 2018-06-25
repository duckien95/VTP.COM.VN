import { ProductService } from './../../../services/product.service';
import { CommissionService } from './../../../services/commission.service';
import { Component, OnInit, Input } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { JsTreeModel } from '../../../models/result-model';
import { ProductSearchModel } from '../../../models/product-model/product-list-model';
import { VendorProductMappingModel } from '../../../models/product-model/product-category-model';

declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-vendor-product-register',
  templateUrl: './vendor-product-register.component.html',
  styleUrls: ['./vendor-product-register.component.css']
})
export class VendorProductRegisterComponent implements OnInit {
  @Input() vendorId: string;
  categorySelectedTree: JsTreeModel[];
  categoryHaveProductTree: JsTreeModel[];
  products: VendorProductMappingModel[];
  productRegisteds: VendorProductMappingModel[];
  vendorProductMappingModel: VendorProductMappingModel;
  pageIndex = 0;
  pageSize = 30;
  totalRow = 0;
  onAddProductStatus: boolean;
  onUpdateProductStatus: boolean;
  onChangeStatusProduct: boolean;
  categoryIds: string[];
  productId: string;
  productRegistedId: string;
  constructor(
    private commissionService: CommissionService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.categoryIds = [];
    this.ngInitData();
  }

  ngInitData() {
    App.blockUI();
    this.onGet();
    setTimeout(() => {
      this.onGetProductByCategoryIdNotRegister(this.categoryIds);
    }, 300);
    setTimeout(() => {
      this.onGetProductByCategoryIdRegisted(this.categoryIds);
    }, 300);
    App.unblockUI();
  }

  async onGet() {
    App.blockUI();

    try {
      const response = await this.commissionService.GetCategoryEnable(this.vendorId);
      if (response.status) {
        this.categorySelectedTree = response.categorySelected;
        this.categoryHaveProductTree = response.categoryHaveProduct;
        this.registerJsTreeCategorySelected();
        this.registerJsTreeCategoryHaveProduct();
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }

    App.unblockUI();
  }

  registerJsTreeCategorySelected() {
    const $this = this;
    $('#jsCategoryTreeProduct').jstree('destroy');
    const categoriesTreeProduct = $('#jsCategoryTreeProduct');
    const configTree = {
      'core': {
        'data': this.categorySelectedTree,
        'check_callback': true,
        'state': {
          'selected': false
        },
      },
      'plugins': [
        'search',
        'wholerow',
        'contextmenu',
        'sort'
      ],
      'search': {
        'show_only_matches': true,
        'show_only_matches_children': true
      }
    };

    categoriesTreeProduct.jstree(configTree);

    $('#searchProduct').on('keyup change', function () {
      categoriesTreeProduct.jstree(true).search($(this).val());
    });

    $('#clearProduct').click(function (e) {
      $('#searchProduct').val('').change().focus();
    });

    categoriesTreeProduct.on('select_node.jstree', function (event, node) {
      $this.categoryIds = node.node.children_d;
      $this.categoryIds.push(node.node.id);
      $this.onGetProductByCategoryIdNotRegister($this.categoryIds);
    });
  }

  registerJsTreeCategoryHaveProduct() {
    const $this = this;
    $('#jsCategoryTreeCategoryHaveProduct').jstree('destroy');
    const categoriesTreeProduct = $('#jsCategoryTreeCategoryHaveProduct');
    const configTree = {
      'core': {
        'data': this.categoryHaveProductTree,
        'check_callback': true,
        'state': {
          'selected': false
        },
      },
      'plugins': [
        'search',
        'wholerow',
        'sort'
      ],
      'search': {
        'show_only_matches': true,
        'show_only_matches_children': true
      }
    };

    categoriesTreeProduct.jstree(configTree);

    categoriesTreeProduct.on('select_node.jstree', function (event, node) {
      $this.categoryIds = node.node.children_d;
      $this.categoryIds.push(node.node.id);
      $this.onGetProductByCategoryIdRegisted($this.categoryIds);
    });
  }

  async onGetProductByCategoryIdNotRegister(categoryIds: string[]) {
    App.blockUI();

    try {
      this.onRegisterSelectProductIsNotRegister();
      const response = await this.productService.productCategoryMappingGetByCategoryId(categoryIds, this.vendorId, false, this.productId);
      if (response.status) {
        this.products = response.products;
        this.pageIndex = response.pageIndex + 1;
        this.pageSize = response.pageSize;
        this.totalRow = response.totalRow;
      } else {
        this.products = [];
        this.pageIndex = 0;
        this.pageSize = 0;
        this.totalRow = 0;
        ConfigSetting.ShowErrores(response.messages);
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }

    App.unblockUI();
  }

  async onGetProductByCategoryIdRegisted(categoryIds: string[]) {
    App.blockUI();

    try {
      this.onRegisterSelectProductIsRegister();
      const response = await this.productService.productCategoryMappingGetByCategoryId(categoryIds, this.vendorId, true, this.productRegistedId);
      if (response.status) {
        this.productRegisteds = response.products;
        this.pageIndex = response.pageIndex + 1;
        this.pageSize = response.pageSize;
        this.totalRow = response.totalRow;
      } else {
        this.productRegisteds = [];
        this.pageIndex = 0;
        this.pageSize = 0;
        this.totalRow = 0;
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }

    App.unblockUI();
  }

  // region select Search Product Register
  async onRegisterSelectProductIsNotRegister(): Promise<void> {
    const $this = this;
    try {
      ConfigSetting.Select2AjaxRegister(
        '#productSearch',
        ConfigSetting.UrlPathProductAutoCompleteByVendor,
        this.createParametersFun,
        $this,
        'Search product',
        this.processResults,
        this.formatRepo,
        this.formatRepoSelection,
        this.selectComponentEvent,
        this.unSelectComponentEvent,
        0,
        300,
        true
      );
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  createParametersFun(params, $this) {
    const query = {
      keyword: params.term,
      vendorId: $this.vendorId,
      isGetProductRegisted: false
    };
    return query;
  }
  formatRepo(repo) {
    if (repo.loading) {
      return repo.text;
    }
    let markup = '<div class=\'select2-result-repository clearfix\'>' +
      '<div class=\'select2-result-repository__meta\'>' +
      '<div class=\'select2-result-repository__title\'>' + repo.text + '</div>';
    markup += '</div></div>';
    return markup;
  }
  formatRepoSelection(repo) {
    return repo.text;
  }
  processResults(data, params) {
    return {
      results: data.products
    };
  }
  selectComponentEvent(e, $this) {
    const id = e.params.data.id;
    $this.productId = id;
  }
  unSelectComponentEvent(e, $this) {
    const id = e.params.data.id;
    $this.productId = null;
  }
  // endregion

  async onRegisterSelectProductIsRegister(): Promise<void> {
    const $this = this;
    try {
      ConfigSetting.Select2AjaxRegister(
        '#productSearchIsRegister',
        ConfigSetting.UrlPathProductAutoCompleteByVendor,
        this.createParametersFunIsRegisted,
        $this,
        'Search product',
        this.processResults,
        this.formatRepo,
        this.formatRepoSelection,
        this.selectComponentEventIsRegisted,
        this.unSelectComponentEventIsRegisted,
        0,
        300,
        true
      );
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  createParametersFunIsRegisted(params, $this) {
    const query = {
      keyword: params.term,
      vendorId: $this.vendorId,
      isGetProductRegisted: true
    };
    return query;
  }
  selectComponentEventIsRegisted(e, $this) {
    const id = e.params.data.id;
    $this.productRegistedId = id;
  }
  unSelectComponentEventIsRegisted(e, $this) {
    const id = e.params.data.id;
    $this.productRegistedId = null;
  }

  async onAdd(id: string) {
    if (this.onAddProductStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      App.blockUI();
      const item = this.products.find(x => x.productId === id);
      this.vendorProductMappingModel = JSON.parse(JSON.stringify(item));
      this.vendorProductMappingModel.productId = id;
      this.vendorProductMappingModel.vendorId = this.vendorId;
      const response = await this.productService.vendorProductMappingAdd(this.vendorProductMappingModel);
      if (response.status) {
        this.onGetProductByCategoryIdNotRegister(this.categoryIds);
        ConfigSetting.ShowSuccess('Save sucess.');
      } else {
        ConfigSetting.ShowErrores(response.messages);
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      App.unblockUI();
      this.onAddProductStatus = false;
    }
  }

  async onUpdate(id: string) {
    if (this.onUpdateProductStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      App.blockUI();
      const item = this.productRegisteds.find(x => x.id === id);
      this.vendorProductMappingModel = JSON.parse(JSON.stringify(item));
      const response = await this.productService.vendorProductMappingUpdate(this.vendorProductMappingModel);
      if (response.status) {
        this.onGetProductByCategoryIdRegisted(this.categoryIds);
        ConfigSetting.ShowSuccess('Save sucess.');
      } else {
        ConfigSetting.ShowErrores(response.messages);
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      App.unblockUI();
      this.onUpdateProductStatus = false;
    }
  }

  async onChangeStatus(id: string, productId: string, vendorId: string, status: number) {
    if (this.onChangeStatusProduct) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      App.blockUI();
      const response = await this.productService.vendorProductMappingChangeStatus(id, productId, vendorId, status);
      if (response.status) {
        this.onGetProductByCategoryIdRegisted(this.categoryIds);
        ConfigSetting.ShowSuccess('Save sucess.');
      } else {
        ConfigSetting.ShowErrores(response.messages);
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      App.unblockUI();
      this.onChangeStatusProduct = false;
    }
  }
}
