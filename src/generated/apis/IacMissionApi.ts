/* tslint:disable */
/* eslint-disable */
/**
 * codebox Api
 * codebox api
 *
 * The version of the OpenAPI document: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  Mission,
  MissionCreationRequest,
  PaginatedMissionList,
} from '../models';
import {
    MissionFromJSON,
    MissionToJSON,
    MissionCreationRequestFromJSON,
    MissionCreationRequestToJSON,
    PaginatedMissionListFromJSON,
    PaginatedMissionListToJSON,
} from '../models';

export interface CreateMissionRequest {
    missionCreationRequest: MissionCreationRequest;
}

export interface GetMissionRequest {
    id: number;
}

export interface ListMissionsRequest {
    page?: number;
    size?: number;
}

/**
 * 
 */
export class IacMissionApi extends runtime.BaseAPI {

    /**
     */
    async createMissionRaw(requestParameters: CreateMissionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Mission>> {
        if (requestParameters.missionCreationRequest === null || requestParameters.missionCreationRequest === undefined) {
            throw new runtime.RequiredError('missionCreationRequest','Required parameter requestParameters.missionCreationRequest was null or undefined when calling createMission.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/api/iac/mission/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: MissionCreationRequestToJSON(requestParameters.missionCreationRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MissionFromJSON(jsonValue));
    }

    /**
     */
    async createMission(requestParameters: CreateMissionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Mission> {
        const response = await this.createMissionRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getMissionRaw(requestParameters: GetMissionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Mission>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getMission.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/api/iac/mission/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MissionFromJSON(jsonValue));
    }

    /**
     */
    async getMission(requestParameters: GetMissionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Mission> {
        const response = await this.getMissionRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async listMissionsRaw(requestParameters: ListMissionsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PaginatedMissionList>> {
        const queryParameters: any = {};

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        if (requestParameters.size !== undefined) {
            queryParameters['size'] = requestParameters.size;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/api/iac/mission/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PaginatedMissionListFromJSON(jsonValue));
    }

    /**
     */
    async listMissions(requestParameters: ListMissionsRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PaginatedMissionList> {
        const response = await this.listMissionsRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
