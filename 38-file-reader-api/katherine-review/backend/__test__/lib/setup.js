'use strict';

const awsSDKMock = require('aws-sdk-mock');
const faker = require('faker');

// Mock the environment
process.env.PORT = 7000;
process.env.MONGODB_URI = 'mongodb://localhost/testing';
process.env.CORS_ORIGIN = 'http://localhost:8080';
process.env.CLOUD_SECRET = 'awlfkawlkfmaglksemglskmgslkefmslekgmsgdlkwelkwn';
process.env.AWS_BUCKET='charity-choice';
process.env.AWS_ACCESS_KEY_ID='TEMP';
process.env.AWS_SECRET_ACCESS_KEY='TEMP';

awsSDKMock.mock('S3', 'upload', (params, callback) => {
  if(!params.Key || !params.Bucket || !params.Body || !params.ACL)
    return callback(new Error('__AWS_USAGE_ERROR__ key bucket acl and body required'));
  if(params.ACL !== 'public-read')
    return callback(new Error('__AWS_USAGE_ERROR__ ACL must be public-read '));
  if(params.AWS_BUCKET !== process.env.BUCKET)
    return callback(new Error('__AWS_USAGE_ERROR__ wrong bucket'));

  callback(null, {Location: faker.internet.url()});
});

awsSDKMock.mock('S3', 'deleteObject', (params, callback) => {
  if(!params.Key || !params.Bucket )
    return callback(new Error('__AWS_USAGE_ERROR__ key bucket required'));
  if(params.AWS_BUCKET !== process.env.BUCKET)
    return callback(new Error('__AWS_USAGE_ERROR__ wrong bucket'));
  callback(null, {});
});
