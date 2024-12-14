import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PumpService } from '../services/pump.service'; // Adjust the path as necessary
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-delete-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.scss'
})
export class DeleteProductComponent {
  deleteSuccess: boolean = false;
  deleteError: string | null = null;

  constructor(private pumpService: PumpService) {}

  onDelete(productId: number): void {
    this.deleteSuccess = false;
    this.deleteError = null;

    if (confirm(`Are you sure you want to delete the product with ID: ${productId}?`)) {
      this.pumpService.deletePump(productId).subscribe({
        next: () => {
          this.deleteSuccess = true;
        },
        error: (err) => {
          this.deleteError = `Error deleting product: ${err.message}`;
        },
      });
    }
  }
}
