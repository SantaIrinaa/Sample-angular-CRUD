import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Client } from '../domain/models/client';
import { ClientOperationError } from '../domain/errors/client-operation-error';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'http://localhost:34908/api/Client';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  // GET Clients from server
  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/get`).pipe(
      catchError(this.handleHttpError())
    );
  }


  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/get/${id}`).pipe(
      catchError(this.handleHttpError())
    );
  }


  // POST : add a new client from the server
  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/create`, client, this.httpOptions).pipe(
      catchError(this.handleHttpError())
    );
  }


  // PUT : update the client on the server
  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/update`, client, this.httpOptions).pipe(
      catchError(this.handleHttpError()),
      map(_ => client)
    );
  }


  // DELETE : delete the client from the server
  deleteClient(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`).pipe(
      catchError(this.handleHttpError()),
      //return deleted id
      map(_ => id)
    );
  }


  /**
   * Handle Http operation that failed.
   * Throw an HeroOperation
  */ 
  /*private handleHttpError() {
    return (error: any): Observable<any> => {
      throw new ClientOperationError(error.body.error);
    };
  }*/
  private handleHttpError() {
    return (error: HttpErrorResponse): Observable<never> => {
      let errorMessage = 'Une erreur s\'est produite';
      if (error.error instanceof ErrorEvent) {
        // Erreur côté client
        errorMessage = error.error.message;
      } else {
        // Erreur côté serveur
        errorMessage = `Code d'erreur : ${error.status}, message : ${error.message}`;
      }
      return throwError(new ClientOperationError(errorMessage));
    };
  }
}
