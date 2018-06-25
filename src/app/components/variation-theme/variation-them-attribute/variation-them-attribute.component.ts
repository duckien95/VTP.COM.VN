import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { VariationThemeModel, VariationThemeAttributeMappingModel } from '../../../models/variation-theme-model';
import { VariationThemeService } from '../../../services/variation-theme.service';
import { ConfigSetting } from '../../../common/configSetting';
import { KeyValueModel } from '../../../models/result-model';
import { Dictionary } from '../../../models/dictionary';
import { Jsonp } from '@angular/http';

declare var $: any;
declare var App: any;

@Component({
    selector: 'app-variation-them-attribute',
    templateUrl: './variation-them-attribute.component.html'
})
export class VariationThemAttributeComponent implements OnInit {
    @Output() reloadVariationThemes = new EventEmitter();
    variationThemeId: string;
    models: VariationThemeAttributeMappingModel[];
    model: VariationThemeAttributeMappingModel;
    modelChanging: VariationThemeAttributeMappingModel;
    statuses: KeyValueModel[];
    attributeTypes: KeyValueModel[];
    measureUnits: KeyValueModel[];
    onInitStatus: boolean;
    formValid: boolean;
    onSaveStatus: boolean;
    isFormInit: boolean;
    isShowAddNew: boolean;
    indexChanging = -1;
    rowEdits: Dictionary<boolean>;
    onRemoveStatus: boolean;
    constructor(
        private variationThemeService: VariationThemeService
    ) {
    }
    ngOnInit() {
        this.models = [];
        this.rowEdits = new Dictionary<boolean>();
        const $this = this;
        $('#variation-theme-attribute').on('hidden.bs.modal', function () {
            $this.reloadVariationThemes.emit();
        });
    }
    async onInit(variationThemeId: string): Promise<void> {
        this.variationThemeId = variationThemeId;
        if (this.variationThemeId == null || this.variationThemeId === undefined) {
            this.variationThemeId = '';
        }
        this.isShowAddNew = false;
        this.indexChanging = -1;
        if (this.onInitStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        try {
            this.onInitStatus = true;
            App.blockUI();
            const response = await this.variationThemeService.getVariationThemeAttributeMappingsByVariationThemeId(this.variationThemeId);
            if (response.status) {
                this.models = response.models;
                this.rowEdits = new Dictionary<boolean>();
                for (let i = 0; i < this.models.length; i++) {
                    this.rowEdits.Add(i + '', false);
                }
                this.statuses = response.statuses;
                this.attributeTypes = response.attributeTypes;
                this.measureUnits = response.measureUnits;
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
            $('#variation-theme-attribute').modal('show');
        }
    }

    async onShowAddNew(): Promise<void> {
        try {
            if (this.indexChanging >= 0) {
                await this.onChangeCancel();
            }
            this.isShowAddNew = true;
            this.indexChanging = -1;
            this.model = new VariationThemeAttributeMappingModel();
            this.model.variationThemeId = this.variationThemeId;
            this.model.baseUnitId = '';
            this.modelChanging = null;
            setTimeout(() => {
                this.onRegisterComponentSelect2();
            }, 300);
        } catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
    }
    async onAddNewCancel(): Promise<void> {
        try {
            this.isShowAddNew = false;
        } catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
    }
    async onShowChange(indexChanging: number): Promise<void> {
        await this.onAddNewCancel();
        await this.onChangeCancel();
        this.indexChanging = indexChanging;
        this.rowEdits.Change(indexChanging + '', true);
        this.model = this.models[indexChanging];
        this.modelChanging = JSON.parse(JSON.stringify(this.model));
        setTimeout(() => {
            this.onRegisterComponentSelect2();
        }, 300);
    }
    async onChangeCancel(): Promise<void> {
        if (this.indexChanging >= 0) {
            this.rowEdits.Change(this.indexChanging + '', false);
            this.models[this.indexChanging] = this.modelChanging;
        }
    }
    async onRegisterComponentSelect2(): Promise<void> {
        const $this = this;
        try {
            ConfigSetting.Select2AjaxRegister(
                '#attributeAutocomplete',
                ConfigSetting.UrlProductGroupGetAttributes,
                this.createParametersFun,
                $this,
                'Search Attribute',
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
            results: data.attributes
        };
    }
    selectComponentEvent(e, $this) {
        const id = e.params.data.id;
        $this.model.attributeId = id;
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
                const response = await this.variationThemeService.saveVariationThemeAttributeMapping(this.modelChanging, this.model);
                if (response.status) {
                    ConfigSetting.ShowSuccess('Save sucess');
                    await this.onAddNewCancel();
                    await this.onChangeCancel();
                    await this.onInit(this.variationThemeId);
                    // this.reloadVariationThemes.emit();
                    // $('#variationtheme-edit').modal('hide');
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
    async onRemove(index: number): Promise<void> {
        if (this.onRemoveStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        try {
            this.onRemoveStatus = true;
            App.blockUI();
            const model = this.models[index];
            const response = await this.variationThemeService.removeVariationThemeAttributeMapping(model);
            if (response.status) {
                ConfigSetting.ShowSuccess('Remove sucess');
                await this.onInit(this.variationThemeId);
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
            const index = $(this).attr('tmpindex');
            $that.onRemove(index);
        });
    }
}
