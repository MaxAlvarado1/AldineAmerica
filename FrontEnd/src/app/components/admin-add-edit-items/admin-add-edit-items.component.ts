import { Component, Input, OnInit } from '@angular/core';
import { InventoryDataService } from 'src/app/inventoryData/inventory-data.service';
import { AdminComponent } from '../admin/admin.component';

@Component({
  selector: 'app-admin-add-edit-items',
  templateUrl: './admin-add-edit-items.component.html',
  styleUrls: ['./admin-add-edit-items.component.scss']
})
export class AdminAddEditItemsComponent implements OnInit {

  invalid = false;

  constructor(private service:InventoryDataService, private component: AdminComponent) { }

  buttonText: string;

  @Input() item:any;
  ID: number;
  carMake: string;
  carModel: string;
  carYear: number;
  carPartName: string;
  carPartType: string;
  carImageDate: string;
  carImage1: string;
  carImage2: string;
  carImage3: string;
  carImage4: string;
  carImage5: string;
  carImage6: string;
  carImage7: string;
  carImage8: string;
  carImage9: string;
  carImage10: string;
  carDesc: string;
  spotlight: boolean=true;

  Images: any=[];
  captions = ["Exterior - Front Left", "Exterior - Rear Left", "Exterior - Front Right", "Exterior - Rear Right", "Interior - Dash", "Interior - Front", "Interior - Rear", "Under Hood", "Interior - Trunk/Bed", "Wheel"];
  captions2 = ["Image 1", "Image 2"]
  partName: any;

  ngOnInit(): void {
    this.ID = this.item.ID;
    this.carMake = this.item.carMake;
    this.carModel = this.item.carModel;
    this.carYear = this.item.carYear;
    this.carPartName = this.item.carPartName;
    this.carPartType = this.item.carPartType;
    this.carImageDate = this.item.carImageDate;

    this.getImages();
    this.Images[0] = this.item.carImage1;
    this.Images[1] = this.item.carImage2;
    this.Images[2] = this.item.carImage3;
    this.Images[3] = this.item.carImage4;
    this.Images[4] = this.item.carImage5;
    this.Images[5] = this.item.carImage6;
    this.Images[6] = this.item.carImage7;
    this.Images[7] = this.item.carImage8;
    this.Images[8] = this.item.carImage9;
    this.Images[9] = this.item.carImage10;

    this.carDesc = this.item.carDesc;
    this.spotlight = this.item.spotlight;

    if(this.ID == 0) {
      this.buttonText = "Add New Item";
    } else {
      this.buttonText = "Save Changes";
    }

    this.partName = document.getElementById("partName");
    this.selectType(this.carPartType, this.partName)
    if(this.carPartType != "Total Vehicle") {
      this.partName.removeAttribute('disabled');
    }
  }

  getImages() {
    this.Images = [];
    if(this.item.carImage1 != undefined) {
      this.Images.push(this.item.carImage1)
    }
    else {
      this.Images.push('')
    }
    if(this.item.carImage2 != undefined) {
      this.Images.push(this.item.carImage2)
    }
    else {
      this.Images.push('')
    }
    if(this.item.carImage3 != undefined) {
      this.Images.push(this.item.carImage3)
    }
    else {
      this.Images.push('')
    }
    if(this.item.carImage4 != undefined) {
      this.Images.push(this.item.carImage4)
    }
    else {
      this.Images.push('')
    }
    if(this.item.carImage5 != undefined) {
      this.Images.push(this.item.carImage5)
    }
    else {
      this.Images.push('')
    }
    if(this.item.carImage6 != undefined) {
      this.Images.push(this.item.carImage6)
    }
    else {
      this.Images.push('')
    }
    if(this.item.carImage7 != undefined) {
      this.Images.push(this.item.carImage7)
    }
    else {
      this.Images.push('')
    }
    if(this.item.carImage8 != undefined) {
      this.Images.push(this.item.carImage8)
    }
    else {
      this.Images.push('')
    }
    if(this.item.carImage9 != undefined) {
      this.Images.push(this.item.carImage9)
    }
    else {
      this.Images.push('')
    }
    if(this.item.carImage10 != undefined) {
      this.Images.push(this.item.carImage10)
    }
    else {
      this.Images.push('')
    }
  }


  selectType(value: string, name:HTMLInputElement) {
    if(value != "Total Vehicle") {
      name.removeAttribute('disabled');
      this.Images = this.Images.slice(0, 2);
    }
    if(value == "Total Vehicle") {
      name.setAttribute("disabled", 'true');
      this.carPartName = "Total Vehicle";
      this.getImages();
    }
  }

  addItem() {
    if(this.carMake.trim() == '') {
      this.invalid = true;
      return;
    }
    if(this.carModel.trim() == '') {
      this.invalid = true;
      return;
    }
    if(this.carYear == null) {
      this.invalid = true;
      return;
    }
    if(this.carPartName.trim() == '') {
      this.invalid = true;
      return;
    }
    if(this.carPartType == 'Total Vehicle') {
      if(this.Images[0] == '') {
        this.invalid = true;
        return;
      }
      if(this.Images[1] == '') {
        this.invalid = true;
        return;
      }
      if(this.Images[2] == '') {
        this.invalid = true;
        return;
      }
      if(this.Images[3] == '') {
        this.invalid = true;
        return;
      }
      if(this.Images[4] == '') {
        this.invalid = true;
        return;
      }
      if(this.Images[5] == '') {
        this.invalid = true;
        return;
      }
      if(this.Images[6] == '') {
        this.invalid = true;
        return;
      }
      if(this.Images[7] == '') {
        this.invalid = true;
        return;
      }
      if(this.Images[8] == '') {
        this.invalid = true;
        return;
      }
      if(this.Images[9] == '') {
        this.invalid = true;
        return;
      }
    }
    else {
      if(this.Images[0] == '') {
        this.invalid = true;
        return;
      }
      if(this.Images[1] == '') {
        this.invalid = true;
        return;
      }
    }
    if(this.carDesc.trim() == '') {
      this.invalid = true;
      return;
    }

    var val = {
      ID: this.ID,
      carMake: this.carMake.trim(),
      carModel: this.carModel.trim(),
      carYear: this.carYear,
      carPartName: this.carPartName.trim(),
      carPartType: this.carPartType.trim(),
      carImageDate: this.carImageDate.trim(),
      carImage1: this.Images[0],
      carImage2: this.Images[1],
      carImage3: this.Images[2],
      carImage4: this.Images[3],
      carImage5: this.Images[4],
      carImage6: this.Images[5],
      carImage7: this.Images[6],
      carImage8: this.Images[7],
      carImage9: this.Images[8],
      carImage10: this.Images[9],
      carDesc: this.carDesc.trim(),
      spotlight: this.spotlight
    }
    console.log(val);
    this.service.addInventory(val).subscribe(res=> {
      alert(res.toString());
      console.log(val);
      this.component.closeModal();
    });
  }

  editItem() {
    if(this.carMake.trim() == '') {
      this.invalid = true;
      return;
    }
    if(this.carModel.trim() == '') {
      this.invalid = true;
      return;
    }
    if(this.carYear == null) {
      this.invalid = true;
      return;
    }
    if(this.carPartName.trim() == '') {
      this.invalid = true;
      return;
    }
    if(this.carPartType == 'Total Vehicle') {
      if(this.Images[0] == '') {
        this.invalid = true;
        return;
      }
      if(this.Images[1] == '') {
        this.invalid = true;
        return;
      }
      if(this.Images[2] == '') {
        this.invalid = true;
        return;
      }
      if(this.Images[3] == '') {
        this.invalid = true;
        return;
      }
      if(this.Images[4] == '') {
        this.invalid = true;
        return;
      }
      if(this.Images[5] == '') {
        this.invalid = true;
        return;
      }
      if(this.Images[6] == '') {
        this.invalid = true;
        return;
      }
      if(this.Images[7] == '') {
        this.invalid = true;
        return;
      }
      if(this.Images[8] == '') {
        this.invalid = true;
        return;
      }
      if(this.Images[9] == '') {
        this.invalid = true;
        return;
      }
    }
    else {
      if(this.Images[0] == '') {
        this.invalid = true;
        return;
      }
      if(this.Images[1] == '') {
        this.invalid = true;
        return;
      }
    }
    if(this.carDesc.trim() == '') {
      this.invalid = true;
      return;
    }

    this.getImages();
    var val = {
      ID: this.ID,
      carMake: this.carMake.trim(),
      carModel: this.carModel.trim(),
      carYear: this.carYear,
      carPartName: this.carPartName.trim(),
      carPartType: this.carPartType.trim(),
      carImageDate: this.carImageDate.trim(),
      carImage1: this.Images[0],
      carImage2: this.Images[1],
      carImage3: this.Images[2],
      carImage4: this.Images[3],
      carImage5: this.Images[4],
      carImage6: this.Images[5],
      carImage7: this.Images[6],
      carImage8: this.Images[7],
      carImage9: this.Images[8],
      carImage10: this.Images[9],
      carDesc: this.carDesc.trim(),
      spotlight: this.spotlight
    }
    this.service.editInventory(val).subscribe(res=> {
      alert(res.toString());
      this.component.closeModal();
    });
  }

  PhotoFileName: string;

  uploadImage(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);
    var idx = event.target.id[event.target.id.length -1];
    this.service.uploadImage(formData).subscribe((data: any) => {
      this.PhotoFileName = data.toString();
      this.Images[idx] = this.service.PhotoUrl+this.PhotoFileName; 
      console.log(this.Images[idx]);
    })
    console.log(this.Images[idx]);
  }


}
