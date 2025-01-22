import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccessoryService } from '../services/accessory.service'; // Adjust the path as necessary
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-delete-accessory',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './delete-accessory.component.html',
  styleUrl: './delete-accessory.component.scss'
})
export class DeleteAccessoryComponent {
  deleteSuccess: boolean = false;
  deleteError: string | null = null;

  constructor(private accessoryService: AccessoryService , private router: Router) {}

  onDelete(Id: number): void {
    this.deleteSuccess = false;
    this.deleteError = null;

    if (confirm(`Are you sure you want to delete the accessory with ID: ${Id}?`)) {
      this.accessoryService.deleteAccessory(Id).subscribe({
        next: () => {
          this.deleteSuccess = true;
          this.router.navigate(['/accessories']);
        },
        error: (err) => {
          this.deleteError = `Error deleting Accessory: ${err.message}`;
        },
      });
    }
  }
}
