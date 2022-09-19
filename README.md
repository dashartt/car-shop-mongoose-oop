# Car Shop

## Observações

Projeto desenvolvido ao cursar Desenvolvimento Web na [Trybe](https://www.betrybe.com/). <br>
  
Todo desenvolvimento realizado por mim se localiza na pasta /src. As outras partes desse projeto foram providas pela **Trybe**.<br>


## Contexto   
Aplicar os princípios de Programação Orientada a Objetos (POO) para a construção de uma API com CRUD para gerenciar uma concessionária de veículos utilizando o banco de dados MongoDB.
<br>
_________________________________

## Técnologias e conhecimentos colado em prática
  - Express;
  - Typescript;
  - OOP;
  - Testes unitários com Mocha, Chai e Sinnon;
  - Arquitetutra MSC.

_________________________________

## Executando aplicação
  É necessário possuir o Git e Docker & Docker-compose<br>
  Abrindo o terminal, execute: <br>
  ```
  git clone git@github.com:jonatasqueirozlima/car-shop-mongoose-oop.git
  cd car-shop-mongoose-oop
  docker-compose up -d
  docker exec -it car_shop bash
  npm install
  npm run dev
  ```

## Executando os testes unitários
```
npm run test:dev
```