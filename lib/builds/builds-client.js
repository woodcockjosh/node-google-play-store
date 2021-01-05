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
exports.BuildsClient = void 0;
const fs = require("fs");
class BuildsClient {
    /**
     * @param {TokenProvider} tokenProvider
     * @param {EditsClient} editsClient
     */
    constructor(tokenProvider, editsClient) {
        this.tokenProvider = tokenProvider;
        this.editsClient = editsClient;
    }
    /**
     * Uploads an APK file and returns the edit ID used with the upload.
     *
     * @param {string} packageName eg. com.example.app
     * @param {string} buildPath Full path to the (APK / AAB) file
     * @param {BuildUploadOptions?} options
     *
     * @returns {Promise<string>}
     */
    async uploadBuild(packageName, buildPath, options) {
        const opts = options || {};
        const extension = buildPath.toLowerCase().split('.').slice(1).join('.');
        const useOptions = Object.assign({ commitEdit: true }, opts);
        const publisher = await this.tokenProvider.getPublisher();
        const editId = await this.editsClient.createEdit(packageName);
        if (extension === "apk") {
            await publisher.edits.apks.upload({
                editId,
                packageName,
                media: {
                    body: fs.createReadStream(buildPath),
                    mimeType: "application/octet-stream"
                }
            });
        }
        else if (extension === "aab") {
            await publisher.edits.bundles.upload({
                editId,
                packageName,
                media: {
                    body: fs.createReadStream(buildPath),
                    mimeType: "application/octet-stream"
                }
            });
        }
        if (useOptions.commitEdit) {
            await publisher.edits.commit({
                packageName,
                editId,
            });
        }
        return editId;
    }
    async getApks(packageName, editId) {
        if (!editId) {
            editId = await this.editsClient.createEdit(packageName);
        }
        const publisher = await this.tokenProvider.getPublisher();
        const result = await publisher.edits.apks.list({
            packageName,
            editId,
        });
        if (result.status >= 400) {
            throw new Error(`Error while getting apks for package ${packageName} with edit Id: ${editId}. Status code: ${result.status}. Error: ${result.statusText || 'Unknown'}`);
        }
        return result.data.apks;
    }
}
exports.BuildsClient = BuildsClient;
//# sourceMappingURL=builds-client.js.map