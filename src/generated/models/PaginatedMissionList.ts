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

import { exists, mapValues } from '../runtime';
import type { Mission } from './Mission';
import {
    MissionFromJSON,
    MissionFromJSONTyped,
    MissionToJSON,
} from './Mission';

/**
 * 
 * @export
 * @interface PaginatedMissionList
 */
export interface PaginatedMissionList {
    /**
     * 
     * @type {number}
     * @memberof PaginatedMissionList
     */
    count?: number;
    /**
     * current page
     * @type {number}
     * @memberof PaginatedMissionList
     */
    page?: number;
    /**
     * page size
     * @type {number}
     * @memberof PaginatedMissionList
     */
    size?: number;
    /**
     * number of pages
     * @type {number}
     * @memberof PaginatedMissionList
     */
    numPages?: number;
    /**
     * 
     * @type {Array<Mission>}
     * @memberof PaginatedMissionList
     */
    results?: Array<Mission>;
}

/**
 * Check if a given object implements the PaginatedMissionList interface.
 */
export function instanceOfPaginatedMissionList(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PaginatedMissionListFromJSON(json: any): PaginatedMissionList {
    return PaginatedMissionListFromJSONTyped(json, false);
}

export function PaginatedMissionListFromJSONTyped(json: any, ignoreDiscriminator: boolean): PaginatedMissionList {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'count': !exists(json, 'count') ? undefined : json['count'],
        'page': !exists(json, 'page') ? undefined : json['page'],
        'size': !exists(json, 'size') ? undefined : json['size'],
        'numPages': !exists(json, 'num_pages') ? undefined : json['num_pages'],
        'results': !exists(json, 'results') ? undefined : ((json['results'] as Array<any>).map(MissionFromJSON)),
    };
}

export function PaginatedMissionListToJSON(value?: PaginatedMissionList | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'count': value.count,
        'page': value.page,
        'size': value.size,
        'num_pages': value.numPages,
        'results': value.results === undefined ? undefined : ((value.results as Array<any>).map(MissionToJSON)),
    };
}
