import { DataStoreService } from './data-store.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AyaxRootComponent } from './ayax-root/ayax-root.component';
import { RealtorsListComponent } from './realtors-list/realtors-list.component';
import { RealtorsDetailComponent } from './realtors-detail/realtors-detail.component';

import { FormsModule } from '@angular/forms';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { SelectModule } from 'ng2-select';

import { defineLocale } from 'ngx-bootstrap/bs-moment';
import { ru } from 'ngx-bootstrap/locale';
import { ModalModule } from 'ngx-bootstrap/modal';

defineLocale('ru', ru);

const appRoutes: Routes = [
  { path: 'realtor', component: RealtorsListComponent },
  { path: 'realtor/:id', component: RealtorsDetailComponent },
  {
    path: 'realtors',
    component: RealtorsListComponent,
    data: { title: 'Справочник реэлтеров' }
  },
  { path: '',
    redirectTo: '/realtor',
    pathMatch: 'full'
  },
  { path: '**', component: AyaxRootComponent }
];

@NgModule({
  declarations: [
    AppComponent, AyaxRootComponent, RealtorsListComponent,
    RealtorsDetailComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: true } ),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BsDatepickerModule.forRoot(), SelectModule, ModalModule.forRoot()
  ],
  providers: [
    DataStoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }