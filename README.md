<p align="center">
  <span>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" />
  </a>
  </span>
    <span>
  <a href="https://usememos.com"><img width="450" height="200px" src="https://raw.githubusercontent.com/usememos/memos/main/resources/logo-full.webp" alt="✍️ memos" /></a>
  </span>
</p>




  
## Description

Project [usememos/memos](https://github.com/usememos/memos) backend nestjs version, support more database type.

Thanks to everyone who contributed to the origin project.

## Installation

```bash
$ npm install
```

## Environment

```bash
# host name
MEMOS_NAME=mahoo12138
# host email
MEMOS_EMAIL=mahoo12138@qq.com
# host password
MEMOS_PASSWD=password

# sqlite config
MEMOS_DB_TYPE=sqlite
MEMOS_DB_PATH="./data/database/memos.db"

# mysql or postgres config
MEMOS_DB_TYPE=postgres
MEMOS_DB_HOST=localhost
MEMOS_DB_PROT=5432
MEMOS_BD_USERNAME=postgres
MEMOS_BD_PASSWORD=postgres
MEMOS_BD_DATABASE=postgres

# file upload path
MEMOS_UPLOAD_PATH="./data/resource/"
```
## SSL
You need configure the ssl setting:

+ `ssl/file.crt`

+ `ssl/key.pem`

## Running the app

```bash
# development
$ npm run start
# watch mode
$ npm run start:dev
# production mode
$ npm run start:prod
```