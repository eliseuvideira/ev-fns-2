import { S3ClientConfig } from "@aws-sdk/client-s3";
import { __Complete } from "./Complete";

export type __Region = __Complete<Pick<S3ClientConfig, "region">>;
