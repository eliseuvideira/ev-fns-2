import { S3Client } from "@aws-sdk/client-s3";
import { __ClientConfig } from "../types/ClientConfig";
import { createDownload } from "./createDownload";
import { createUpload } from "./createUpload";

export interface CreateS3Config extends __ClientConfig {
  bucket: string;
}

export const createS3 = ({ bucket, ...config }: CreateS3Config) => {
  const _client = new S3Client(config);

  const upload = createUpload(_client, bucket);

  const download = createDownload(_client, bucket);

  return { _client, upload, download };
};
