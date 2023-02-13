import { Departamento } from './../models/departamentos';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, count, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService{
  url = 'http://localhost:3000/departamentos'; //Espero que de boa usei a api rest fake
  response: any;
  steps: any;
  i: any;
  result: any;
  rest: any;
  //injetamos o httpClient (responsavel por consumir a url da api)
  constructor(private httpClient: HttpClient){}

  //Headers usado pra interpretar o arquivo da forma correta.
  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }

  //Obtem todas os Departamentos cadastradas
  getDepartamentos(): Observable<Departamento[]>{
    return this.httpClient.get<Departamento[]>(this.url)
    .pipe(retry(2), catchError(this.handleError));
  }
  //Atualiza departamento
  atualizaDepto(departamento: Departamento): Observable<Departamento>{
    return this.httpClient.put<Departamento>(this.url+'/'+departamento.nomeDepto,JSON.stringify(departamento),this.httpOptions)
    .pipe(retry(1),catchError(this.handleError))
  }
  //Adiciona uma pessoa
  saveDepartamento(departamento: Departamento): Observable<Departamento>{
    return this.httpClient.post<Departamento>(this.url, JSON.stringify(departamento), this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
  }

  //PUXAR APENAS COLABORADORES
  getColaboradores(): Observable<Departamento>{
    return this.httpClient.get<Departamento>(this.url+'/?qualificacao=colaborador')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //filtra por nome
  getDepartamentoNome(nome: any): Observable<Departamento>{
    return this.httpClient.get<Departamento>(this.url+'/?nomeDepto='+nome).pipe(tap(res => this.result = res));
  }
  deleteDepartamento(departamento: Departamento) {
    return this.httpClient.delete<Departamento>(this.url + '/' + departamento.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  //Manipulando os erros
  handleError(error: HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    }else{
      errorMessage = `Código do erro: ${error.status}, `+`mensagem: ${error.message}`
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
