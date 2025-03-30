const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, BatchWriteCommand } = require('@aws-sdk/lib-dynamodb');
const fs = require('fs');

// Initialize DynamoDB Client
const ddbClient = new DynamoDBClient({ region: process.env.TABLE_REGION || 'ap-southeast-2' }); // Adjust region as needed
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

const tableName = "student-dev";

console.log(`Using table: ${tableName}`);

// Read your data (make sure students.json is structured correctly)
// TODO: read students.json from s3 bucket
const students = JSON.parse(fs.readFileSync('students.json', 'utf8')); 

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const batchWrite = async () => {
  try {
    let batches = [];
    while (students.length) {
      // DynamoDB allows a max of 25 items per batch write
      const batchItems = students.splice(0, 25);
      
      const params = {
        RequestItems: {
          [tableName]: batchItems.map(student => ({
            PutRequest: { Item: student }
          }))
        }
      };

      // Execute batch write
      const command = new BatchWriteCommand(params);
      await ddbDocClient.send(command);
      console.log(`Inserted batch of ${batchItems.length} items`);
      await sleep(1000); // Sleep for 1 second to avoid throttling
    }
    console.log('All data inserted successfully');
  } catch (err) {
    console.error('Error inserting data:', err);
  }
};

// Execute the batch write
batchWrite();
