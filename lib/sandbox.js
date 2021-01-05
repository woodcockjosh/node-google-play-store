"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
const clientOptions = {
    keyPath: `${__dirname}/api-key.json`,
};
const client = client_1.Client.create(clientOptions);
const run = async () => {
    await client.uploadBuild('com.example.app', '/path/to/your/apk');
};
run().then().catch((e) => {
    console.error(`Error: ${e.message}`);
    console.debug(`Stack: ${e.stack}`);
    process.exit(1);
});
//# sourceMappingURL=sandbox.js.map