# cdktf-cloudrun-template
Cloud Development Kit for Terraform (CDKTF) services template deployed on google cloud platform

## Project structure
```
├── .github
│   └── workflows
│       ├── api-deployment.yml
│       ├── client-deployment.yml
│       └── codeql.yml
├── .gitignore
├── LICENSE
├── README.md
└── api
└── client
└── cdktf
    ├── __tests__
    │   └── main-test.ts
    ├── cdktf.json
    ├── help
    ├── jest.config.js
    ├── main.ts
    ├── package-lock.json
    ├── package.json
    ├── setup.js
    ├── stacks
    │   ├── cloudrun.ts
    │   ├── config
    │   │   └── index.ts
    │   └── index.ts
    └── tsconfig.json
```

## Infrastructure Diagram
![infra diagram](./images/infra.png)

## Setting up deplouyment to gcp artifact registry
* Create a service account key file on gcp
  ![service account](./images/service-account.png)
* Create a json key file on gcp
  ![keyfile](./images/key-file.png)
* Create an `images` folder on gcp `artifact registry` to hold your container services
  ![artifact registry](./images/artifact.png)
* Use the keyfile contents to set the following github action secrests. To learn how to set gihub action secrets visit https://docs.github.com/en/actions/security-guides/encrypted-secrets


| Environment Variable  | Description     |
| :------------------  | :------------- |
| IMAGE_NAME           | Contianer service image name e.g users-service   |
| PROJECT_ID           | Google cloud project id  |
| GCP_REGION           | Region to deploy your container service e.g us-central-1    |
| GOOGLE_CREDENTIALS   | JSON string of your google cloud service account key file content               |
|                      |                 |

## Docs
- [Api Docs](./api/README.md)
- [Client Docs](./client/README.md)

## Built With
* [GCP CDKTF](https://developer.hashicorp.com/terraform/cdktf) - GCP Terraform CDK
* [Node](https://nodejs.org/en/) - Node Js
* [React](https://reactjs.org/) - React
* [Chi](https://github.com/go-chi/chi) - The web framework used
* [Upper DB](https://upper.io/v4/) - Data access layer for Go
* [Air](https://github.com/cosmtrek/air) - Live reload for Go apps
* [Goose](https://github.com/pressly/goose) - Database migrations

## Authors
* [Jesse Okeya](https://github.com/jesseokeya/)