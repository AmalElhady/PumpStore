import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavBarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
  
})
export class AppComponent implements OnInit{
  title = 'PumpStore';
  // private apiUrl = 'http://localhost:5187/api/product'; 

  products:any[]=[]
  constructor(private http:HttpClient){

  }
  
  ngOnInit(): void {
    this.http.get("http://localhost:5187/api/product").subscribe(
      {
        next:(response:any)=>this.products=response.data,
        error:error=>console.log(error),
        complete:()=>
        {
          console.log("completed")
        }
        
      }
    )
  }


}
