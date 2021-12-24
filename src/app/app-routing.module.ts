import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AdminModule } from './modules/admin/admin.module';
import { PropertiesComponent } from './components/properties/properties.component';

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: '',
        component: MainPageComponent,
      },
      { path: 'property/:id', component: PropertyDetailsComponent },
      { path: 'properties', component: PropertiesComponent },
    ],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
