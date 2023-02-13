import { Validacoes } from './../../validacoes';
import { Pessoa } from 'src/app/models/pessoas';
import { catchError } from 'rxjs/operators';
import { PessoaService } from 'src/app/services/pessoas.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PessoasFisicaForm } from 'src/app/pessoas';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {
  NgxViacepService,
  Endereco,
  CEPError,
  CEPErrorCode,
} from "@brunoc/ngx-viacep";
import { EMPTY } from 'rxjs/internal/observable/empty';

@Component({
  selector: 'app-cadastro-pessoa',
  templateUrl: './cadastro-pessoa.component.html',
  styleUrls: ['./cadastro-pessoa.component.scss']
})
export class CadastroPessoaComponent implements OnInit{
  pessoa = {} as Pessoa;
  pessoas: Pessoa[] | any;
  pessoasX: Pessoa[] | any;
  pessoasC: Pessoa[] | any;
  cpf: number | any;
  cep: number | any;
  endereco: any;
  mostraCampo: any;
  formularioDePessoa: FormGroup | any;
  tipo: string | any;



  constructor(
    private pessoaService: PessoaService,
    private viacep: NgxViacepService,
    private datepipe: DatePipe,
    private fb: FormBuilder,
    private fbx: FormBuilder){}

  ngOnInit(): void {
    this.getPessoa();
    this.pessoa.tipoPessoa = 'fisica';
    this.pessoa.horaCriacao = this.datepipe.transform((new Date),'MM/dd/yyyy h:mm:ss');
    this.tipoPessoa();
    this.criarFormularioDePessoa();
  }
  tipoPessoa(){
    if(this.pessoa.tipoPessoa == 'juridica'){
      this.mostraCampo = 'juridica';}
    else{
      this.mostraCampo = 'fisico';

  }
  }

  searchCEP(){
    setTimeout(() => {this.viacep.buscarPorCep(this.pessoa.cep).pipe(catchError((error: CEPError)=>{return EMPTY;}))
    .subscribe((endereco: Endereco) => {
      /* Endereço retornado, preenche os campos abaixo:*/
      this.pessoa.rua = endereco.logradouro;
      this.pessoa.bairro = endereco.bairro;
      this.pessoa.cidade = endereco.localidade;
      this.pessoa.estado = endereco.uf;

    });
    }, 1000);
  }
  //FUNÇÃO PARA EXIBIR OS JÁ CADASTRADOS:
  getPessoa(){
    //CONSOME O SERVIÇO QUE PUXA AS PESSOAS E FAZ UM SUBSCRIBE PARA EXIBIR OS DADOS EM FORMATO DE ARRAY
    this.pessoaService.getPessoas().subscribe((pessoas: Pessoa[])=>{
      this.pessoas = pessoas;
    })
  }


//NÃO CONSEGUI VALIDAR O JSON USANDO OS TUTORIAIS QUE ENCONTREI NA INTERNET, ENTÃO PRECISEI PENSAR EM OUTRA FORMA DE VALIDAR QUE O CPF E O CNPJ SEJAM UNICOS NO BANCO
//CRIEI UMA FUNÇÃO EXTRA CHAMADA getData(), ela puxa os dados do formulário antes de envia-lo, faz uma requisição no banco e compara cpf e cnpj.
getData(){
  const dadosFormulario = this.formularioDePessoa.value;

  if(dadosFormulario.tipoPessoa == 'fisica'){
  const pessoal = new PessoasFisicaForm(
    dadosFormulario.tipoPessoa,
    dadosFormulario.nomeCompleto,
    dadosFormulario.apelido,
    dadosFormulario.cpf,
    dadosFormulario.razaoSocial,
    dadosFormulario.nomeFantasia,
    dadosFormulario.cnpj,
    dadosFormulario.rua,
    dadosFormulario.complemento,
    dadosFormulario.bairro,
    dadosFormulario.cidade,
    dadosFormulario.estado,
    dadosFormulario.numero,
    dadosFormulario.qualificacao,
    dadosFormulario.horaCriacao,
    dadosFormulario.horaAtualizacao,
  );

  if(pessoal.cpf !== null || pessoal.cpf !== undefined){
    this.pessoaService.getPessoaByCPF(pessoal.cpf).subscribe((pessoas: Pessoa)=>{
      this.pessoasX = pessoas;
      console.log(pessoal.cpf);
      console.log(this.pessoasX);
      if(this.pessoasX == false){
        this.savePessoa(pessoal);
        this.pessoa.horaCriacao = this.datepipe.transform((new Date),'MM/dd/yyyy h:mm:ss');

      }else{
        alert("CPF JÁ CADASTRADO!");
      }
    });
  }

  }else{
    const pessoal = new PessoasFisicaForm(
      dadosFormulario.tipoPessoa,
      dadosFormulario.nomeCompleto,
      dadosFormulario.apelido,
      dadosFormulario.cpf,
      dadosFormulario.razaoSocial,
      dadosFormulario.nomeFantasia,
      dadosFormulario.cnpj,
      dadosFormulario.rua,
      dadosFormulario.complemento,
      dadosFormulario.bairro,
      dadosFormulario.cidade,
      dadosFormulario.estado,
      dadosFormulario.numero,
      dadosFormulario.qualificacao,
      dadosFormulario.horaCriacao,
      dadosFormulario.horaAtualizacao,
    );
    if(pessoal.cnpj !== null || pessoal.cnpj !== undefined){
      //UNICO PROBLEMA ENCONTRADO É: CASO NÃO TENHA CNPJ CADASTRADO ELE NÃO CONSEGUE EFETUAR A BUSCA... NÃO ENTENDI COMO
      this.pessoaService.getPessoaByCNPJ(pessoal.cnpj).subscribe((pessoas: Pessoa)=>{
        this.pessoasX = pessoas;
        console.log(pessoal.cnpj);
        console.log(this.pessoasX);
        if(this.pessoasX == false){
          this.savePessoa(pessoal);
          this.pessoa.horaCriacao = this.datepipe.transform((new Date),'MM/dd/yyyy h:mm:ss');

        }else{
          alert("CNPJ JÁ CADASTRADO!");
        }
      });
    }
  }
}

criarFormularioDePessoa(){
  this.formularioDePessoa = this.fb.group({
    tipoPessoa: ['',Validators.required],
    nomeCompleto: [''],
    apelido: [''],
    cpf: [''],
    razaoSocial: [''],
    nomeFantasia: [''],
    cnpj: [''],
    qualificacao: ['',Validators.required],
    cep: ['',Validators.required],
    rua: ['',Validators.required],
    numero: ['',Validators.required],
    complemento: ['',Validators.required],
    bairro: ['',Validators.required],
    cidade: ['',Validators.required],
    estado: ['',Validators.required],
    horaCriacao: [''],
    horaAtualizacao: [''],
  });

};
private textValidator = [
  Validators.minLength(3),
  Validators.maxLength(100),
];
private cnpjValidator = [
  Validators.minLength(3),
  Validators.maxLength(100),
  Validacoes.ValidaCNPJ,
];
private cpfValidator = [
  Validators.minLength(3),
  Validators.maxLength(100),
  Validacoes.ValidaCpf,
];


changePessoa(){
  this.formularioDePessoa.get('nomeCompleto').reset();
  this.formularioDePessoa.get('apelido').reset();
  this.formularioDePessoa.get('cpf').reset();

  this.formularioDePessoa.get('razaoSocial').reset();
  this.formularioDePessoa.get('nomeFantasia').reset();
  this.formularioDePessoa.get('cnpj').reset();

  this.formularioDePessoa.get('tipoPessoa').valueChanges.subscribe((value: any) => {

  if(value == 'juridica') {
    this.formularioDePessoa.get('razaoSocial').setValidators(this.textValidator.concat(Validators.required))
    this.formularioDePessoa.get('nomeFantasia').setValidators(this.textValidator.concat(Validators.required));
    this.formularioDePessoa.get('cnpj').setValidators(this.cnpjValidator.concat(Validators.required));

    this.formularioDePessoa.get('nomeCompleto').setValidators((Validators.nullValidator));
    this.formularioDePessoa.get('apelido').setValidators((Validators.nullValidator));
    this.formularioDePessoa.get('cpf').setValidators((Validators.nullValidator));
  } else {
    this.formularioDePessoa.get('razaoSocial').setValidators((Validators.nullValidator));
    this.formularioDePessoa.get('nomeFantasia').setValidators((Validators.nullValidator));
    this.formularioDePessoa.get('cnpj').setValidators((Validators.nullValidator));

    this.formularioDePessoa.get('nomeCompleto').setValidators(this.textValidator.concat(Validators.required));
    this.formularioDePessoa.get('apelido').setValidators(this.textValidator.concat(Validators.required));
    this.formularioDePessoa.get('cpf').setValidators(this.cpfValidator.concat(Validators.required));

  }
  console.log(value);
});
}
  savePessoa(form: any){
    this.getPessoa();
    this.pessoaService.savePessoa(this.pessoa).subscribe(()=> {
      this.cleanForm();
    })
  }

  // limpa o formulario
  cleanForm() {
    this.getPessoa();
    this.formularioDePessoa.reset();
    this.pessoa = {} as Pessoa;
  }
}
