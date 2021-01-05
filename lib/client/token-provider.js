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
exports.TokenProvider = void 0;
const fs = require("fs");
const googleapis_1 = require("googleapis");
class TokenProvider {
    constructor(options) {
        this.options = options;
    }
    async _getClient() {
        if (!this.client) {
            const authData = JSON.parse(fs.readFileSync(this.options.keyPath).toString());
            this.client = new googleapis_1.google.auth.JWT(authData.client_email, undefined, authData.private_key, ["https://www.googleapis.com/auth/androidpublisher"]);
            await this.client.authorize();
        }
        return this.client;
    }
    async getPublisher() {
        if (!this.publisher) {
            const publisher = googleapis_1.google.androidpublisher;
            const client = await this._getClient();
            this.publisher = publisher({
                auth: client,
                version: 'v3'
            });
        }
        return this.publisher;
    }
    getKeyFilePath() {
        return this.options.keyPath;
    }
}
exports.TokenProvider = TokenProvider;
//# sourceMappingURL=token-provider.js.map