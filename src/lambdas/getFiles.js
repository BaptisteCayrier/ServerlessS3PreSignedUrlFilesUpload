const Responses = require('../utils/responses');
const Dynamo = require('../utils/dynamo');

const tableName = process.env.tableName;

exports.handler = async () => {
    const res = await Dynamo.scan(tableName).catch(error => ({ error }));
    if (!res)
        return Responses._400({ message: `No data on table: ${tableName}` });
    else if (res && res.error)
        return Responses._400({ message: `${res.error}` });
    return Responses._200(res);
}
