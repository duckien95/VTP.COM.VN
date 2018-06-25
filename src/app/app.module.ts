import { NgModule } from '@angular/core';

import { EqualValidator } from './directives/equal-validator.directive';

import { Convert } from './common/Convert';
import { ConfigSetting } from './common/configSetting';
import { HttpClientService } from './common/http-client.service';

import { CheckPermissionService } from './services/check-permission.service';
import { LoginRedirectService } from './services/login-redirect.service';
import { AccountService } from './services/account.service';
import { ShardingConfigService } from './services/sharding-config.service';
import { MenuService } from './services/menu.service';
import { CustomerService } from './services/customer.service';
import { RoleService } from './services/role.service';
import { LanguageService } from './services/language.service';
import { ProductService } from './services/product.service';
import { ProductAttributeService } from './services/product-attribute.service';
import { AttributeCategoryMappingService } from './services/attribute-category-mapping.service';
import { VariationThemeService } from './services/variation-theme.service';
import { ManufacturerService } from './services/manufacturer.service';
import { FileService } from './services/file.service';
import { TemplateService } from './services/marketing-management/page-builder/template.service';
import { LocaleStringResourceService } from './services/locale-string-resource.service';
import { VendorService } from './services/vendor.service';
import { CategoryService } from './services/category.service';
import { BannerService } from './services/marketing-management/banner/banner.service';
import { MeasureUnitService } from './services/measure-unit.service';
import { EmailOrSmsService } from './services/email-or-sms.service';
import { LocationService } from './services/location.service';
import { ProductGroupService } from './services/product-group.service';
// import { ManufacturerManagementService } from './services/manufacturer-management.service';
import { WarehouseService } from './services/warehouse.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ConfigService } from './services/config.service';
import { TemplateDefineService } from './services/marketing-management/template-define.service';
import { CommissionService } from './services/commission.service';
import { ManufacturerManagementService } from './services/manufacturer-management.service';
import { WarehouseInventoryService } from './services/warehouse-inventory.service';
import { RegionsTypeService } from './services/regions-type.service';
import { AdminMenuService } from './services/admin-menu.service';
import { BinLocationTypeService } from './services/binlocation-type.service';

import { DistanceService } from './services/distance.service';
import { ListServiceComponent } from './components/list-service/list-service.component';
import { ServiceDetailComponent } from './components/list-service/service-detail/service-detail.component';
// import { WarehouseVendorService } from './services/warehouse-vendor.service';

@NgModule({
  declarations: [
    AppComponent,
    ListServiceComponent,
    ServiceDetailComponent,
  ],
  imports: [
    AppRoutingModule
  ],
  providers: [
    HttpClientService,
    CheckPermissionService,
    LoginRedirectService,
    AccountService,
    ShardingConfigService,
    MenuService,
    CustomerService,
    RoleService,
    LanguageService,
    FileService,
    MeasureUnitService,
    EmailOrSmsService,
    CategoryService,
    TemplateService,
    BannerService,
    VendorService,
    LocaleStringResourceService,
    ProductAttributeService,
    ProductService,
    AttributeCategoryMappingService,
    VariationThemeService,
    ManufacturerService,
    ProductGroupService,
    ManufacturerManagementService,
    LocationService,
    ProductGroupService,
    WarehouseService,
    ConfigService,
    TemplateDefineService,
    CommissionService,
    WarehouseInventoryService,
    // WarehouseVendorService,
    RegionsTypeService,
    AdminMenuService,
    BinLocationTypeService,
    DistanceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
