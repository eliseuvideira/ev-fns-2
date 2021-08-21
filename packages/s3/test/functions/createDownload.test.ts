const ObjectCommand = {};

const GetObjectCommand = jest.fn(() => ObjectCommand);

jest.mock("@aws-sdk/client-s3", () => {
  return {
    GetObjectCommand,
  };
});

import { createDownload } from "../../src/functions/createDownload";

describe("createDownload", () => {
  it("creates a s3 download function", async () => {
    expect.assertions(5);

    const sent = {};
    const send = jest.fn(() => sent);
    const client = { send } as any;
    const bucket = Date.now().toString() + Math.random().toString();
    const filename = Date.now().toString() + Math.random().toString();

    const download = createDownload(client, bucket);

    const blob = await download(filename);

    expect(GetObjectCommand).toHaveBeenCalledTimes(1);
    expect(GetObjectCommand).toHaveBeenCalledWith({
      Bucket: bucket,
      Key: filename,
    });
    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith(ObjectCommand);
    expect(blob).toBe(sent);
  });
});
