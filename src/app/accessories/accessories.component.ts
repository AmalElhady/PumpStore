import { Component, ElementRef, model, OnInit, ViewChild } from '@angular/core';
import { AccessoryService } from '../services/accessory.service';
import { AccountService } from '../services/account.service';
import { FormsModule } from '@angular/forms';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { AccessoryParams } from '../Models/accessory-params';
import { Pagination } from '../Models/accessPaging';
import { AccessFilterOptions } from '../Models/AccessFilterOptions';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-accessories',
  standalone: true,
  imports: [PaginationModule,
    FormsModule,
    CommonModule,
    RouterLink
    ],
  templateUrl: './accessories.component.html',
  styleUrl: './accessories.component.scss'
})
export class AccessoriesComponent implements OnInit {
  constructor(public accessoryservice: AccessoryService, public accountService: AccountService) {}
  

  @ViewChild('search')
  searchTerms!: ElementRef;
  accessories: Pagination = new Pagination();

  sortedOptions = [
    { name: "الابجدية", value: 'nameAsc' },
    { name: "الحجم : من الاقل للاكثر", value: 'sizeAsc' },
    { name: 'الحجم : من الاكثر للاقل', value: 'sizeDesc' },
    
  ];

  AccessFilterOptions:AccessFilterOptions = new AccessFilterOptions();
  AccessOriginalFilters:AccessFilterOptions = new AccessFilterOptions();

  accessoryparams:AccessoryParams = new AccessoryParams();
  accessorylist:any;
  totalcount: number = 0;


  ngOnInit(): void {
    console.log("Amal")
    this.getAccessories();
    console.log(this.accessorylist)
    console.log(this.totalcount)
    console.log(this.AccessFilterOptions);
  }
  getAccessories() {
    
    this.accessoryservice.getAccessories(this.accessoryparams).subscribe({
      next: (response) => {
        this.accessories.data = response.data;
        this.accessorylist = this.accessories.data;
        this.AccessFilterOptions = response.accessFilterOptions;
        this.totalcount = response.count;
      },
      error: (e) => console.error('Error fetching accessories:', e),
      complete: () => console.log('Accessory data fetching complete.', this.accessoryparams.PageIndex)
    });
  }

  onSortSelected(event: any) {
    const selectedSort = event.target.value;
    if (selectedSort.includes('Asc')) {
      this.accessoryparams.sortBy = selectedSort.replace('Asc', '');
      this.accessoryparams.sortDirection = 'asc';
    } 
    else if (selectedSort.includes('Desc')) {
      this.accessoryparams.sortBy = selectedSort.replace('Desc', '');
      this.accessoryparams.sortDirection = 'desc';
    }
    this.getAccessories();
  }
  resetFilters() {
    if(this.searchTerms) 
    this.searchTerms.nativeElement.value=""
    this.accessoryparams = new AccessoryParams(); 
    this.getAccessories(); 
  }
  pageChanged(event: PageChangedEvent){
    this.accessoryparams.PageIndex = Math.max(1, event.page);
    console.log("Current Page Index:", this.accessoryparams.PageIndex);
    this.getAccessories();  
  }
  onSearch() {
    this.accessoryparams.SearchValue = this.searchTerms.nativeElement.value;
    this.getAccessories();
    this.accessoryparams.PageIndex = Math.max(1);
  }
  getFilteredAccessories() {
    
    this.accessoryservice.getAccessories(this.accessoryparams).subscribe({
      next: (response) => {
        this.accessories.data = response.data;
        this.accessorylist = this.accessories.data;
        this.AccessFilterOptions = response.accessFilterOptions;
        this.totalcount = response.count;
      },
      error: (e) => console.error('Error fetching accessories:', e),
      complete: () => console.log('Accessory data fetching complete.', this.accessoryparams.PageIndex)
    });
    this.accessoryparams.PageIndex = Math.max(1);
  }
  deleteAccessory(id: number) {
    if (confirm('هل انت متأكد من انك تريد حذف هذا المنتج؟')) {
      this.accessoryservice.deleteAccessory(id).subscribe({
        next: () => alert('تم الحذف'),
        error: (err) => console.error(err),
      });
    }
    this.ngOnInit();
  }
}
