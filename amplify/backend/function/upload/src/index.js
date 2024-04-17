/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const s3Client = new S3Client({ region: "us-east-2" }); // replace with your region
const dynamoDBClient = new DynamoDBClient({ region: "us-east-2" }); // replace with your region
const dynamoDB = DynamoDBDocumentClient.from(dynamoDBClient);
const csv = require("csv-parser");

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  let fileStream = "";
  // Get the bucket name and the key for the uploaded file
  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, " ")
  );

  if (!key.endsWith(".csv")) {
    console.log(`File is not a CSV file: ${key}`);
    return;
  }
  try {
    const file = await s3Client.send(
      new GetObjectCommand({ Bucket: bucket, Key: key })
    );
    fileStream = file.Body;
    // ... rest of your code ...
  } catch (error) {
    console.error(`Failed to get file from S3: ${bucket}/${key}`, error);
  }

  let processedFirstRow = false;
  // Parse the CSV data
  fileStream
    .pipe(csv())
    .on("data", async (row) => {
      if (processedFirstRow) {
        return;
      }
      const transformedRow = {
        name: row.name ? { S: row.name } : { NULL: true },
        location: row.location ? { S: row.location } : { NULL: true },
        date: row.date ? { S: row.date } : { NULL: true },
        t: { S: row.temple_name_id },
        city: row.city ? { S: row.city } : { NULL: true },
        state_region: row.state_region
          ? { S: row.state_region }
          : { NULL: true },
        country: row.country ? { S: row.country } : { NULL: true },
        walk_score: row.walk_score ? { N: row.walk_score } : { NULL: true },
        bike_score: row.bike_score ? { N: row.bike_score } : { NULL: true },
        transit_score: row.transit_score
          ? { N: row.transit_score }
          : { NULL: true },
        distance_to_city_center_mi: row.distance_to_city_center_mi
          ? { N: row.distance_to_city_center_mi }
          : { NULL: true },
        closest_bus_mi: row.closest_bus_mi
          ? { N: row.closest_bus_mi }
          : { NULL: true },
        closest_light_rail_mi: row.closest_light_rail_mi
          ? { N: row.closest_light_rail_mi }
          : { NULL: true },
        closest_subway_mi: row.closest_subway_mi
          ? { N: row.closest_subway_mi }
          : { NULL: true },
        closest_other_rail_mi: row.closest_other_rail_mi
          ? { N: row.closest_other_rail_mi }
          : { NULL: true },
        transit_frequency: row.transit_frequency
          ? { N: row.transit_frequency }
          : { NULL: true },
        image_id: row.image_id ? { S: row.image_id } : { NULL: true },
      };
      console.log(`Transformed row data: ${JSON.stringify(transformedRow)}`);

      // Write each row to the DynamoDB table
      const command = new PutItemCommand({
        TableName: "temples-dev",
        Item: transformedRow,
      });

      const response = await dynamoDBClient.send(command);
      console.log(response);
    })
    .on("end", () => {
      console.log("CSV processing completed");
    })
    .on("error", (error) => {
      console.error("Error processing CSV", error);
    });
};
