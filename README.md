# BackofficeModel

Desenvolvido seguindo direcionamento do briefing utilizando Angular 15. 

[BRIEFING]
"Desenvolver uma plataforma de cadastro utilizando webAPI em .net e Angular conforme o descrito abaixo (No whatsapp foi liberado o uso de outro);

O sistema é uma plataforma de backOffice contendo o cadastro de Pessoas onde o mesmo poderá ter várias qualificações (cliente, fornecedor, colaborador), 
ou seja 1 pessoa pode ter mais de 1 qualificação:

 A pessoa terá os seguintes campos:
 - Tipo de Pessoa (Fisica ou Juridica) - Obrigatório 
 - Documento (CPF se pessoa fisica, cnpj se pessoa juridica) - Obrigatório 
 - Nome (Se pessoa juridica será Razão Social) - Obrigatório 
 - Apelido (Nome fantasia se pessoa juridica) - Não Obrigatório 
 - Endreço de cadastro - Obrigatório (Preenchimento de dados via API de CEP - viacep) 

Criar o cadastro de departamento contendo:
 Nome do departamento, Responsável (uma pessoa). 
 
Regras:
 Não pode existir uma nome de departamento duplicado, 
 Uma pessoa pode ser responsável por mais de um departamento, só é permitido um responsável que tenha a "qualificação de colaborador". 

Observações gerais
Todos os registros devem ter data e hora de cadastro, data e hora de atualização (se houve atualização)";
 
# REST WEB API

UTILIZEI O JSON-SERVER (fake rest api), por não ter muito conhecimento de fakes api's.

- json-server db.json 

# CEP Autocomplete 

Utilizei o Via-CEP como direcionado no briefing;
