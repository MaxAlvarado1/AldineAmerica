import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryDataService {

  readonly APIurl = "api";
  readonly PhotoUrl = "https://www.aldineamerica.com/SaveFile/";

  constructor(private http:HttpClient) { }

  getInventory():Observable<any[]>{
    return this.http.get<any>(this.APIurl+'/Inventory');
  }

  addInventory(val: any){
    return this.http.post(this.APIurl+'/Inventory',val)
  }

  editInventory(val: any){
    return this.http.put(this.APIurl+'/Inventory',val)
  }

  deleteInventory(val: any){
    return this.http.delete(this.APIurl+'/Inventory/'+val)
  }

  uploadImage(val: any){
    return this.http.post(this.APIurl+'/Inventory/SaveFile',val)
  }

  checkP(val: any){
    return this.http.post(this.APIurl+'/Admin',val)
  }

}
