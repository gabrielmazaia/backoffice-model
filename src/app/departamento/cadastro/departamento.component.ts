import { Departamento } from './../../models/departamentos';
import { DepartamentoService } from '../../services/departamento.service';
import { Pessoa } from '../../models/pessoas';
import { catchError, count } from 'rxjs/operators';
import { PessoaService } from '../../services/pessoas.service';
import { Component, OnInit, NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.scss']
})
export class DepartamentoComponent implements OnInit{

  departamento = {} as Departamento;
  departamentos: Departamento[] | any;
  colaborador = {} as Pessoa;
  colaboradores: Pessoa | any | null;
  deptoNome: [] | any;
  dataArr: []|any;
  departamentoLength: any;

  constructor(
    private pessoaService: PessoaService,
    private departamentoService: DepartamentoService,
    private datepipe: DatePipe){}

    ngOnInit(): void {
      this.getDepartamento();
      this.getColaboradores();

    }
    getDepartamento(){
      this.departamentoService.getDepartamentos().subscribe((departamentos: Departamento[])=>{
        this.departamentos = departamentos;
      })
    }

    getColaboradores(){
      this.pessoaService.getColaboradores().subscribe((colaboradores: Pessoa)=>{
        this.colaboradores = colaboradores;
      })

    }
    getData(form: NgForm){
      this.departamento.dataCriacao = this.datepipe.transform((new Date),'MM/dd/yyyy h:mm:ss');
      this.departamentoService.getDepartamentoNome(form.value.nomeDepto).subscribe((departamentos: Departamento)=>{
        this.dataArr = departamentos;
        if(this.dataArr.length > 0){
          alert("Departamento Já existe");
        }else{
          this.saveDepartamento(form);
        }
      });

      }
    saveDepartamento(form: NgForm){
      this.getDepartamento();
      // se a id desta pessoa não for indefinida vamos atualizar o contato dela
      this.departamentoService.saveDepartamento(this.departamento).subscribe(()=> {
        this.cleanForm(form);
      })
    }

    deleteDepartamento(departamento: Departamento) {
      this.departamentoService.deleteDepartamento(departamento).subscribe(() => {
        this.getDepartamento();
      });
    }
    //limpa o formulário
    cleanForm(form: NgForm) {
      this.getDepartamento();
      form.resetForm();
      this.departamento = {} as Departamento;
    }
}
