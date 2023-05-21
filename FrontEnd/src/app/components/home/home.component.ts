import { Component, OnInit } from '@angular/core';
import { InventoryDataService } from 'src/app/inventoryData/inventory-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private service:InventoryDataService) { }
  carData:any=[];

  ngOnInit(): void {
    this.refreshInventory();
  }

  refreshInventory() {
    this.service.getInventory().subscribe(data=> {
      this.carData=data;
    })
  }

}
