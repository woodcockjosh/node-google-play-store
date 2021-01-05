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
import { ReleaseClientInterface } from "./release-client.interface";
import { SubmitForReviewOptions } from "./submit-for-review-options";
import { EditsClient } from "../edits/edits.client";
import { TokenProvider } from "../client/token-provider";
import { TrackId } from "./track-id";
import { androidpublisher_v3 } from "googleapis";
export declare class ReleaseClient implements ReleaseClientInterface {
    private readonly tokenProvider;
    private readonly editClient;
    constructor(tokenProvider: TokenProvider, editClient: EditsClient);
    submitForReview(packageName: string, versionName: string, options?: SubmitForReviewOptions): Promise<void>;
    private _addRelease;
    getReleases(packageName: any, trackId: TrackId, editId?: string): Promise<androidpublisher_v3.Schema$TrackRelease[]>;
    private _getReleaseNotesForVersion;
}
