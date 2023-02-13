import { CadastradasPessoasComponent } from './pessoas/cadastradas/cadastradas.component';
import { CadastroPessoaComponent } from './pessoas/cadastro/cadastro-pessoa.component';
import { DepartamentoCadastradosComponent } from './departamento/cadastrado/departamento-cadastrados.component';
import { DepartamentoComponent } from './departamento/cadastro/departamento.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: CadastroPessoaComponent},
  {path: 'pessoas/cadastro', component: CadastroPessoaComponent},
  {path: 'pessoas/cadastradas', component: CadastradasPessoasComponent},
  {path: 'departamento/cadastrados', component: DepartamentoCadastradosComponent},
  {path: 'departamento/cadastro', component: DepartamentoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
