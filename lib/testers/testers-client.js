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
exports.TestersClient = void 0;
class TestersClient {
    constructor(releaseClient) {
        this.releaseClient = releaseClient;
    }
    /**
     * Adds builds to groups. Also known as adding version codes to tracks. Why did Google call it tracks? I don't know, go ask your mother.
     *
     * @param {string} packageName com.something.app
     * @param {string} versionCode
     * @param {string} versionName Semantic version eg. 1.0.1
     * @param {string} groupName Also called a "Track" according to the androidpublisher API documentation
     */
    async addBuildToTestingGroup(packageName, versionCode, versionName, groupName) {
        await this.releaseClient.submitForReview(packageName, versionName, {
            track: groupName,
            autoAttachVersionCode: versionCode,
        });
    }
}
exports.TestersClient = TestersClient;
//# sourceMappingURL=testers-client.js.map