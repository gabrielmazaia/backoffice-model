import { Pessoa } from 'src/app/models/pessoas';
import { Departamento } from 'src/app/models/departamentos';
import { catchError } from 'rxjs/operators';
import { PessoaService } from 'src/app/services/pessoas.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { NgForm } from '@angular/forms';
import {
  NgxViacepService,
  Endereco,
  CEPError,
  CEPErrorCode,
} from "@brunoc/ngx-viacep";
import { EMPTY } from 'rxjs/internal/observable/empty';
import { DepartamentoService } from '../../services/departamento.service';

@Component({
  selector: 'app-pessoas-cadastradas',
  templateUrl: './cadastradas.component.html',
  styleUrls: ['./cadastradas.component.scss']
})
export class CadastradasPessoasComponent {
  pessoa = {} as Pessoa;
  pessoas: Pessoa[] | any;
  pessoasX: Pessoa[] | any;

  departamentos: Departamento[] | any;

  cpf: number | any;
  cep: number | any;
  endereco: any;
  mostraCampo: any;

  editar: boolean | undefined = false;

  constructor(
    private pessoaService: PessoaService,
    private departamentoService: DepartamentoService,
    private viacep: NgxViacepService,
    private datepipe: DatePipe)

    {}

  ngOnInit(): void {
    this.getPessoa();
    this.pessoa.tipoPessoa = 'fisica';
    this.tipoPessoa();

  }
  tipoPessoa(){
    if(this.pessoa.tipoPessoa == 'juridica'){
      this.mostraCampo = 'juridica';
    }else{
      this.mostraCampo = 'fisico';
    }

  }
  searchCEP(){
    setTimeout(() => {
      this.viacep
    .buscarPorCep(this.pessoa.cep)
    .pipe(
      catchError((error: CEPError)=>{
        //Ocorreu algum erro:/
        console.log(error.message);
        return EMPTY;
      })
    ).subscribe((endereco: Endereco) => {
      // Endereço retornado :)
      this.pessoa.rua = endereco.logradouro;
      this.pessoa.bairro = endereco.bairro;
      this.pessoa.cidade = endereco.localidade;
      this.pessoa.estado = endereco.uf;

      console.log(endereco);
    });
    }, 1000);

  }
  getPessoa(){
    this.pessoaService.getPessoas().subscribe((pessoas: Pessoa[])=>{
      this.pessoas = pessoas;
    })
  }

////////////////////////// UTILIZEI O METODO BOOLEAN DE VALIDAÇÃO PARA VERIFICAR SE O VALOR EXISTE OU NÃO, ATRIBUIDO COM UMA FUNÇÃO QUE PUXA O CPF,
//MINHA IDEIA VAI SER UTILIZAR UM VALOR ESPECIFICO PARA PUXAR O CARGO/DEPARTAMENTO.
getData(form: NgForm){
  if(form.value.tipoPessoa === 'fisica'){
    if (this.pessoa.id !== undefined) {
      this.pessoa.horaAtualizacao = this.datepipe.transform((new Date),'MM/dd/yyyy h:mm:ss');
    if(form.value.cpf !== ''){
      this.pessoaService.getPessoaByCPF(form.value.cpf).subscribe((pessoas: Pessoa)=>{
        this.pessoasX = pessoas;
        console.log(form.value.cpf);
        console.log(this.pessoasX);
        this.atualizarPessoa(form);
      });
    }
  }else{
    this.pessoa.horaCriacao = this.datepipe.transform((new Date),'MM/dd/yyyy h:mm:ss');
    if(form.value.cpf !== ''){
      this.pessoaService.getPessoaByCPF(form.value.cpf).subscribe((pessoas: Pessoa)=>{
        this.pessoasX = pessoas;
        console.log(form.value.cpf);
        console.log(this.pessoasX);
        if(this.pessoasX == false){
          this.savePessoa(form);

        }else{
          alert("CPF JÁ CADASTRADO!");
        }
      });
    }
  }
  }else
  if(form.value.tipoPessoa === 'juridica'){
    if (this.pessoa.id !== undefined) {
      this.pessoa.horaAtualizacao = this.datepipe.transform((new Date),'MM/dd/yyyy h:mm:ss');

      if(form.value.cnpj !== ''){
        this.pessoaService.getPessoaByCNPJ(form.value.cnpj).subscribe((pessoas: Pessoa)=>{
          this.pessoasX = pessoas;
          console.log(this.pessoasX);
          this.atualizarPessoa(form);
        });
      }
    }else{
      this.pessoa.horaCriacao = this.datepipe.transform((new Date),'MM/dd/yyyy h:mm:ss');

      if(form.value.cnpj !== ''){
        this.pessoaService.getPessoaByCNPJ(form.value.cnpj).subscribe((pessoas: Pessoa)=>{
          this.pessoasX = pessoas;
          console.log(this.pessoasX);
          if(this.pessoasX == false){
            this.savePessoa(form);

          }else{
            alert("CNPJ JÁ CADASTRADO!");
          }
        });
      }
    }
  }else{

  }

}

savePessoa(form: NgForm){
  this.getPessoa();


  // se a id desta pessoa não for indefinida vamos atualizar o contato dela
  this.pessoaService.savePessoa(this.pessoa).subscribe(()=> {
    this.cleanForm(form);
  })
}
atualizarPessoa(form: NgForm){
  this.getPessoa();
  // se a id desta pessoa não for indefinida vamos atualizar o contato dela
  this.pessoaService.atualizaPessoa(this.pessoa).subscribe(()=> {
    this.cleanForm(form);
  })
}
  deletePessoas(pessoa: Pessoa) {
    this.pessoaService.deletePessoa(pessoa).subscribe(() => {
      this.getPessoa();
    });
  }



  atualizaPessoa(pessoa: Pessoa) {
    this.editar = true;
    this.pessoa = { ...pessoa };
  }
  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getPessoa();
    form.resetForm();
    this.pessoa = {} as Pessoa;
  }
}
