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
exports.ReleaseClient = void 0;
const track_id_1 = require("./track-id");
class ReleaseClient {
    constructor(tokenProvider, editClient) {
        this.tokenProvider = tokenProvider;
        this.editClient = editClient;
    }
    async submitForReview(packageName, versionName, options) {
        const opts = options || {};
        const useOptions = Object.assign({ track: track_id_1.TrackId.PRODUCTION }, opts);
        let editId = useOptions.editId;
        if (!editId) {
            editId = await this.editClient.createEdit(packageName);
        }
        if (useOptions.details) {
            await this.editClient.setDetails(packageName, editId, useOptions.details);
        }
        const notes = this._getReleaseNotesForVersion(options.releaseNotes);
        const publisher = await this.tokenProvider.getPublisher();
        if (useOptions.listings) {
            for (const listing of useOptions.listings) {
                await publisher.edits.listings.patch({
                    language: listing.language,
                    packageName,
                    editId,
                    requestBody: listing
                });
            }
        }
        const optionals = {
            versionCodes: []
        };
        optionals.versionCodes = useOptions.autoAttachVersionCode ? [useOptions.autoAttachVersionCode] : undefined;
        await publisher.edits.tracks.patch({
            packageName,
            editId,
            track: useOptions.track,
            requestBody: {
                releases: [
                    Object.assign({ name: versionName, status: 'completed', releaseNotes: notes.length > 0 ? notes : [{ language: 'en-US', text: `New features for ${versionName}` }] }, optionals)
                ],
                track: useOptions.track
            }
        });
        await publisher.edits.commit({
            packageName,
            editId,
        });
    }
    async getReleases(packageName, trackId, editId) {
        let useEditId = editId;
        if (!useEditId) {
            useEditId = await this.editClient.createEdit(packageName);
        }
        const publisher = await this.tokenProvider.getPublisher();
        const response = await publisher.edits.tracks.get({
            track: trackId,
            packageName,
            editId: useEditId
        });
        return response.data.releases;
    }
    _getReleaseNotesForVersion(releaseNotes) {
        if (!releaseNotes) {
            return [];
        }
        else if (typeof releaseNotes === "string") {
            const localizedText = {
                language: 'en-US',
                text: releaseNotes
            };
            return [localizedText];
        }
        else if (Array.isArray(releaseNotes)) {
            return releaseNotes.map(releaseNote => ({
                language: releaseNote.lang,
                text: releaseNote.text
            }));
        }
        else {
            const localizedText = {
                language: releaseNotes.lang,
                text: releaseNotes.text
            };
            return [localizedText];
        }
    }
}
exports.ReleaseClient = ReleaseClient;
//# sourceMappingURL=release-client.js.map