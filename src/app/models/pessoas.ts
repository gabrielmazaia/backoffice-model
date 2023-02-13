export interface Pessoa {
  id?: number;
  tipoPessoa: string;
//Pessoal
  nomeCompleto?: string;
  apelido?: string;
  cpf?: number;
//Juridico
  razaoSocial?: string;
  nomeFantasia?:string;
  cnpj?: number;
//Endereco
  rua: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
  numero: string;
  complemento?: string;

//departamento
  qualificacao: string;
  horaCriacao: string | any;
  horaAtualizacao: string | any;
}
