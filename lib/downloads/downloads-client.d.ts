/**
 * This file is part of the node-google-play-store distribution.
 * Copyright (c) e.GO Digital GmbH, Aachen, Germany (https://www.e-go-digital.com/)
 *
 * node-google-play-store is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * node-google-play-store is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
import { GetAppDownloadsOptions } from "./get-app-download-options";
import { GetAppDownloadsResult } from "./get-app-downloads-result";
import { DownloadAppsOverviewReportOptions } from "./download-apps-overview-report-options";
import { AppsOverviewRow } from "./apps-overview-row";
import { DownloadsClientInterface } from "./downloads-client.interface";
import { TokenProvider } from "../client/token-provider";
/**
 * A client for the Play Store Connect API.
 */
export declare class DownloadsClient implements DownloadsClientInterface {
    private readonly tokenProvider;
    /**
     * Initializes a new instance of that class.
     *
     * @param {TokenProvider} tokenProvider
     */
    constructor(tokenProvider: TokenProvider);
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
}
