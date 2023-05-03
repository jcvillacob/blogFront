import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_CONFIG } from 'src/api.config';
import jwt_decode from 'jwt-decode';

interface TokenPayload {
  email: string;
  userId: string;
  role: string;
  name: string;
  exp: number;
}


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = API_CONFIG.baseUrl + "/login";
  private token: string = '';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Verifica si el token existe en el localStorage al inicializar el servicio
    const token = localStorage.getItem('token');
    const isExpired = this.isTokenExpired();
    this.isAuthenticatedSubject.next(!!token && !isExpired);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    const body = {
      email: credentials.email,
      password: credentials.password
    };

    return this.http.post(this.apiUrl, body).pipe(
      tap((response: any) => {
        this.token = response.token;

        // Decodifica el token y extrae el tiempo de expiración
        const decodedToken = jwt_decode<TokenPayload>(this.token);
        const expiration = decodedToken.exp * 1000;

        ///////////////////////////////////////
        console.log(this.token);
        const expirationDate = new Date(expiration);
        console.log('Expiration Date:', expirationDate);
        /////////////////////////////////////////


        this.isAuthenticatedSubject.next(true);
        localStorage.setItem('token', this.token);
        localStorage.setItem('token_expiration', expirationDate.toString());
      })
    );
  }

  private isTokenExpired(): boolean {
    const expiration = localStorage.getItem('token_expiration');
    if (!expiration) {
      return true;
    }
    const currentTime = new Date().getTime();
    return currentTime >= Number(expiration);
  }


  logout(): void {
    this.token = '';
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiration');
  }
}
