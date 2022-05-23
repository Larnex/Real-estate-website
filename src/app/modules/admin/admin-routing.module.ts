import { AddUserComponent } from './components/add-user/add-user.component';
import { AddPropertyComponent } from './components/add-property/add-property.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { AdminGuard } from './../../guards/admin.guard';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditPageComponent } from './components/edit-page/edit-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'dashboard',
        component: AdminPanelComponent,
      },
      {
        path: 'add',
        component: AddPropertyComponent,
      },
      {
        path: 'property/:id/edit',
        component: EditPageComponent,
      },
      {
        path: 'add-user',
        component: AddUserComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
