import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventoryDataService } from 'src/app/inventoryData/inventory-data.service';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss']
})
export class ItemPageComponent implements OnInit {

  constructor(private param:ActivatedRoute,private service:InventoryDataService) { }
  getItemId:any;
  carData: any=[];
  Images: any=[];
  captions = ["Exterior - Front Left", "Exterior - Rear Left", "Exterior - Front Right", "Exterior - Rear Right", "Interior - Dash", "Interior - Front", "Interior - Rear", "Under Hood", "Interior - Trunk/Bed", "Wheel"];

  ngOnInit(): void {
    this.refreshInventory();
  }

  refreshInventory() {
    this.service.getInventory().subscribe(data=> {
      this.carData = data;

      this.getItemId = this.param.snapshot.paramMap.get('id');
      if(this.getItemId) {
        this.carData = this.carData.filter((value: any)=>{
          return value.ID == this.getItemId;
        });
      }

      this.carData.forEach((data: any) => {
        if(data.carImage1 != undefined) {
          this.Images.push(data.carImage1)
        }
        if(data.carImage2 != undefined) {
          this.Images.push(data.carImage2)
        }
        if(data.carImage3 != '') {
          this.Images.push(data.carImage3)
        }
        if(data.carImage4 != '') {
          this.Images.push(data.carImage4)
        }
        if(data.carImage5 != '') {
          this.Images.push(data.carImage5)
        }
        if(data.carImage6 != '') {
          this.Images.push(data.carImage6)
        }
        if(data.carImage7 != '') {
          this.Images.push(data.carImage7)
        }
        if(data.carImage8 != '') {
          this.Images.push(data.carImage8)
        }
        if(data.carImage9 != '') {
          this.Images.push(data.carImage9)
        }
        if(data.carImage10 != '') {
          this.Images.push(data.carImage10)
        }
      });
    })
  }

}
