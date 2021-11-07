"use strict";
const pulumi = require("@pulumi/pulumi");
const aws = require("@pulumi/aws");
const awsx = require("@pulumi/awsx");

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket("pulumi-test-bucket-us-east-2", {
    website: {
        indexDocument: "index.html",
    },
});
const bucketObject = new aws.s3.BucketObject("index.html", {
    acl: "public-read",
    contentType: "text/html",
    bucket: bucket,
    source: new pulumi.asset.FileAsset("index.html")
});

// Export the name of the bucket
exports.bucketName = bucket.id;
exports.bucketEndpoint = pulumi.interpolate`http://${bucket.websiteEndpoint}`;
