import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'FrontEnd';

  admin: boolean = true;

  constructor(private router: Router ) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )

    .subscribe(event => {  
      if(this.router.url == "/login" || this.router.url == "/admin") {
        this.admin = false;
      }
    });
  }

  ngOnInit(): void { 

  }
  
}

