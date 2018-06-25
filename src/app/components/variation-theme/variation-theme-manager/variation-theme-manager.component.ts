import { Component, OnInit, ViewChild } from '@angular/core';
import { VariationThemeSearchRequest } from '../../../models/variationtheme/VariationThemeSearchRequest';
import { VariationThemeModel } from '../../../models/variation-theme-model';
import { VariationThemeService } from '../../../services/variation-theme.service';
import { ConfigSetting } from '../../../common/configSetting';
import { Router } from '@angular/router';
import { KeyValueModel } from '../../../models/result-model';
import { VariationThemAddOrChangeComponent } from '../variation-theme-add-or-change/variation-theme-add-or-change.component';
import { VariationThemAttributeComponent } from '../variation-them-attribute/variation-them-attribute.component';
declare var jquery: any;
declare var $: any;
declare var App: any;
// declare var count: number;
@Component({
  selector: 'app-variation-theme-manager',
  templateUrl: './variation-theme-manager.component.html',
  styleUrls: ['./variation-theme-manager.component.css']
})
export class VariationthemeManagerComponent implements OnInit {
  @ViewChild(VariationThemAddOrChangeComponent) variationThemeEdit: VariationThemAddOrChangeComponent;
  @ViewChild(VariationThemAttributeComponent) attributeForm: VariationThemAttributeComponent;
  variationThemes: VariationThemeModel[];
  name: string;
  status = 0;
  pageIndex = 0;
  pageSize = 30;
  totalRow = 0;
  statuses: KeyValueModel[];
  searchStatus: boolean;
  onActiveStatus: boolean;
  onRemoveStatus: boolean;
  constructor(
    private variationThemeService: VariationThemeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.variationThemes = [];
    this.search();
  }
  async search(): Promise<any> {
    if (this.searchStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.searchStatus = true;
      App.blockUI();
      const searchParams: VariationThemeSearchRequest = {
        name: this.name,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        status: this.status
      };
      const response = await this.variationThemeService.search(searchParams);
      if (response.status) {
        this.variationThemes = response.variationThemeModels;
        this.totalRow = response.totalRow;
        this.pageIndex = response.pageIndex;
        this.pageSize = response.pageSize;
        this.statuses = response.statuses;
      } else {
        ConfigSetting.ShowErrores(response.messages);
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      App.unblockUI();
      this.searchStatus = false;
    }
  }

  async onShowAddOrChangeForm(variationThemeId: string): Promise<void> {
    try {
      await this.variationThemeEdit.onInit(variationThemeId);
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  async onShowChangeAttributeForm(variationThemeId: string): Promise<void> {
    try {
      await this.attributeForm.onInit(variationThemeId);
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  async onActive(id: string): Promise<void> {
    if (this.onActiveStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onActiveStatus = true;
      App.blockUI();
      const response = await this.variationThemeService.active(id);
      if (response.status) {
        ConfigSetting.ShowSuccess('Active sucess.');
        await this.search();
      } else {
        ConfigSetting.ShowErrores(response.messages);
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      App.unblockUI();
      this.onActiveStatus = false;
    }
  }

  async onRemove(id: string): Promise<void> {
    if (this.onRemoveStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onRemoveStatus = true;
      App.blockUI();
      const response = await this.variationThemeService.remove(id);
      if (response.status) {
        ConfigSetting.ShowSuccess('Remove sucess.');
        await this.search();
      } else {
        ConfigSetting.ShowErrores(response.messages);
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      App.unblockUI();
      this.onRemoveStatus = false;
    }
  }
  public onRegisterConfirmation() {
    const register = $('.template_remove_bs_confirmation').attr('confirmation_register');
    if (register === '1') {
      return;
    }
    $('.template_remove_bs_confirmation').attr('confirmation_register', '1');
    $('.template_remove_bs_confirmation').confirmation({
      rootSelector: '[data-toggle=confirmation]'
    });
    const $that = this;
    $('.template_remove_bs_confirmation').on('confirmed.bs.confirmation', function () {
      console.log(this);
      const id = $(this).attr('tmpindex');
      $that.onRemove(id);
    });
  }
}
