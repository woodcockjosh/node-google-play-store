"use strict";
/**
 * This file is part of the node-appstore-connect distribution.
 * Copyright (c) e.GO Digital GmbH, Aachen, Germany (https://www.e-go-digital.com/)
 *
 * node-appstore-connect is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * node-appstore-connect is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const downloads_client_1 = require("../downloads/downloads-client");
const token_provider_1 = require("./token-provider");
const edits_client_1 = require("../edits/edits.client");
const builds_client_1 = require("../builds/builds-client");
const release_client_1 = require("../release/release-client");
const testers_client_1 = require("../testers/testers-client");
/**
 * A client for the App Store Connect API.
 */
class Client {
    constructor(downloadsClient, editsClient, buildClient, releaseClient, testersClient) {
        this.downloadsClient = downloadsClient;
        this.editsClient = editsClient;
        this.buildClient = buildClient;
        this.releaseClient = releaseClient;
        this.testersClient = testersClient;
    }
    /**
     * Creates an instance of a client to make requests to app store connect API
     *
     * @param {ClientOptions} clientOptions
     */
    static create(clientOptions) {
        const tokenProvider = new token_provider_1.TokenProvider(clientOptions);
        const downloadsClient = new downloads_client_1.DownloadsClient(tokenProvider);
        const editsClient = new edits_client_1.EditsClient(tokenProvider);
        const build = new builds_client_1.BuildsClient(tokenProvider, editsClient);
        const releaseClient = new release_client_1.ReleaseClient(tokenProvider, editsClient);
        const testersClient = new testers_client_1.TestersClient(releaseClient);
        return new Client(downloadsClient, editsClient, build, releaseClient, testersClient);
    }
    /**
     * Downloads a summary of a sales report.
     *
     * @param {DownloadAppsOverviewReportOptions} opts The options.
     *
     * @return {Promise<AppsOverviewRow[]>} The promise with the rows.
     */
    downloadAppOverviewReport(opts) {
        return this.downloadsClient.downloadAppOverviewReport(opts);
    }
    /**
     * Returns a summary of app downloads.
     *
     * @param {GetAppDownloadsOptions} opts The options.
     *
     * @return {Promise<GetAppDownloadsResult>} The promise with the result.
     */
    getAppDownloads(opts) {
        return this.downloadsClient.getAppDownloads(opts);
    }
    createEdit(packageName) {
        return this.editsClient.createEdit(packageName);
    }
    commitEdit(packageName, editId) {
        return this.editsClient.commitEdit(packageName, editId);
    }
    uploadBuild(packageName, buildPath, options) {
        return this.buildClient.uploadBuild(packageName, buildPath, options);
    }
    getApks(packageName, editId) {
        return this.buildClient.getApks(packageName, editId);
    }
    submitForReview(packageName, versionName, options) {
        return this.releaseClient.submitForReview(packageName, versionName, options);
    }
    async addBuildToTestingGroup(packageName, versionCode, versionName, groupName) {
        return this.testersClient.addBuildToTestingGroup(packageName, versionCode, versionName, groupName);
    }
}
exports.Client = Client;
//# sourceMappingURL=client.js.map