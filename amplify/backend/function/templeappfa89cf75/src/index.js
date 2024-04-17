const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({ region: "us-east-2" });
const dynamoDB = new DynamoDBDocumentClient(client);

exports.handler = async (event) => {
  const searchParam = event.queryStringParameters.name; // get the search parameter from the event object
  console.log("searchParam" + searchParam);

  const command = new ScanCommand({
    TableName: "truetemples", // replace with your table name
    FilterExpression: "contains(#name, :name)",
    ExpressionAttributeNames: {
      "#name": "name",
    },
    ExpressionAttributeValues: {
      ":name": searchParam,
    },
  });

  try {
    const data = await dynamoDB.send(command); // query the table
    return {
      isBase64Encoded: false,
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data.Items),
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
