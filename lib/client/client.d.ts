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
import { DownloadsClient } from "../downloads/downloads-client";
import { ClientOptions } from "./client-options";
import { DownloadsClientInterface } from "../downloads/downloads-client.interface";
import { AppsOverviewRow, DownloadAppsOverviewReportOptions, GetAppDownloadsOptions, GetAppDownloadsResult } from "../downloads";
import { EditsClientInterface } from "../edits/edits-client.interface";
import { EditsClient } from "../edits/edits.client";
import { BuildsClientInterface } from "../builds/builds-client.interface";
import { BuildsClient } from "../builds/builds-client";
import { androidpublisher_v3 } from "googleapis";
import { BuildUploadOptions } from "../builds";
import { ReleaseClientInterface } from "../release/release-client.interface";
import { ReleaseClient } from "../release/release-client";
import { SubmitForReviewOptions } from "../release";
import { TestersClient } from "../testers/testers-client";
import { TestersClientInterface } from "../testers/testers-client.interface";
/**
 * A client for the App Store Connect API.
 */
export declare class Client implements DownloadsClientInterface, EditsClientInterface, BuildsClientInterface, ReleaseClientInterface, TestersClientInterface {
    private readonly downloadsClient;
    private readonly editsClient;
    private readonly buildClient;
    private readonly releaseClient;
    private readonly testersClient;
    /**
     * Creates an instance of a client to make requests to app store connect API
     *
     * @param {ClientOptions} clientOptions
     */
    static create(clientOptions: ClientOptions): Client;
    constructor(downloadsClient: DownloadsClient, editsClient: EditsClient, buildClient: BuildsClient, releaseClient: ReleaseClient, testersClient: TestersClient);
    /**
     * Downloads a summary of a sales report.
     *
     * @param {DownloadAppsOverviewReportOptions} opts The options.
     *
     * @return {Promise<AppsOverviewRow[]>} The promise with the rows.
     */
    downloadAppOverviewReport(opts: DownloadAppsOverviewReportOptions): Promise<AppsOverviewRow[]>;
    /**
     * Returns a summary of app downloads.
     *
     * @param {GetAppDownloadsOptions} opts The options.
     *
     * @return {Promise<GetAppDownloadsResult>} The promise with the result.
     */
    getAppDownloads(opts: GetAppDownloadsOptions): Promise<GetAppDownloadsResult>;
    createEdit(packageName: string): Promise<string>;
    commitEdit(packageName: string, editId: string): Promise<void>;
    uploadBuild(packageName: string, buildPath: string, options?: BuildUploadOptions): Promise<string>;
    getApks(packageName: string, editId?: string): Promise<androidpublisher_v3.Schema$Apk[]>;
    submitForReview(packageName: string, versionName: string, options?: SubmitForReviewOptions): Promise<void>;
    addBuildToTestingGroup(packageName: string, versionCode: number, versionName: string, groupName: string): Promise<void>;
}
