import { Construct } from "constructs";
import { TerraformStack, TerraformOutput } from "cdktf";
import { GoogleProvider } from "@cdktf/provider-google/lib/provider";
import { CloudRunService } from "@cdktf/provider-google/lib/cloud-run-service";
import { DataGoogleIamPolicy } from "@cdktf/provider-google/lib/data-google-iam-policy";
import { CloudRunServiceIamPolicy } from "@cdktf/provider-google/lib/cloud-run-service-iam-policy";

import { config } from "./config";

export class CloudRunStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    // Dockerized services deployed to google artifact registry
    const { credentials, region: local, zone, projectId, services } = config;

    const server = services.server;
    const client = services.client;

    new GoogleProvider(this, "google-auth", {
      zone,
      credentials,
      region: local,
      project: projectId,
    });

    const cloud_run_svc_app_server = new CloudRunService(
      this,
      "gcp-cdk-cloudrun-svc-server",
      {
        location: local,
        name: "gcp-cdktf-cloudrun-svc-server",
        template: {
          spec: {
            containers: [{ image: server }],
          },
        },
      }
    );

    const cloud_run_svc_app_client = new CloudRunService(
      this,
      "gcp-cdk-cloudrun-svc-client",
      {
        location: local,
        name: "gcp-cdktf-cloudrun-svc-client",
        template: {
          spec: {
            containers: [{ image: client }],
          },
        },
      }
    );

    const policy_data = new DataGoogleIamPolicy(this, "data-no-auth", {
      binding: [
        {
          role: "roles/run.invoker",
          members: ["allUsers"],
        },
      ],
    });

    new CloudRunServiceIamPolicy(this, "runs-vc-iam-policy-server", {
      location: local,
      project: cloud_run_svc_app_server.project,
      service: cloud_run_svc_app_server.name,
      policyData: policy_data.policyData,
    });

    new CloudRunServiceIamPolicy(this, "runs-vc-iam-policy-client", {
      location: local,
      project: cloud_run_svc_app_server.project,
      service: cloud_run_svc_app_server.name,
      policyData: policy_data.policyData,
    });

    new TerraformOutput(this, "cdktf-cloudrun-server-url", {
      value: cloud_run_svc_app_server.status.get(0).url,
    });

    new TerraformOutput(this, "cdktf-cloudrun-client-url", {
      value: cloud_run_svc_app_client.status.get(0).url,
    });
  }
}
