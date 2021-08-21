import { S3ClientConfig } from "@aws-sdk/client-s3";

export type __Config = Omit<Omit<S3ClientConfig, "credentials">, "region">;
