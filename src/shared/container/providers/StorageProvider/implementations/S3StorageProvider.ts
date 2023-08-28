import { S3 } from "aws-sdk";
import { resolve } from "path";
import { IStorageProvider } from "../IStorageProvider";
import upload from "../../../../../config/upload";
import fs from "fs";

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
    });
  }
  async save(file: string, folder: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalName);

    await this.client.putObject();
  }
  async delete(file: string, folder: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { S3StorageProvider };
