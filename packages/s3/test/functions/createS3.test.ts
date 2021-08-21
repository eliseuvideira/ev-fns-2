const key = Date.now().toString() + Math.random().toString();
const S3ClientConstructor = jest.fn();

class __S3ClientMock {
  public key: string;

  constructor(...args: any[]) {
    this.key = key;
    S3ClientConstructor(...args);
  }
}

jest.mock("@aws-sdk/client-s3", () => {
  return { S3Client: __S3ClientMock };
});

const upload = { key: Date.now().toString() + Math.random().toString() };

const createUpload = jest.fn(() => upload);

jest.mock("../../src/functions/createUpload", () => {
  return { createUpload };
});

const download = { key: Date.now().toString() + Math.random().toString() };

const createDownload = jest.fn(() => download);

jest.mock("../../src/functions/createDownload", () => {
  return { createDownload };
});

import { createS3 } from "../../src/functions/createS3";

describe("createS3", () => {
  it("creates an s3 object that holds client, upload and download", async () => {
    expect.assertions(9);

    const region = Date.now().toString() + Math.random().toString();
    const accessKeyId = Date.now().toString() + Math.random().toString();
    const secretAccessKey = Date.now().toString() + Math.random().toString();
    const bucket = Date.now().toString() + Math.random().toString();

    const config = {
      region,
      credentials: { accessKeyId, secretAccessKey },
    };

    const S3 = createS3({ bucket, ...config });

    expect(S3ClientConstructor).toHaveBeenCalledTimes(1);
    expect(S3ClientConstructor).toHaveBeenCalledWith(config);
    expect(createUpload).toHaveBeenCalledTimes(1);
    expect(createUpload).toHaveBeenCalledWith({ key }, bucket);
    expect(createDownload).toHaveBeenCalledTimes(1);
    expect(createDownload).toHaveBeenCalledWith({ key }, bucket);
    expect(S3._client).toBeInstanceOf(__S3ClientMock);
    expect(S3.download).toBe(download);
    expect(S3.upload).toBe(upload);
  });
});
