import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { ReadStream } from "fs";

export const createUpload =
  (client: S3Client, bucket: string) =>
  async (filename: string, mimetype: string, stream: ReadStream) =>
    client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: filename,
        Body: stream,
        ContentType: mimetype,
      }),
    );
