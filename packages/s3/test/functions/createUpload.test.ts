const ObjectCommand = {};

const PutObjectCommand = jest.fn(() => ObjectCommand);

jest.mock("@aws-sdk/client-s3", () => {
  return {
    PutObjectCommand,
  };
});

import { createUpload } from "../../src/functions/createUpload";

describe("createUpload", () => {
  it("creates a s3 upload function", async () => {
    expect.assertions(5);

    const sent = {};
    const send = jest.fn(() => sent);
    const client = { send } as any;
    const bucket = Date.now().toString() + Math.random().toString();
    const filename = Date.now().toString() + Math.random().toString();
    const mimetype = Date.now().toString() + Math.random().toString();
    const stream = (Date.now().toString() + Math.random().toString()) as any;

    const upload = createUpload(client, bucket);

    const blob = await upload(filename, mimetype, stream);

    expect(PutObjectCommand).toHaveBeenCalledTimes(1);
    expect(PutObjectCommand).toHaveBeenCalledWith({
      Bucket: bucket,
      Key: filename,
      Body: stream,
      ContentType: mimetype,
    });
    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith(ObjectCommand);
    expect(blob).toBe(sent);
  });
});
