const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const dotenv = require("dotenv");
dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function uploadFile(base64, filename) {
  const base64Data = new Buffer.from(
    base64.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  const type = base64.split(";")[0].split("/")[1];

  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Body: base64Data,
    ContentType: `image/${type}`,
    ContentEncoding: "base64",
    Key: `${filename}.${type}`,
  };
  try {
    const upload = (await s3.send(new PutObjectCommand(uploadParams)))
      .VersionId;
    if (upload) {
      return `${process.env.AWS_CLOUDFRONT_KEY}/${uploadParams.Key}?versionId=${upload}`;
    }
  } catch (err) {
    console.log(err);
  }
}



// <<<<<<<<<<<<<<<<<<<<<<<<       uploadPdfFile       >>>>>>>>>>>>>>>>>>>>> //


async function uploadPdfFile(base64, filename,Qualification) {

  const base64Data = new Buffer.from(
    base64.replace(/^data:application\/\w+;base64,/, ""),
    "base64"
  );

  const type = base64.split(";")[0].split("/")[1];
  // console.log(type);

  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Body: base64Data,
    ContentType: `application/${type}`,
    ContentEncoding: "base64",
    Key: `${filename}_${Qualification}.${type}`, 
    
  };
 
  try {
    const upload = (await s3.send(new PutObjectCommand(uploadParams)))
      .VersionId;
    if (upload) {
      return `${process.env.AWS_CLOUDFRONT_KEY}/${uploadParams.Key}?versionId=${upload}`;
      // console.log("Upload:",`${process.env.AWS_CLOUDFRONT_KEY}/${uploadParams.Key}?versionId=${upload}`);

    }
  } catch (err) {
    console.log(err);
  }
}
module.exports = { uploadFile,uploadPdfFile };