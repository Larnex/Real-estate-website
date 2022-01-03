import { MaterialExampleModule } from './../../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { AddPropertyComponent } from './components/add-property/add-property.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';

@NgModule({
  declarations: [
    AdminPanelComponent,
    AdminLayoutComponent,
    AddPropertyComponent,
    EditPageComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialExampleModule,
  ],
})
export class AdminModule {}
