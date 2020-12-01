const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient()

const Dynamo = {
    async scan(TableName) {
        const params = {
            TableName,
        }
        const res = await documentClient.scan(params).promise()
        if (!res)
            throw Error (`There was an error scanning table ${TableName}`);
        return res;
    },
    async get (ID, TableName) {
        const params = {
            TableName,
            Key : {
                ID
            }
        };

        const data = await documentClient.get(params).promise();
        if (!data || !data.Item)
            throw Error(`There was an error fetching the data for ID of ${ID} from ${TableName}`);
        return data.Item;
    },

    async write (data, TableName) {
        if (!data.ID)
            throw Error('No ID on the data');
        
        const params = {
            TableName,
            Item: data,
        };
    
        const res = await documentClient.put(params).promise();
        if (!res)
            throw Error (`There was an error inserting ID of ${data.ID} in table ${TableName}`);
        return data;
    }
}

module.exports = Dynamo;