import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Pagination } from '../Models/paging';
import { Observable } from 'rxjs';
import { PumpParams } from '../Models/pump-params';
import { Pump } from '../Models/pump';


@Injectable({
  providedIn: 'root'
})
export class PumpService {

  constructor(private http:HttpClient) { }

  baseUrl = "http://localhost:5187/api/";

  getPumps(PumpParams:PumpParams):Observable<Pagination>{
    let params = new HttpParams();
    if(PumpParams.sortBy) params = params.append("sortBy",PumpParams.sortBy)
    if(PumpParams.sortDirection) params = params.append("sortDirection",PumpParams.sortDirection)
    if(PumpParams.name) params = params.append("name",PumpParams.name)  
    if(PumpParams.model) params = params.append("model",PumpParams.model) 
    if(PumpParams.construction) params = params.append("construction",PumpParams.construction)
    if(PumpParams.inlet) params = params.append("inlet",PumpParams.inlet) 
    if(PumpParams._pageSize) params = params.append("_pageSize",PumpParams._pageSize)  
    if(PumpParams.outlet) params = params.append("outlet",PumpParams.outlet)  
    if(PumpParams.SearchValue) params = params.append("SearchValue",PumpParams.SearchValue)  

      return this.http.get<Pagination>(this.baseUrl+'product',{params:params});
  }
  getPump(id:number){
    return this.http.get<Pump>(this.baseUrl+'product/'+id);
  }
}
