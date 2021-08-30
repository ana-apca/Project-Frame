import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Vitrine } from '../models/vitrine';


@Injectable({
    providedIn: 'root'
})


export class vitrineservice {

    url = 'https://localhost:44362/api/Vitrine';

    // injetando o HttpClient
    constructor(private httpClient: HttpClient) { }

    // Headers
    httpOptions = {
        headers: new HttpHeaders({ 
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzAyODc5NDQsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDEiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo1MDAxIn0.qHiM0d8DngCWnWi_knY-_U9Tk3hlT4lLY4iHb6rMtHA'
        //'Access-Control-Allow-Origin':'http://localhost:4200'
     })
    };

    // Obtem todos os produtos
    getVitrines(): Observable<Vitrine[]> {
        return this.httpClient.get<Vitrine[]>(this.url)
            .pipe(
                retry(2),
                catchError(this.handleError));
    }

    // Obtem um carro pelo id
    getVitrineById(id: number): Observable<Vitrine> {
        return this.httpClient.get<Vitrine>(this.url + '/' + id)
            .pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    // salva um carro
    saveVitrine(vitrine: Vitrine): Observable<Vitrine> {
        return this.httpClient.post<Vitrine>(this.url, JSON.stringify(vitrine), this.httpOptions)
            .pipe(
                retry(2),
                catchError(this.handleError)
            );
    }

    // utualiza um carro
    updateVitrine(vitrine: Vitrine): Observable<Vitrine> {
        return this.httpClient.put<Vitrine>(this.url + '/' + vitrine.codigo, JSON.stringify(vitrine), this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    // atualizar estoque
    atualizarEstoqueVitrine(vitrine: Vitrine) {
        return this.httpClient.put<Vitrine>(this.url + '/AtualizarEstoque/' + vitrine.codigo, this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    // Manipulação de erros
    handleError(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Erro ocorreu no lado do client
            errorMessage = error.error.message;
        } else {
            // Erro ocorreu no lado do servidor
            errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    };

}
