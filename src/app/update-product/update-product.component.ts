import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { PumpService } from '../services/pump.service';
import { Pump } from '../Models/pump';
@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [PaginationModule, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent implements OnInit {
  updateForm: FormGroup;
  pumpId!: number;
  imageFile!: File;
  documentFile!: File;

  constructor(
    private fb: FormBuilder,
    private pumpService: PumpService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialize the form
    this.updateForm = this.fb.group({
      productName: ['', Validators.required],
      model: ['', Validators.required],
      imageURL: ['', Validators.required],
      inletSize: [0, Validators.required],
      outletSize: [0, Validators.required],
      construction: ['', Validators.required],
      documentation: this.fb.group({ 
        fileUrl: ['', Validators.required], 
      })
    });
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.url);
    const productId = this.route.snapshot.paramMap.get('id');
    console.log('Product ID from URL:', productId); 
    if (productId && !isNaN(+productId)) {
      this.pumpId = +productId;
      this.loadPumpData();
    } else {
      console.error('Invalid or missing productId:', productId);
    }
  }

  loadPumpData(): void {
    this.pumpService.getPump(this.pumpId).subscribe({
      next: (pump: Pump) => {
        this.updateForm.patchValue(pump);
      },
      error: (err) => console.error('Error fetching pump data:', err),
    });
  }

  onImageUpload(event: any): void {
    this.imageFile = event.target.files[0];
    this.pumpService.uploadImage(this.imageFile).subscribe({
      next: (url: string) => {
        this.updateForm.patchValue({ imageURL: url });
      },
      error: (err) => console.error(err),
    });
  }
  
  onDocumentUpload(event: any): void {
    this.documentFile = event.target.files[0];
    this.pumpService.uploadDocument(this.documentFile).subscribe({
      next: (url: string) => {
        this.updateForm.get('documentation')?.patchValue({ fileUrl: url });
      },
      error: (err) => console.error(err),
    });
  }

  onSubmit(): void {
    console.log(this.updateForm.value);
    if (this.updateForm.valid) {
      const formData = { ...this.updateForm.value };
      formData.imageURL = this.updateForm.value.imageURL.url;
      formData.documentation.fileUrl = this.updateForm.value.documentation.fileUrl.url;

      this.pumpService.updatePump(this.pumpId, formData).subscribe({
        next: () => {
          console.log('Pump updated successfully!');
        },
        error: (err) => console.error('Error updating pump:', err),
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
