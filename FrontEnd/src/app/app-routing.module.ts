import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ItemPageComponent } from './components/item-page/item-page.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuard } from './components/admin.guard';
import { ErrorComponent } from './error/error/error.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'inventory', component:InventoryComponent},
  {path: 'inventory/:id', component:ItemPageComponent},
  {path: 'contact', component:ContactComponent},
  {path: 'login', component:LoginComponent},
  {path: 'admin', component:AdminComponent, canActivate: [AdminGuard]},
  {path: '**', component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
