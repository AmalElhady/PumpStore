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
import { fileURLToPath } from 'node:url';




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
      productName: ['', Validators.required],
      model: ['', Validators.required],
      imageURL: ['', Validators.required],
      inletSize: [0, Validators.required],
      outletSize: [0, Validators.required],
      construction: ['', Validators.required],
      documentation: this.fb.group({ // Nested FormGroup
        fileUrl: ['', Validators.required], // Add any required fields inside this object
      })
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
      next: (url: string) => {
        this.productForm.get('documentation')?.patchValue({ fileUrl: url });
      },
      error: (err) => console.error(err),
    });
  }
  
  onSubmit(): void {
    console.log(this.productForm.value); // Log form data for debugging
    if (this.productForm.valid) {
      const formData = { ...this.productForm.value };

      // Extract the URL values
      formData.imageURL = this.productForm.value.imageURL.url; // Access the 'url' from imageURL object
      formData.documentation.fileUrl = this.productForm.value.documentation.fileUrl.url; // Access 'url' from fileUrl

      console.log("new pump: ", formData);
      this.pumpService.createPump(formData).subscribe({
        next: (response) => {
          console.log('Product created successfully!', response);
          this.router.navigate(['/pumps']);
        },
        error: (err) => console.error('Error:', err),
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
