export class PessoasFisicaForm{
  constructor(
    tipoPessoa: string,
    nomeCompleto: string,
    apelido: string,
    cpf: number,
    razaoSocial: string,
    nomeFantasia: string,
    cnpj: number,
    rua: string,
    bairro: string,
    cep: string,
    cidade: string,
    estado: string,
    numero: string,
    complemento: string,
    qualificacao: string,
    horaCriacao?: string | any,
    horaAtualizacao?: string | any,
    ){
      this.tipoPessoa = tipoPessoa;
      this.nomeCompleto = nomeCompleto;
      this.apelido = apelido;
      this.cpf = cpf;
      this.razaoSocial = razaoSocial;
      this.nomeFantasia = nomeFantasia;
      this.cnpj = cnpj;
      this.rua = rua;
      this.bairro = bairro;
      this.cep = cep;
      this.cidade = cidade;
      this.estado = estado;
      this.numero = numero;
      this.complemento = complemento;
      this.qualificacao = qualificacao;
      this.horaCriacao = horaCriacao;
      this.horaAtualizacao = horaAtualizacao;
  }

  tipoPessoa: string;
  nomeCompleto: string;
  apelido: string;
  cpf: number;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: number;
  rua: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
  numero: string;
  complemento: string;
  qualificacao: string;
  horaCriacao: string;
  horaAtualizacao: string;
}
