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

    new GoogleProvider(this, "GoogleAuth", {
      zone,
      credentials,
      region: local,
      project: projectId,
    });

    const containers = [{ image: server }, { image: client }];

    const cloudrunsvcapp = new CloudRunService(this, "GcpCDKCloudrunsvc", {
      location: local,
      name: "gcpcdktfcloudrunsvc2020",
      template: {
        spec: {
          containers,
        },
      },
    });

    const policy_data = new DataGoogleIamPolicy(this, "datanoauth", {
      binding: [
        {
          role: "roles/run.invoker",
          members: ["allUsers"],
        },
      ],
    });

    new CloudRunServiceIamPolicy(this, "runsvciampolicy", {
      location: local,
      project: cloudrunsvcapp.project,
      service: cloudrunsvcapp.name,
      policyData: policy_data.policyData,
    });

    new TerraformOutput(this, "cdktfcloudrunUrl", {
      value: "${" + cloudrunsvcapp.fqn + ".status[0].url}",
    });

    new TerraformOutput(this, "cdktfcloudrunUrlN", {
      value: cloudrunsvcapp.status.get(0).url,
    });
  }
}
