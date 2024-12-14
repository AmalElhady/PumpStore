import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PumpService } from '../services/pump.service';
import { Pump } from '../Models/pump';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Pagination } from '../Models/paging';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { Pumpdto } from '../Models/pumpdto';




@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [PaginationModule, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {
  productForm: FormGroup;
  imageFile!: File;
  documentFile!: File;
  pumps: Pagination = new Pagination();

  constructor(private fb: FormBuilder, private pumpService: PumpService, private router: Router) {
    this.productForm = this.fb.group({
      productName: [''],
      model: [''],
      imageURL: [''],
      inletSize: [0],
      outletSize: [0],
      construction: [''],
      documentURL: [''],
    });
  }

  onImageUpload(event: any): void {
    this.imageFile = event.target.files[0];
    this.pumpService.uploadImage(this.imageFile).subscribe({
      next: (url: string) => {
        this.productForm.patchValue({ imageURL: url });
      },
      error: (err) => console.error(err),
    });
  }
  
  onDocumentUpload(event: any): void {
    this.documentFile = event.target.files[0];
    this.pumpService.uploadDocument(this.documentFile).subscribe({
      next: (url: string) => this.productForm.patchValue({ documentURL: url }),
      error: (err) => console.error(err),
    });
  }
  
  onSubmit(): void {
    console.log(this.productForm.value); // Log form data for debugging
    if (this.productForm.valid) {
      console.log("new pump: ", this.productForm.value);
      this.pumpService.createPump(this.productForm.value).subscribe({
        next: (response) => {
          console.log('Product created successfully!', response);
        },
        error: (err) => console.error('Error:', err),
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
