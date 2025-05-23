import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgxPageScrollModule } from 'ngx-page-scroll';

// modules
import { GlobalModule } from 'nrpti-angular-components';
import { CommonModule } from '../../../common/src/app/common.module';
import { SharedModule } from './shared.module';
import { AppRoutingModule } from './app-routing.module';
import { ApplicationsModule } from './applications/applications.module';
import { ProjectModule } from './project/project.module';
import { Utils } from 'nrpti-angular-components';

// components
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';

// services
import { ApiService } from './services/api';
import { UrlService } from './services/url.service';
import { DataService } from './services/data.service';
import { FaqComponent } from './faq/faq.component';
import { SearchService, ConfigService, LoggerService } from 'nrpti-angular-components';
import { MapLayerInfoService } from './services/map-layer-info.service';
import { RouterModule } from '@angular/router';

export function initConfig(configService: ConfigService) {
  return () => configService.init();
}

@NgModule({
  imports: [
    AppRoutingModule, // <-- module import order matters - https://angular.io/guide/router#module-import-order-matters
    BrowserAnimationsModule,
    BrowserModule,
    GlobalModule,
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NgbModule,
    NgxPageScrollCoreModule.forRoot({ scrollOffset: 50, easingLogic: easingLogic }),
    NgxPageScrollModule,
    SharedModule,
    ApplicationsModule,
    ProjectModule
    // BootstrapModalModule.forRoot({ container: document.body })
  ],
  declarations: [AppComponent, ContactComponent, HeaderComponent, FooterComponent, FaqComponent, HomeComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [ConfigService],
      multi: true
    },
    ApiService,
    UrlService,
    DataService,
    SearchService,
    LoggerService,
    MapLayerInfoService,
    Utils
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function easingLogic(t: number, b: number, c: number, d: number): number {
  // easeInOutExpo easing
  if (t === 0) {
    return b;
  }
  if (t === d) {
    return b + c;
  }
  t /= d / 2;
  if (t < 1) {
    return (c / 2) * Math.pow(2, 8 * (t - 1)) + b;
  }
  return (c / 2) * (-Math.pow(2, -8 * --t) + 2) + b;
}
