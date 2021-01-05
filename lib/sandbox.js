"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
const clientOptions = {
    keyPath: `${__dirname}/api-key.json`,
};
const client = client_1.Client.create(clientOptions);
const run = async () => {
    await client.submitForReview('com.timerocket.app', '1.0.25', {
        autoAttachVersionCode: 48,
        releaseNotes: [
            {
                lang: 'en-US',
                text: 'New and awesome features'
            }
        ],
        details: {
            defaultLanguage: 'en-US',
            contactWebsite: 'https://timerocket.com',
            contactEmail: 'josh.woodcock@timerocket.com',
            contactPhone: '407-235-4361'
        },
        listings: [
            {
                language: 'en-US',
                title: 'BestApp',
                fullDescription: 'The best app of all time that has everything you ever wanted and needed',
                shortDescription: 'A really great app',
                video: 'https://youtube.com/?v=link-to-my-video'
            }
        ]
    });
};
run().then().catch((e) => {
    console.error(`Error: ${e.message}`);
    console.debug(`Stack: ${e.stack}`);
    process.exit(1);
});
//# sourceMappingURL=sandbox.js.map