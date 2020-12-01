const Responses = require('../utils/responses');
const Dynamo = require('../utils/dynamo');

const tableName = process.env.tableName;

exports.handler = async event => {
    if (!event.pathParameters || !event.pathParameters.ID)
        return Responses._400({message: 'missing the ID from the path'})

    const ID = event.pathParameters.ID;
    const res = await Dynamo.get(ID, tableName).catch(error => ({ error }));
    if (!res)
        return Responses._400({ message: 'Failed to get file by ID' })
    else if (res && res.error)
        return Responses._400({ message: `${res.error}` });
    return Responses._200(res)
}
