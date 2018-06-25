import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { VariationThemeModel } from '../../../models/variation-theme-model';
import { VariationThemeService } from '../../../services/variation-theme.service';
import { ConfigSetting } from '../../../common/configSetting';
import { KeyValueModel } from '../../../models/result-model';

declare var $: any;
declare var App: any;

@Component({
  selector: 'app-variation-theme-add-or-change',
  templateUrl: './variation-theme-add-or-change.component.html',
  styleUrls: ['./variation-theme-add-or-change.component.css']
})
export class VariationThemAddOrChangeComponent implements OnInit {
  @Output() reloadVariationThemes = new EventEmitter();
  id: string;
  model: VariationThemeModel;
  statuses: KeyValueModel[];
  onInitStatus: boolean;
  formValid: boolean;
  onSaveStatus: boolean;
  isFormInit: boolean;
  constructor(
    private variationThemeService: VariationThemeService
  ) {
  }
  ngOnInit() {
    this.model = new VariationThemeModel();
  }
  async onInit(id: string): Promise<void> {
    $('#variationtheme-edit').modal('show');
    this.id = id;
    if (this.id == null || this.id === undefined) {
      this.id = '';
    }
    if (this.onInitStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onInitStatus = true;
      App.blockUI();
      const response = await this.variationThemeService.getById(this.id);
      if (response.status) {
        this.model = response.model;
        this.statuses = response.statuses;
      } else {
        ConfigSetting.ShowErrores(response.messages);
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      App.unblockUI();
      this.onInitStatus = false;
      this.isFormInit = true;
    }
  }

  async onSave(form: any): Promise<void> {
    if (this.onSaveStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    try {
      this.onSaveStatus = true;
      App.blockUI();
      this.formValid = form.valid;
      if (this.formValid) {
        const response = await this.variationThemeService.onSave(this.model);
        if (response.status) {
          ConfigSetting.ShowSuccess('Save sucess');
          this.reloadVariationThemes.emit();
          $('#variationtheme-edit').modal('hide');
        } else {
          ConfigSetting.ShowErrores(response.messages);
        }
      }

    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      App.unblockUI();
      this.onSaveStatus = false;
    }
  }

}
