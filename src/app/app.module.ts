import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CampaignService } from "./shared/campaign/campaign.service";
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignEditComponent } from './campaign-edit/campaign-edit.component';

import { MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatToolbarModule, MatGridListModule,
  MatSlideToggleModule, MatSelectModule, MatAutocompleteModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import 'hammerjs';

const appRoutes: Routes = [
  {path: '', redirectTo: '/campaign-list', pathMatch: 'full'},
  {
    path: 'campaign-list',
    component: CampaignListComponent
  },
  {
    path: 'campaign-add',
    component: CampaignEditComponent
  },
  {
    path: 'campaign-edit/:id',
    component: CampaignEditComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CampaignListComponent,
    CampaignEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatSlideToggleModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CampaignService],
  bootstrap: [AppComponent]
})
export class AppModule { }
