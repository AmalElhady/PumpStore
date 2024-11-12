import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Pump } from '../Models/pump';
import { PumpService } from '../services/pump.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  pump?:Pump;
  constructor(private pumpService:PumpService, private activatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    this.loadPump();
   }
  
   loadPump(){
     const id = this.activatedRoute.snapshot.paramMap.get('id');
     if(id)
       this.pumpService.getPump(+id).subscribe({
        next: pump =>  this.pump = pump,
        error: error => console.log(error) 
      })
   }
 
}
