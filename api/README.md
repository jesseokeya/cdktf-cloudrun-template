## Pre Requisites

Make sure you have golang installed on your system. [Golang Instalation instruction](https://golang.org/doc/install)

## File Structure
```
.
├── .air.conf
├── .env.example
├── .gitignore
├── Dockerfile
├── LICENSE
├── Makefile
├── README.md
├── cmd
│   ├── api
│   │   ├── main.go
│   │   └── main_test.go
│   └── migrate
│       └── main.go
├── config
│   ├── api.develop.conf
│   ├── api.production.conf
│   ├── api.staging.conf
│   └── config.go
├── cronjob
│   └── cron.go
├── data
│   ├── db.go
│   ├── oauth_clients.go
│   ├── oauth_tokens.go
│   ├── presenter
│   │   └── users.go
│   ├── users.go
│   └── utils.go
├── db
│   ├── db.sh
│   ├── dbconf.go
│   ├── dbconf.yml
│   └── migrations
│       ├── 00001_create_users_table.sql
│       ├── 00002_create_table_oauth_clients.sql
│       └── 00003_create_table_oauth_tokens.sql
├── docker-compose.yml
├── go.mod
├── go.sum
├── lib
│   ├── connect
│   │   └── config.go
│   └── session
│       └── auth.go
└── server
    ├── api
    │   ├── context.go
    │   ├── cors.go
    │   ├── errors.go
    │   ├── logger.go
    │   └── renderer.go
    ├── auth
    │   ├── password.go
    │   ├── session.go
    │   └── signup.go
    ├── oauth
    │   ├── oauth.go
    │   ├── routes.go
    │   └── signin.go
    ├── server.go
    └── user
        ├── routes.go
        ├── session_user.go
        └── users.go

17 directories, 47 files
```

## Installing Dependencies

To run this project you will need to install the third party dependencies. 

Install golang version `1.19` which this template supports. You can also use [go version manager (gvm)](https://github.com/moovweb/gvm) to manage various go versions 

```sh
# Install gvm
bash < <(curl -s -S -L https://raw.githubusercontent.com/moovweb/gvm/master/binscripts/gvm-installer)

# Downlaod go version 1.19
gvm install go1.19

# Set golang version for project
gvm use go1.19
```

Lists dependencies

```sh
go list -m all
```

Install dependencies with

```sh
make tools
```

## Runing Application Locally

To run this application use the command below
```sh
make run
```

Or

```sh
go run cmd/api/*.go 
```

## Runing In Docker
To run this application using docker use the following command(s) below

```sh
docker-compose up -d 
```

## Running Binary File

To run this application use the command below

```sh
sudo make build
```

And

```sh
./bin/api
```

## Running the tests

To run the automated tests for this system

```sh
go test ./...
```

## Built With
* [Chi](https://github.com/go-chi/chi) - The web framework used
* [Upper DB](https://upper.io/v4/) - Data access layer for Go
* [Air](https://github.com/cosmtrek/air) - Live reload for Go apps
* [Goose](https://github.com/pressly/goose) - Database migrations

## Authors
* **Jesse Okeya**
