import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '../services/account.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  constructor(public accountService:AccountService , private router: Router ) {

  }
  isActive(path: string): boolean {
    return this.router.url === path;
  }
  isMenuCollapsed = true;
  
}

