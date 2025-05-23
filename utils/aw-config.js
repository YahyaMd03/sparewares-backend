const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS,
    region: process.env.S3_BUCKET_REGION
});

const s3 = new AWS.S3();

module.exports = { s3 };
