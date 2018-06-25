import { Component, OnInit } from '@angular/core';
import { AdminMenuManagerModel, AdminMenuModel } from '../../models/admin-menu-model';
import { AdminMenuService } from '../../services/admin-menu.service';
import { ConfigSetting } from '../../common/configSetting';

declare var App: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {
  model: AdminMenuManagerModel;
  onGetStatus: boolean;
  onAddOrChangeStatus: boolean;
  formValid: boolean;
  onInitStatus: boolean;
  showFormMenu: boolean;
  onChangeMenuEditPositionStatus: boolean;
  componentType: number;
  languageIdSearchParam = '';
  positionIdSearchParam = 0;
  constructor(
    private adminMenuService: AdminMenuService
  ) { }

  ngOnInit() {
    this.model = new AdminMenuManagerModel();
    this.model.menu = new AdminMenuModel();
    this.formValid = true;
    this.onInit();
  }
  async onInit(): Promise<void> {
    this.showFormMenu = false;
    if (this.onInitStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.onInitStatus = true;
    try {
      const positionId = this.positionIdSearchParam;
      const response = await this.adminMenuService.gets(positionId);
      this.model.menus = response.menus;
      this.model.positions = response.positions;
      this.positionIdSearchParam = response.positionSelected;
      this.registerMenusTree();
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      this.onInitStatus = false;
      App.unblockUI();
    }
  }

  async onGet(id: string): Promise<void> {
    this.showFormMenu = true;
    if (this.onGetStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.onGetStatus = true;
    try {
      const positionId = this.positionIdSearchParam;
      const response = await this.adminMenuService.get(id, positionId);
      this.model.types = response.types;
      this.model.positions = response.positions;
      this.model.parents = response.parents;
      this.model.menu = response.menu;
      this.registerParentsTree();
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      this.onGetStatus = false;
      App.unblockUI();
    }
  }

  registerParentsTree(): void {
    const menus = {
      'core': {
        'data': []
      }
    };
    for (let i = 0; i < this.model.parents.length; i++) {
      const menu = this.model.parents[i];
      const menuItem = {
        'id': menu.id,
        'parent': menu.parentId === '' ? '#' : menu.parentId,
        'text': menu.name,
        'data': menu
      };
      menus.core.data.push(menuItem);
    }
    try {
      $('.parents').jstree(true).settings.core.data = menus.core.data;
    } catch (ex) {
      $('.parents').jstree(menus);
    }
    const $that = this;
    $('.parents').on('select_node.jstree', function (event, node) {
      const selectedNode = node.node;
      $that.model.menu.parentId = selectedNode.data.id;
    });
    if (this.model.menu.parentId != null && this.model.menu.parentId !== undefined && this.model.menu.parentId.length > 0) {
      $('.parents').one('refresh.jstree', function () { $('.parents').jstree(true).select_node($that.model.menu.parentId); });
    } else {
      $('.parents').one('refresh.jstree', function () { $('.parents').jstree('deselect_all'); });
    }
    $('.parents').jstree(true).refresh();
  }

  registerMenusTree(): void {
    const menus = {
      'core': {
        'data': []
      }
    };
    if (this.model.menus == null || this.model.menus === undefined || this.model.menus.length <= 0) {
      menus.core.data = [];
    } else {
      for (let i = 0; i < this.model.menus.length; i++) {
        const menu = this.model.menus[i];
        const menuItem = {
          'id': menu.id,
          'parent': menu.parentId === '' ? '#' : menu.parentId,
          'text': menu.name,
          'data': menu
        };
        menus.core.data.push(menuItem);
      }
    }
    try {
      $('#menus').jstree(true).settings.core.data = menus.core.data;
      $('#menus').jstree(true).refresh();
    } catch (ex) {
      $('#menus').jstree(menus);
      const $that = this;
      $('#menus').on('select_node.jstree', function (event, node) {
        const selectedNode = node.node;
        $that.onGet(selectedNode.data.id);
      });
    }
  }

  async onAddOrChange(form): Promise<void> {
    if (this.onAddOrChangeStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.onAddOrChangeStatus = true;
    try {
      this.formValid = form.valid && this.model.menu.type > 0;
      if (this.formValid) {
        const requestModel = this.model.menu;
        const response = await this.adminMenuService.addOrChange(requestModel);
        if (response.status) {
          this.onInit();
          ConfigSetting.ShowSuccess('Register success.');
        } else {
          ConfigSetting.ShowErrores(response.messages);
        }
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      this.onAddOrChangeStatus = false;
      App.unblockUI();
    }
  }

  async onClearSelected(): Promise<void> {
    $('.parents').jstree('deselect_all');
    this.model.menu.parentId = '';
  }

  async onChangeMenuEditPosition(): Promise<void> {
    if (this.onChangeMenuEditPositionStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onChangeMenuEditPositionStatus = true;
      App.blockUI();
      const positionId = this.model.menu.positionId;
      const response = await this.adminMenuService.gets(positionId);
      if (response.status) {
        this.model.parents = response.menus;
        this.registerParentsTree();
      } else {
        ConfigSetting.ShowErrores(response.messages);
      }

    } catch (error) {
      ConfigSetting.ShowErrorException(error);
    }
    finally {
      this.onChangeMenuEditPositionStatus = false;
      App.unblockUI();
    }
  }

}
