import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { AccessoryService } from '../services/accessory.service';
import { Accessories } from '../Models/accessories';
@Component({
  selector: 'app-update-accessory',
  standalone: true,
  imports: [PaginationModule, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './update-accessory.component.html',
  styleUrl: './update-accessory.component.scss'
})
export class UpdateAccessoryComponent implements OnInit {
  updateForm: FormGroup;
  Id!: number;
  imageFile!: File;
  

  constructor(
    private fb: FormBuilder,
    private accessoryService: AccessoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialize the form
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      model: ['', Validators.required],
      pumpName: ['', Validators.required],
      imageURL: ['', Validators.required],
      size: [0, Validators.required],
      construction: ['', Validators.required],
      category: this.fb.group({ // Nested FormGroup
        Name: ['', Validators.required],// Add any required fields inside this object
      
      })
    });
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.url);
    const Id = this.route.snapshot.paramMap.get('id');
    console.log('Accessory ID from URL:', Id); 
    if (Id && !isNaN(+Id)) {
      this.Id = +Id;
      this.loadAccessoryData();
    } else {
      console.error('Invalid or missing Id:', Id);
    }
  }

  loadAccessoryData(): void {
    this.accessoryService.getAccessory(this.Id).subscribe({
      next: (accessory: Accessories) => {
        this.updateForm.patchValue(accessory);
      },
      error: (err) => console.error('Error fetching accessory data:', err),
    });
  }

  onImageUpload(event: any): void {
    this.imageFile = event.target.files[0];
    this.accessoryService.uploadImage(this.imageFile).subscribe({
      next: (url: string) => {
        this.updateForm.patchValue({ imageURL: url });
      },
      error: (err) => console.error(err),
    });
  }
  
  onSubmit(): void {
    console.log(this.updateForm.value);
    if (this.updateForm.valid) {
      const formData = { ...this.updateForm.value };
      formData.imageURL = this.updateForm.value.imageURL.url;
      

      this.accessoryService.updateAccessory(this.Id, formData).subscribe({
        next: () => {
          console.log('Accessory updated successfully!');
          this.router.navigate(['/accessories']);
        },
        error: (err) => console.error('Error updating accessory:', err),
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
