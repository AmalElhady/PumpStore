import { Component, ElementRef, model, OnInit, ViewChild } from '@angular/core';
import { PumpService } from '../services/pump.service';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { PumpParams } from '../Models/pump-params';
import { Pagination } from '../Models/paging';
import { FilterOptions } from '../Models/FilterOptions';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-pumps',
  standalone: true,
  imports: [ // Add this to ensure HttpClient is available
    PaginationModule,
    FormsModule,
    CommonModule,
    RouterLink],
  templateUrl: './pumps.component.html',
  styleUrls: ['./pumps.component.scss']
})
 export class PumpsComponent implements OnInit {
  constructor(public pumpservice: PumpService) {}
  @ViewChild('search')
  searchTerms!: ElementRef;
  pumps: Pagination = new Pagination();

  @ViewChild('All')
  all!:ElementRef

  sortedOptions = [
    { name: "Alphabetical", value: 'nameAsc' },
    { name: 'Inlet : Low to High', value: 'inletAsc' },
    { name: 'Inlet : High to Low', value: 'inletDesc' },
    { name: 'Outlet : Low to High', value: 'outletAsc' },
    { name: 'Outlet : High to Low', value: 'outletDesc' },
  ];

  FilterOptions:FilterOptions = new FilterOptions();
  originalFilters:FilterOptions = new FilterOptions();

  pumpparams:PumpParams = new PumpParams();
  pumplist:any;
  totalcount: number = 0;


  ngOnInit(): void {
    console.log("Amal")
    this.getPumps();
  }
  getPumps() {
    
    this.pumpservice.getPumps(this.pumpparams).subscribe({
      next: (response) => {
        this.pumps.data = response.data;
        this.pumplist = this.pumps.data;
        this.FilterOptions = response.filterOptions;
        this.totalcount = response.count;
      },
      error: (e) => console.error('Error fetching cars:', e),
      complete: () => console.log('Pump data fetching complete.')
    });
  }

  onSortSelected(event: any) {
    const selectedSort = event.target.value;
    if (selectedSort.includes('Asc')) {
      this.pumpparams.sortBy = selectedSort.replace('Asc', '');
      this.pumpparams.sortDirection = 'asc';
    } 
    else if (selectedSort.includes('Desc')) {
      this.pumpparams.sortBy = selectedSort.replace('Desc', '');
      this.pumpparams.sortDirection = 'desc';
    }
    this.getPumps();
  }
  resetFilters() {
    if(this.searchTerms) 
      this.searchTerms.nativeElement.value=""
    this.pumpparams = new PumpParams(); // Reset to default values
    this.getPumps(); // Fetch cars with default parameters
  }
    pageChanged(event: PageChangedEvent) {
      this.pumpparams.PageIndex = event.page;  // Update the current page index
      this.getPumps();  // Fetch data for the updated page
  }
  onSearch(){
    this.pumpparams.SearchValue = this.searchTerms.nativeElement.value;
    this.getPumps();
  }
}



