import dotenv from "dotenv-safe";
import fs from "fs";
import path from "path";

dotenv.config({
  path: path.join(__dirname, "..", ".env"),
  example: path.join(__dirname, "..", ".env.example"),
});

import { Readable } from "stream";
import { createS3 } from "../src/index";

const mktemp = () =>
  path.join("/tmp", `/${Date.now()}${Math.random().toString().slice(2)}`);

describe("s3", () => {
  it("uploads a file to s3", async () => {
    expect.assertions(1);

    const S3 = createS3({
      bucket: process.env.AWS_S3_BUCKET_NAME || "",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      },
      region: process.env.AWS_REGION || "",
    });

    const originContent =
      Date.now().toString() + Math.random().toString().slice(2);

    const origin = mktemp();

    const filename = path.basename(origin);

    await fs.promises.writeFile(origin, originContent);

    await S3.upload(filename, "text/plain", fs.createReadStream(origin));

    const destination = mktemp();

    const blob = await S3.download(filename);

    if (!blob.Body) {
      fail();
    }

    if (!(blob.Body instanceof Readable)) {
      fail();
    }

    const stream = blob.Body;

    await new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(destination);

      writeStream.on("finish", resolve);
      writeStream.on("error", reject);

      stream.pipe(writeStream);
    });

    const destinationContentRaw = await fs.promises.readFile(destination);

    const destinationContent = destinationContentRaw.toString();

    expect(destinationContent).toBe(originContent);
  });
});
