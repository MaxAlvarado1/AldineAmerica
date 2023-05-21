import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InventoryDataService } from '../inventoryData/inventory-data.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private service: InventoryDataService) {}

  auth = false;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.auth == true) {
      return true;
    }
    else {
      this.router.navigate(['/login'])
      return false;
    }
  }

  check(form: any) {
    this.service.checkP(form).subscribe((data: any) =>{
      if(data[0].Column1 == 1) {
        this.auth = true;
        this.router.navigate(['/admin']);
      }
      else {
        return;
      }
    })
  }
  
}
