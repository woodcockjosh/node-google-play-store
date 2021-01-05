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
import { TokenProvider } from "../client/token-provider";
import { BuildsClientInterface } from "./builds-client.interface";
import { EditsClient } from "../edits/edits.client";
import { androidpublisher_v3 } from "googleapis";
import { BuildUploadOptions } from "./build-upload-options";
export declare class BuildsClient implements BuildsClientInterface {
    private readonly tokenProvider;
    private readonly editsClient;
    /**
     * @param {TokenProvider} tokenProvider
     * @param {EditsClient} editsClient
     */
    constructor(tokenProvider: TokenProvider, editsClient: EditsClient);
    /**
     * Uploads an APK file and returns the edit ID used with the upload.
     *
     * @param {string} packageName eg. com.example.app
     * @param {string} buildPath Full path to the (APK / AAB) file
     * @param {BuildUploadOptions?} options
     *
     * @returns {Promise<string>}
     */
    uploadBuild(packageName: string, buildPath: string, options?: BuildUploadOptions): Promise<string>;
    getApks(packageName: string, editId?: string): Promise<androidpublisher_v3.Schema$Apk[]>;
}
