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
    if(AccessoryParams.category) params = params.append("category",AccessoryParams.category) 



    return this.http.get<Pagination>(this.baseUrl+'accessory',{params:params});
  }
  getAccessory(id:number){
    return this.http.get<Accessories>(this.baseUrl+'accessory/'+id);
  }
  createAccessory(accessory: Accessories) : Observable<Accessories> {
      return this.http.post<Accessories>(this.baseUrl + 'Accessory', accessory);
    }
  updateAccessory(id: number, accessory: Accessories): Observable<Accessories> {
      return this.http.put<Accessories>(`${this.baseUrl}Accessory/${id}`, accessory);
    }
  
  
    deleteAccessory(id: number): Observable<void> {
      
    return this.http.delete<void>(`${this.baseUrl}Accessory/${id}`);

    }
  
    uploadImage(file: File): Observable<string> {
      const formData = new FormData();
      formData.append('image', file);
      return this.http.post<string>(`${this.baseUrl}accessory/upload-image`, formData);
    }
    
}
