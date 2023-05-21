import { Component, OnInit } from '@angular/core';
import { InventoryDataService } from 'src/app/inventoryData/inventory-data.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit{
  constructor(private service:InventoryDataService) { }
  inventory: any=[];
  carData: any=[];
  makes:any=[];
  models:any=[];
  makesModels: any;
  modelsYears: any;
  selectedMake: any;
  selectedModels: any=[];
  selectedModel: any;
  selectedYears: any=[];
  years: any=[];

  searchMake: any;
  searchModel: any;
  searchYear: any;
  searchPartType: any;

  page: number = 1;
  count: number = 0;
  itemSize: number = 24;
  itemSizes: any = [5, 10, 15, 20];

  ngOnInit(): void {
    this.refreshInventory();
  }

  refreshInventory() {
    this.service.getInventory().subscribe(data=> {
      this.carData=data;

      this.carData.forEach((data: any) => {
        this.makes.push(data.carMake);
      })
      this.makes = this.unique(this.makes);
  
      this.makesModels = this.carData.reduce((acc: any, item: any=[], index: any) => {
        if (item) {
          const object = acc.obj;
      
          if (object[item.carMake] === undefined) {
            const record = { make: item.carMake, models: [] }
            object[item.carMake] = record;
            acc.array.push(record);
          }
          
          const record = object[item.carMake];
          record.models.push(item.carModel);
          record.models = this.unique(record.models);
        }
        return acc;
      }, { obj: {}, array: [] }).array;
  
      this.modelsYears = this.carData.reduce((acc: any, item: any=[], index: any) => {
        if (item) {
          const object = acc.obj;
      
          if (object[item.carModel] === undefined) {
            const record = { model: item.carModel, years: [] }
            object[item.carModel] = record;
            acc.array.push(record);
          }
          
          const record = object[item.carModel];
          record.years.push(item.carYear);
          record.years = this.unique(record.years);
        }
        return acc;
      }, { obj: {}, array: [] }).array;
  
      let a = this.carData[0].carYear;
      let b = this.carData[0].carYear;
  
      this.carData.forEach((data: any) => {
        if (data.carYear <= a) {
          a = data.carYear
        }
        if (data.carYear >= b) {
          b = data.carYear
        }
      })
  
      this.years = Array.from({length:b-a+1},(v,k)=>k+a)
    })
  }

  unique = (array: any) => (
    [...new Set(array)]
  )

  makeSelection(answer: any) {
    this.selectedMake = answer.target.value;
    if(this.selectedMake == "All") {
      this.selectedModels = [];
      this.selectedYears = [];
    }
    else {
      this.selectedYears = [];
      this.makesModels.forEach((data: any)=> {
        if(data.make == this.selectedMake) {
          this.selectedModels = [];
          this.selectedModels.push(data.models)
        }
      })
    }
    this.selectedYears = this.unique(this.selectedYears);
    this.selectedYears = this.selectedYears.sort();
  };

  modelSelection(answer: any) {
    this.selectedModel = answer.target.value;
    if(this.selectedModel == "All") {
      this.selectedYears = [];
    }
    else {
      this.selectedYears = [];
      this.modelsYears.forEach((data: any)=> {
        if(data.model == this.selectedModel) {
          this.selectedYears = [];
          this.selectedYears.push(data.years)
        }
      })
    }
    this.selectedYears = this.unique(this.selectedYears);
    this.selectedYears = this.selectedYears.sort();
  }
  
  onTableDataChange(event: any) {
    window.scrollTo(0, 0);
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.itemSize = event.target.value;
    this.page = 1;
  }

  search(event: any): void {
    this.ngOnInit();
    this.searchMake = document.getElementById("make");
    this.searchModel = document.getElementById("model");
    this.searchYear = document.getElementById("year");
    this.searchPartType = document.getElementById("partType");

    if(this.searchMake.value == "All" && this.searchPartType.value == "All") {
      this.ngOnInit();
    } 
    else {
      if(this.searchMake.value != "All") {
        if (this.searchModel.value == "All" && this.searchYear.value == "All" && this.searchPartType.value == "All") {
          this.service.getInventory().subscribe(data=> {
            this.carData=data;
            this.carData = this.carData.filter((car: any) => 
            car.carMake == this.searchMake.value
            )
          })
        }
        else if (this.searchPartType.value != "All") {
          this.service.getInventory().subscribe(data=> {
            this.carData=data;
            this.carData = this.carData.filter((car: any) => 
            car.carPartType == this.searchPartType.value
            && car.carMake == this.searchMake.value
            )
          })
        }
        else {
          if (this.searchModel.value != "All" && this.searchPartType.value == "All") {
            this.service.getInventory().subscribe(data=> {
              this.carData=data;
              this.carData = this.carData.filter((car: any) => 
              car.carMake == this.searchMake.value
              && car.carModel == this.searchModel.value
              )
            })
          }
          else if (this.searchPartType.value != "All") {
            this.service.getInventory().subscribe(data=> {
              this.carData=data;
              this.carData = this.carData.filter((car: any) => 
              car.carMake == this.searchMake.value
              && car.carModel == this.searchModel.value
              && car.carPartType == this.searchPartType.value
              )
            })
          }
          if (this.searchYear.value != "All" && this.searchPartType.value == "All") {
            this.service.getInventory().subscribe(data=> {
              this.carData=data;
              this.carData = this.carData.filter((car: any) => 
              car.carMake == this.searchMake.value
              && car.carModel == this.searchModel.value
              && car.carYear == this.searchYear.value
              )
            })
          }
          else if (this.searchPartType.value != "All") {
            this.service.getInventory().subscribe(data=> {
              this.carData=data;
              this.carData = this.carData.filter((car: any) => 
              car.carMake == this.searchMake.value
              && car.carModel == this.searchModel.value
              && car.carYear == this.searchYear.value
              && car.carPartType == this.searchPartType.value
              )
            })
          }
        }
      }
      else if (this.searchPartType.value != "All") {
        this.service.getInventory().subscribe(data=> {
          this.carData=data;
          this.carData = this.carData.filter((car: any) => 
          car.carPartType == this.searchPartType.value
          )
        })
      }
    }
  }
}

