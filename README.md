# SimpleS3PreSignedUrlFilesUpload
This project a simple usage example of S3 pre-signed url to upload file with a DynamoDB files referencing.

## API
- GET /documents List all files
- POST /documents Give a pre-signed S3 url
- GET /documents/:uuid Get a file by id


## Get started

To install serverless-cli globally, please execute the following command from your terminal.

```shell
npm install -g serverless
```

To run this app you will have to install the dependencies first.

```shell
npm install
```

And then you have to deploy.
```shell
sls deploy
```

## Built with

- [Serverless](https://serverless.com/)
- [AWS Lambda](https://aws.amazon.com/lambda/?nc1=h_ls)
- [AWS S3](https://aws.amazon.com/s3/)
- [AWS DynamoDB](https://aws.amazon.com/dynamodb/)
- [AWS APIGateway](https://aws.amazon.com/api-gateway/)
