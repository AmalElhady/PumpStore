import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Pagination } from '../Models/accessPaging';
import { Observable } from 'rxjs';
import { AccessoryParams } from '../Models/accessory-params';
import { Accessories } from '../Models/accessories';

@Injectable({
  providedIn: 'root'
})
export class AccessoryService {

  constructor(private http:HttpClient){ }

  baseUrl = "http://localhost:5187/api/";

  getAccessories(AccessoryParams:AccessoryParams):Observable<Pagination> {
    let params = new HttpParams();
    if(AccessoryParams.sortBy) params = params.append("sortBy",AccessoryParams.sortBy)
    if(AccessoryParams.sortDirection) params = params.append("sortDirection",AccessoryParams.sortDirection)
    if(AccessoryParams.pumpName) params = params.append("pumpName",AccessoryParams.pumpName) 
    if(AccessoryParams.name) params = params.append("name",AccessoryParams.name)  
    if(AccessoryParams.model) params = params.append("model",AccessoryParams.model) 
    if(AccessoryParams.construction) params = params.append("construction",AccessoryParams.construction)
    if(AccessoryParams.size) params = params.append("size",AccessoryParams.size) 
    if(AccessoryParams._pageSize) params = params.append("_pageSize",AccessoryParams._pageSize)  
    if(AccessoryParams.PageIndex) params = params.append("PageIndex",AccessoryParams.PageIndex)  
    if(AccessoryParams.SearchValue) params = params.append("SearchValue",AccessoryParams.SearchValue) 


    return this.http.get<Pagination>(this.baseUrl+'accessory',{params:params});
  }
  getAccessory(id:number){
    return this.http.get<Accessories>(this.baseUrl+'accessory/'+id);
  }
}
