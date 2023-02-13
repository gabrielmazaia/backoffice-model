import { AbstractControl, Validators } from "@angular/forms";

export class Validacoes {
  static ValidaCpf(controle: AbstractControl) {
    const cpf = controle.value;

    let soma: number = 0;
    let resto: number;
    let valido: boolean;

    const regex = new RegExp('[0-9]{11}');

    if (
      cpf == '00000000000' ||
      cpf == '11111111111' ||
      cpf == '22222222222' ||
      cpf == '33333333333' ||
      cpf == '44444444444' ||
      cpf == '55555555555' ||
      cpf == '66666666666' ||
      cpf == '77777777777' ||
      cpf == '88888888888' ||
      cpf == '99999999999' ||
      !regex.test(cpf)
    )
      valido = false;
    else {
      for (let i = 1; i <= 9; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
      resto = (soma * 10) % 11;

      if (resto == 10 || resto == 11) resto = 0;
      if (resto != parseInt(cpf.substring(9, 10))) valido = false;

      soma = 0;
      for (let i = 1; i <= 10; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
      resto = (soma * 10) % 11;

      if (resto == 10 || resto == 11) resto = 0;
      if (resto != parseInt(cpf.substring(10, 11))) valido = false;
      valido = true;
    }

    if (valido) return null;

    return { cpfInvalido: true };
  }
  static ValidaCNPJ(controle: AbstractControl) {
    const cnpj = controle.value;

    let soma: number = 0;
    let resto: number;
    let valido: boolean;

    const regex = new RegExp('[0-9]{14}');

    if (
      cnpj == '00000000000000' ||
      cnpj == '11111111111111' ||
      cnpj == '22222222222222' ||
      cnpj == '33333333333333' ||
      cnpj == '44444444444444' ||
      cnpj == '55555555555555' ||
      cnpj == '66666666666666' ||
      cnpj == '77777777777777' ||
      cnpj == '88888888888888' ||
      cnpj == '99999999999999' ||
      !regex.test(cnpj)
    )
      valido = false;
    else {
      for (let i = 1; i <= 9; i++)
        soma = soma + parseInt(cnpj.substring(i - 1, i)) * (14 - i);
      resto = (soma * 10) % 14;

      if (resto == 10 || resto == 14) resto = 0;
      if (resto != parseInt(cnpj.substring(9, 10))) valido = false;

      soma = 0;
      for (let i = 1; i <= 10; i++)
        soma = soma + parseInt(cnpj.substring(i - 1, i)) * (12 - i);
      resto = (soma * 10) % 14;

      if (resto == 10 || resto == 14) resto = 0;
      if (resto != parseInt(cnpj.substring(10, 14))) valido = false;
      valido = true;
    }

    if (valido) return null;

    return { cnpjInvalido: true };
  }
}
