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
      documentId: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    // Get pump ID from route
    this.pumpId = +this.route.snapshot.paramMap.get('productId')!;
    this.loadPumpData();
  }

  loadPumpData(): void {
    this.pumpService.getPump(this.pumpId).subscribe({
      next: (pump: Pump) => {
        this.updateForm.patchValue(pump); // Populate the form with the retrieved data
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
      error: (err) => console.error('Error uploading image:', err),
    });
  }

  onDocumentUpload(event: any): void {
    this.documentFile = event.target.files[0];
    this.pumpService.uploadDocument(this.documentFile).subscribe({
      next: (id) => this.updateForm.patchValue({ documentId: id }),
      error: (err) => console.error('Error uploading document:', err),
    });
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      this.pumpService.updatePump(this.pumpId, this.updateForm.value).subscribe({
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
