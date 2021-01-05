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
exports.EditsClient = void 0;
class EditsClient {
    constructor(tokenProvider) {
        this.tokenProvider = tokenProvider;
    }
    /**
     * With the Google Play API you need an edit to do pretty much anything even if you're doing something not related to an edit
     * Don't ask me why go ask your mother
     *
     * This creates an edit ID so you can do stuff.
     *
     * @param {string} packageName
     *
     * @returns {Promise<string>}
     */
    async createEdit(packageName) {
        const publisher = await this.tokenProvider.getPublisher();
        const result = await publisher.edits.insert({ packageName });
        return result.data.id;
    }
    async commitEdit(packageName, editId) {
        const publisher = await this.tokenProvider.getPublisher();
        await publisher.edits.commit({
            packageName,
            editId,
        });
    }
    async setDetails(packageName, editId, details) {
        const publisher = await this.tokenProvider.getPublisher();
        await publisher.edits.details.patch({
            packageName,
            editId,
            requestBody: details
        });
    }
}
exports.EditsClient = EditsClient;
//# sourceMappingURL=edits.client.js.map