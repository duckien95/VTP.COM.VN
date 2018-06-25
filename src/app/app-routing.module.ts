import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EqualValidator } from './directives/equal-validator.directive';
import { AutoCompleteModule } from 'primeng/primeng';

import { CheckPermissionService } from './services/check-permission.service';
import { LoginRedirectService } from './services/login-redirect.service';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ValidatePasswordDirective } from './directives/validate-password.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { MultipleFileUploadComponent } from './components/multiple-file-upload/multiple-file-upload.component';
import { BaseComponent } from './components/base/base.component';
import { VariationThemAddOrChangeComponent } from './components/variation-theme/variation-theme-add-or-change/variation-theme-add-or-change.component';

import { FileUploadModule } from 'primeng/fileupload';
import { CKEditorModule } from 'ng2-ckeditor';
import { VendorComponent } from './components/vendor/vendor/vendor.component';
import { VendorAddOrChangeComponent } from './components/vendor/vendor-add-or-change/vendor-add-or-change.component';
import { VendorDetailComponent } from './components/vendor/vendor-detail/vendor-detail.component';

import { BannerComponent } from './components/marketing-management/banner/banner/banner.component';
import { BannerItemComponent } from './components/marketing-management/banner/banner-item/banner-item.component';
import { BannerAddOrChangeComponent } from './components/marketing-management/banner/banner-add-or-change/banner-add-or-change.component';
import { BannerItemAddOrChangeComponent } from './components/marketing-management/banner/banner-item-add-or-change/banner-item-add-or-change.component';
import { WarehouseComponent } from './components/warehouse-manager/warehouse/warehouse.component';
import { WarehouseAddOrChangeComponent } from './components/warehouse-manager/warehouse-add-or-change/warehouse-add-or-change.component';
import { WarehouseAddressComponent } from './components/warehouse-manager/warehouse-address/warehouse-address.component';
import { VariationthemeManagerComponent } from './components/variation-theme/variation-theme-manager/variation-theme-manager.component';
import { WarehouseDetailComponent } from './components/warehouse-manager/warehouse-detail/warehouse-detail.component';
import { TemplateDefineComponent } from './components/marketing-management/template-define.component';
import { TemplateDefineHtmlComponent } from './components/marketing-management/template-define-html.component';
import { WarehouseInventoryAddOrChangeComponent } from './components/warehouse-manager/warehouse-inventory/warehouse-inventory-add-or-change.component';
import { WarehouseInventoryAddOrChangeImeiComponent } from './components/warehouse-manager/warehouse-inventory/warehouse-inventory-add-or-change-imei.component';
import { WarehouseInventoryComponent } from './components/warehouse-manager/warehouse-inventory/warehouse-inventory.component';
import { WarehouseInventoryAddQuantityComponent } from './components/warehouse-manager/warehouse-inventory/warehouse-inventory-add-quantity.component';

import { VendorCategoryRegisterComponent } from './components/vendor-register-product-manager/vendor-category-register/vendor-category-register.component';
import { VendorProductRegisterComponent } from './components/vendor-register-product-manager/vendor-product-register/vendor-product-register.component';
import { WarehouseVendorInventoryMangerComponent } from './components/warehouse-manager/warehouse-vendor-inventory/warehouse-vendor-inventory-manager.component';
import { WarehouseVendorInventoryComponent } from './components/warehouse-manager/warehouse-vendor-inventory/warehouse-vendor-inventory.component';
import { WarehouseVendorInventoryAddProductComponent } from './components/warehouse-manager/warehouse-vendor-inventory/warehouse-vendor-inventory-add-product.component';
import { CustomFormsModule } from 'ng2-validation';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { VendorRegisterProductManagerComponent } from './components/vendor-register-product-manager/vendor-register-product-manager.component';
import { VariationThemAttributeComponent } from './components/variation-theme/variation-them-attribute/variation-them-attribute.component';
import { FileUploaderPopupComponent } from './components/common/file-uploader-popup/file-uploader-popup.component';
import { ListServiceComponent } from './components/list-service/list-service.component';
import { ServiceDetailComponent } from './components/list-service/service-detail/service-detail.component';

const routesConfig: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'services',
    component: ListServiceComponent
  },
  {
    path: 'detail',
    component: ServiceDetailComponent,
  },
  {
    path: 'vtp',
    component: LayoutComponent,
    canActivate: [CheckPermissionService],
    children: [
      {
        path: 'banner',
        component: BannerComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'banner-item/:bannerId',
        component: BannerItemComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'warehouse/:id',
        component: WarehouseComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'template-define',
        component: TemplateDefineComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'warehouse-detail/:id',
        component: WarehouseDetailComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'variationtheme',
        component: VariationthemeManagerComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'warehouse-inventory/add',
        component: WarehouseInventoryAddOrChangeComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'warehouse-inventory/change/:id',
        component: WarehouseInventoryAddOrChangeComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'warehouse-inventory',
        component: WarehouseInventoryComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'warehouse-vendor-inventory-manger',
        component: WarehouseVendorInventoryMangerComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'warehouse-vendor-inventory/:id',
        component: WarehouseVendorInventoryComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'category-register',
        component: VendorRegisterProductManagerComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'admin-menu',
        component: AdminMenuComponent,
        canActivate: [CheckPermissionService]
      }
    ]
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    EqualValidator,
    LayoutComponent,
    ValidatePasswordDirective,
    FileUploadComponent,
    MultipleFileUploadComponent,
    BaseComponent,
    BannerComponent,
    BannerItemComponent,
    BannerAddOrChangeComponent,
    BannerItemAddOrChangeComponent,
    VendorComponent,
    VendorAddOrChangeComponent,
    VendorDetailComponent,
    WarehouseComponent,
    WarehouseAddOrChangeComponent,
    WarehouseAddressComponent,
    TemplateDefineComponent,
    TemplateDefineHtmlComponent,
    WarehouseDetailComponent,
    VariationThemAddOrChangeComponent,
    VariationthemeManagerComponent,
    WarehouseInventoryAddOrChangeComponent,
    WarehouseInventoryAddOrChangeImeiComponent,
    WarehouseInventoryComponent,
    WarehouseInventoryAddQuantityComponent,
    WarehouseVendorInventoryMangerComponent,
    WarehouseVendorInventoryComponent,
    VendorCategoryRegisterComponent,
    VendorProductRegisterComponent,
    WarehouseVendorInventoryAddProductComponent,
    AdminMenuComponent,
    VendorRegisterProductManagerComponent,
    VariationThemAttributeComponent,
    FileUploaderPopupComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule.forRoot(routesConfig),
    NgxPaginationModule,
    CKEditorModule,
    NgbModule.forRoot(),
    FileUploadModule,
    AutoCompleteModule,
    CustomFormsModule
  ],
  exports: [
    RouterModule,
    EqualValidator
  ]
})

export class AppRoutingModule {

}
