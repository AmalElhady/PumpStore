import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '../services/account.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  constructor(public accountService:AccountService) {
//     const navbarLinks = document.querySelectorAll('.navbar-nav a');
// // Get the current URL path
// const currentPath = window.location.pathname;

// // Loop through the links and set the active class
// navbarLinks.forEach(link => {
//     if (link.getAttribute('href') === currentPath) {
//         link.classList.add('active');
//     } else {
//         link.classList.remove('active');
//     }
// }); 
  }
  
}

