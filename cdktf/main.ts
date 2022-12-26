import { App } from "cdktf";
import { CloudRunStack } from "./stacks";


const app = new App();

// Stacks are the main constructs in CDKTF
// Register constructs with the app so that they can be referenced
new CloudRunStack(app, "cdktf");

app.synth();
