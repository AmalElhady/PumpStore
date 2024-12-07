import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Observable, of } from 'rxjs';
import { User } from "../Models/user";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = "http://localhost:5187/api/account/";
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router:Router)
   {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        console.log(token);
        this.loadCurrentUser(token).subscribe(); 
      }
    }
    
  }

  loadCurrentUser(token:string){
   let headers = new HttpHeaders();
   headers = headers.set('Authorization',`Bearer ${token}`);
   return this.http.get<User>(this.baseUrl, {headers}).pipe(

    map(user => {
      localStorage.setItem('token',user.token);
      this.currentUserSource.next(user);
     
    
    })

   )



  }


  
  isAuthenticated(): boolean {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      return true; // User is authenticated
    }
    return false;

  }
  isLoggedIn(): boolean {
    return (this.isAuthenticated || localStorage.getItem('user')) !== null;
  }
  
  login(values:any): Observable<any>{
    return this.http.post<User>(this.baseUrl + 'login', values).pipe(
      map(user => {
        if(user && user.token){
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
    );
  }


  logout(){
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('');
  }


  checkEmailExists(email:string){
    return this.http.get<boolean>(this.baseUrl+'emailexists?email='+ email);
  }


}
