import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const createDownload =
  (client: S3Client, bucket: string) => async (filename: string) =>
    client.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: filename,
      }),
    );
