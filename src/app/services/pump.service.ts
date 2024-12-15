import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Pagination } from '../Models/paging';
import { Observable } from 'rxjs';
import { PumpParams } from '../Models/pump-params';
import { Pump } from '../Models/pump';
import { Pumpdto } from '../Models/pumpdto';



@Injectable({
  providedIn: 'root'
})
export class PumpService {

  constructor(private http:HttpClient){ }

  baseUrl = "http://localhost:5187/api/";

  getPumps(PumpParams:PumpParams):Observable<Pagination> {
    let params = new HttpParams();
    if(PumpParams.sortBy) params = params.append("sortBy",PumpParams.sortBy)
    if(PumpParams.sortDirection) params = params.append("sortDirection",PumpParams.sortDirection)
    if(PumpParams.productName) params = params.append("productName",PumpParams.productName)  
    if(PumpParams.model) params = params.append("model",PumpParams.model) 
    if(PumpParams.construction) params = params.append("construction",PumpParams.construction)
    if(PumpParams.inletSize) params = params.append("inletSize",PumpParams.inletSize) 
    if(PumpParams._pageSize) params = params.append("_pageSize",PumpParams._pageSize)  
    if(PumpParams.PageIndex) params = params.append("PageIndex",PumpParams.PageIndex)  
    if(PumpParams.outletSize) params = params.append("outletSize",PumpParams.outletSize)  
    if(PumpParams.SearchValue) params = params.append("SearchValue",PumpParams.SearchValue) 
    if(PumpParams.documentId) params = params.append("documentId",PumpParams.documentId)  


    return this.http.get<Pagination>(this.baseUrl+'product',{params:params});
  }
  getPump(id:number){
    return this.http.get<Pump>(this.baseUrl+'product/'+id);
  }
  createPump(pump: Pump) : Observable<Pump> {
    return this.http.post<Pump>(this.baseUrl + 'product', pump);
  }
  

  updatePump(id: number, pump: Pump): Observable<Pump> {
    return this.http.put<Pump>(`${this.baseUrl}${id}`, pump);
  }

  deletePump(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}`);
  }

  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<string>(`${this.baseUrl}product/upload-image`, formData);
  }

  uploadDocument(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('document', file);
    return this.http.post<string>(`${this.baseUrl}product/upload-document`, formData);
  }
  
}
