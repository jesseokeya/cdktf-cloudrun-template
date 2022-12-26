import * as dotenv from "dotenv";

dotenv.config();

interface Config {
  region: string;
  zone: string;
  projectId: string;
  credentials: string;
}

// Read config from environment variables
export const config: Config = {
  region: process.env.REGION || "asia-east1",
  zone: process.env.AVAILABILITY_ZONE || "asia-east1-c",
  projectId: process.env.PROJECT_ID || "gcp-cdk-tf",
  credentials: process.env.CREDENTIALS || "{}",
};
