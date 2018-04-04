import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutComponent } from './about/about.component';
import { DiagnosticComponent } from './diagnostic/diagnostic.component';

const routes: Routes = [
    { path: "", redirectTo: "/welcome", pathMatch: "full"},
    { path: "welcome", component: WelcomeComponent},
    { path: "about", component: AboutComponent },
    { path: "diagnostic", component: DiagnosticComponent }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule,
    ],
    declarations: []
})
export class AppRoutingModule { }
