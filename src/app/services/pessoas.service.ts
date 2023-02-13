import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Pessoa } from '../models/pessoas';

@Injectable({
  providedIn: 'root'
})
export class PessoaService{
  url = 'http://localhost:3000/pessoas'; //Espero que de boa usei a api rest fake

  //injetamos o httpClient (responsavel por consumir a url da api)
  constructor(private httpClient: HttpClient){}

  //Headers usado pra interpretar o arquivo da forma correta.
  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }

  //Obtem todas as pessoas cadastradas
  getPessoas(): Observable<Pessoa[]>{
    return this.httpClient.get<Pessoa[]>(this.url).pipe(retry(2), catchError(this.handleError))
  }
  getPessoaById(id: number): Observable<Pessoa>{
    return this.httpClient.get<Pessoa>(this.url+'/'+id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getPessoaByCPF(cpf: number): Observable<Pessoa>{
    return this.httpClient.get<Pessoa>(this.url+'/?cpf='+cpf)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  getPessoaByCNPJ(cnpj: number): Observable<Pessoa>{
    return this.httpClient.get<Pessoa>(this.url+'/?cnpj='+cnpj)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
    //PUXAR APENAS COLABORADORES
    getColaboradores(): Observable<Pessoa>{
      return this.httpClient.get<Pessoa>(this.url+'/?qualificacao=colaborador')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }
  //Adiciona uma pessoa
  savePessoa(pessoa: Pessoa): Observable<Pessoa>{
    return this.httpClient.post<Pessoa>(this.url, JSON.stringify(pessoa), this.httpOptions)
    .pipe(retry(2),catchError(this.handleError))
  }
  //Atualiza uma pessoa
  atualizaPessoa(pessoa: Pessoa): Observable<Pessoa>{
    return this.httpClient.put<Pessoa>(this.url+'/'+pessoa.id,JSON.stringify(pessoa),this.httpOptions)
    .pipe(retry(1),catchError(this.handleError))
  }
  //Deleta pessoa
  deletePessoa(pessoa: Pessoa) {
    return this.httpClient.delete<Pessoa>(this.url + '/' + pessoa.id, this.httpOptions)
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
