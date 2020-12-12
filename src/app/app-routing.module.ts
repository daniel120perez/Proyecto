import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { pathToFileURL } from 'url';

import { LandingpageComponent } from './landingpage/landing.page.component';

const routes: Routes = [

    {path: 'hola', component : LandingpageComponent }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]

})
export class AppRoutingModule{}