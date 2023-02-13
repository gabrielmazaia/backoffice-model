import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroPessoaComponent } from './pessoas/cadastro/cadastro-pessoa.component';
import { NgxViacepModule } from '@brunoc/ngx-viacep';
import { DatePipe } from '@angular/common';
import { CadastradasPessoasComponent } from './pessoas/cadastradas/cadastradas.component';
import { DepartamentoCadastradosComponent } from './departamento/cadastrado/departamento-cadastrados.component';
import { DepartamentoComponent } from './departamento/cadastro/departamento.component';


@NgModule({
  declarations: [
    AppComponent,
    CadastroPessoaComponent,
    CadastradasPessoasComponent,
    DepartamentoCadastradosComponent,
    DepartamentoComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxViacepModule,
    ReactiveFormsModule,

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
