import * as dotenv from "dotenv";

dotenv.config();

interface Services {
  server: string;
  client: string;
}

interface Config {
  region: string;
  zone: string;
  projectId: string;
  credentials: string;
  services: Services;
}

const services: Services = {
  server: process.env.API_ARTIFACT_REGISTRY_CONTAINER || "",
  client: process.env.CLIENT_ARTIFACT_REGISTRY_CONTAINER || "",
};

// Read config from environment variables
export const config: Config = {
  region: process.env.GCP_REGION || "asia-east1",
  zone: process.env.GCP_ZONE || "asia-east1-c",
  projectId: process.env.PROJECT_ID || "gcp-cdk-tf",
  credentials: process.env.GOOGLE_CREDENTIALS || "{}",
  services,
};
