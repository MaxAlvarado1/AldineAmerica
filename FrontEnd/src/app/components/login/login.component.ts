import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InventoryDataService } from 'src/app/inventoryData/inventory-data.service';
import { Router } from '@angular/router';
import { AdminGuard } from '../admin.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "bi bi-eye-slash-fill";
  incorrect: boolean = false;

  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private service: InventoryDataService, private router: Router, private guard: AdminGuard) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      password: ['', Validators.required]
    })
  }

  hideShowPassword() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "bi bi-eye-fill" : this.eyeIcon = "bi bi-eye-slash-fill";
    this.isText ? this.type = "text" : this.type = "password";
  }

  auth = false;

  onSubmit(){
    this.guard.check(this.loginForm.value);

    this.service.checkP(this.loginForm.value).subscribe((data: any) =>{
      if(data[0].Column1 == 1) {
        this.incorrect = false;
      }
      else {
        this.incorrect = true;
        return;
      }
    })
  }

}
