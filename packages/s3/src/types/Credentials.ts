import { S3ClientConfig } from "@aws-sdk/client-s3";
import { __Complete } from "./Complete";

export type __Credentials = __Complete<Pick<S3ClientConfig, "credentials">>;
