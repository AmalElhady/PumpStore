
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccessoryService } from '../services/accessory.service';
import { Accessories } from '../Models/accessories';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Pagination } from '../Models/paging';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { Accessorydto } from '../Models/accessorydto';
import { fileURLToPath } from 'node:url';

@Component({
  selector: 'app-create-accessory',
  standalone: true,
  imports: [PaginationModule, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './create-accessory.component.html',
  styleUrl: './create-accessory.component.scss'
})
export class CreateAccessoryComponent {
  accessoryForm: FormGroup;
  imageFile!: File;
  
  accessories: Pagination = new Pagination();

  constructor(private fb: FormBuilder, private accessoryService: AccessoryService, private router: Router) {
    this.accessoryForm = this.fb.group({
      name: ['', Validators.required],
      model: ['', Validators.required],
      pumpName: ['', Validators.required],
      imageURL: ['', Validators.required],
      size: [0, Validators.required],
      construction: ['', Validators.required],
      category: this.fb.group({ // Nested FormGroup
        Name: ['', Validators.required], // Add any required fields inside this object
      })
    });
  }

  onImageUpload(event: any): void {
    this.imageFile = event.target.files[0];
    this.accessoryService.uploadImage(this.imageFile).subscribe({
      next: (url: string) => {
        this.accessoryForm.patchValue({ imageURL: url });
      },
      error: (err) => console.error(err),
    });
  }
  
  onSubmit(): void {
    console.log(this.accessoryForm.value); // Log form data for debugging
    if (this.accessoryForm.valid) {
      const formData = { ...this.accessoryForm.value };

      // Extract the URL values
      formData.imageURL = this.accessoryForm.value.imageURL.url; // Access the 'url' from imageURL object
      
      console.log("new accessory: ", formData);
      this.accessoryService.createAccessory(formData).subscribe({
        next: (response) => {
          console.log('Accessory created successfully!', response);
          this.router.navigate(['/accessories']);
        },
        error: (err) => console.error('Error:', err),
       
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
