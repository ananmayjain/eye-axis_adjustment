import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";


import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './/app-routing.module';
import { AboutComponent } from './about/about.component';
import { MenuService } from './services/menu.service';
import { DiagnosticComponent } from './diagnostic/diagnostic.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingService } from './services/setting.service';
import { DiagosticService } from './services/diagostic.service';


@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        WelcomeComponent,
        AboutComponent,
        DiagnosticComponent,
        SettingsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
        // Provide the index of menu item that should be "active"
        MenuService,
        SettingService,
        DiagosticService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
