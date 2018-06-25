import { JsTreeModel } from './../../../models/result-model';
import { VendorService } from './../../../services/vendor.service';
import { debug } from 'util';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { CategoryModel } from '../../../models/category-manager-model';
import { CommissionService } from './../../../services/commission.service';
import { CommissionResponse, CommissionRequest } from '../../../models/commission-request-model';
import { VendorProductRegisterComponent } from '../vendor-product-register/vendor-product-register.component';

declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-vendor-category-register',
  templateUrl: './vendor-category-register.component.html',
  styleUrls: ['./vendor-category-register.component.css']
})
export class VendorCategoryRegisterComponent implements OnInit {
  @Input() vendorId: string;
  commissions: CommissionResponse[];
  categoryTree: JsTreeModel[];
  commissionRequest: CommissionRequest;
  onAddCategoryStatus: boolean;
  isChangeStatus: boolean;
  pageIndex = 0;
  pageSize = 30;
  totalRow = 0;
  constructor(
    private commissionService: CommissionService,
    private vendorService: VendorService
  ) { }

  ngOnInit() {
    this.commissionRequest = new CommissionRequest();
    this.onSearchComission();
  }

  async onSearchComission() {
    App.blockUI();

    try {
      this.commissionRequest.vendorId = this.vendorId;
      const response = await this.commissionService.Search(this.commissionRequest);
      if (response.status) {
        this.commissions = response.commissions;
        this.categoryTree = response.categorySelected;
        this.pageIndex = response.pageIndex + 1;
        this.registerJsTree();
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }

    App.unblockUI();
  }

  registerJsTree() {
    const $this = this;
    $('#jsCategoryTree').jstree('destroy');
    const categoriesTree = $('#jsCategoryTree');
    const configTree = {
      'core': {
        'data': this.categoryTree,
        'check_callback': true
      },
      'plugins': [
        'search',
        'checkbox',
        'wholerow',
        'contextmenu',
        'sort'
      ],
      'checkbox': {
        'keep_selected_style': false,
        'three_state': false
      },
      'search': {
        'show_only_matches': true,
        'show_only_matches_children': true
      }
    };

    categoriesTree.jstree(configTree);

    $('#search').on('keyup change', function () {
      categoriesTree.jstree(true).search($(this).val());
    });

    $('#clear').click(function (e) {
      $('#search').val('').change().focus();
    });

    categoriesTree.on('changed.jstree', function (e, data) {
      const objects = data.instance.get_selected(true);
      // const leaves = $.grep(objects, function (o) { return data.instance.is_leaf(o); });
      $this.commissions = [];
      $.each(objects, function (i, o) {
        const commission = new CommissionResponse();
        commission.id = o.original.commissionId;
        commission.categoryId = o.id;
        commission.vendorId = $this.commissionRequest.vendorId;
        commission.categoryName = $('#jsCategoryTree').jstree(true).get_path(o, ' > ');
        commission.commission = o.original.commission;
        commission.status = o.original.status;
        commission.isShowActiveButton = o.original.isShowActiveButton;
        commission.isShowRegisterButton = o.original.isShowRegisterButton;
        commission.isShowStopSellButton = o.original.isShowStopSellButton;
        $this.commissions.push(commission);
      });
    });
  }

  async onSaveRegisterCategory() {
    if (this.onAddCategoryStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onAddCategoryStatus = true;
      App.blockUI();
      const commissionPost = [];
      if (this.commissions.length > 0) {
        const items = JSON.parse(JSON.stringify(this.commissions));
        for (let i = 0; i < items.length; i++) {
          const categoryId = items[i].categoryId;
          const vendorId = this.commissionRequest.vendorId;
          const commission = $('#commission_' + i).val();
          commissionPost.push({
            'categoryId': categoryId,
            'vendorId': vendorId,
            'commission': commission
          });
        }
      }
      await this.vendorService.commissionAdd(commissionPost);
      this.onSearchComission();
      ConfigSetting.ShowSuccess('Save sucess.');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      App.unblockUI();
      this.onAddCategoryStatus = false;
    }
  }

  async onChangeStatus(id: string, changeStatusType: number) {
    if (this.isChangeStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.isChangeStatus = true;
      App.blockUI();
      await this.commissionService.ChangeStatus(id, changeStatusType);
      this.onSearchComission();
      ConfigSetting.ShowSuccess('Save sucess.');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      App.unblockUI();
      this.isChangeStatus = false;
    }
  }
}
