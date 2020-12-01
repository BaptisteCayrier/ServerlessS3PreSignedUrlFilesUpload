const Responses = require('../utils/responses');
const Dynamo = require('../utils/dynamo');
const AWS = require('aws-sdk')
const uuid = require('uuid')

const s3Client = new AWS.S3()

const bucket = process.env.bucketName;
const tableName = process.env.tableName;

exports.handler = async event => {
    if (!event.body)
        return Responses._400({message: 'missing body parameter of the request'})

    const parsedBody = JSON.parse(event.body);
    if (!parsedBody.fileName)
        return Responses._400({message: 'missing parameter fileName in the body of the request'})
    
    const url = await s3Client.getSignedUrlPromise('putObject', {
        Bucket: process.env.bucketName,
        Key: parsedBody.fileName,
    });

    const fileData = {
        ID: uuid.v4(),
        fileName: parsedBody.fileName,
        fileUrl: `https://${bucket}.s3.amazonaws.com/${parsedBody.fileName}`,
    };

    const res = await Dynamo.write(fileData, tableName).catch(error => ({ error }));
    if (!res)
        return Responses._400({ message: `Failed to create file ${fileData.fileName}` });
    else if (res && res.error)
        return Responses._400({ message: `${res.error}` });
    return Responses._200({ newFile: res, url, tableName});
}
