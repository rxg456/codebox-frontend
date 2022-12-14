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
/**
 * 
 * @export
 * @interface MissionCreationRequest
 */
export interface MissionCreationRequest {
    /**
     * 
     * @type {number}
     * @memberof MissionCreationRequest
     */
    repository: number;
    /**
     * 
     * @type {string}
     * @memberof MissionCreationRequest
     */
    playbook: string;
}

/**
 * Check if a given object implements the MissionCreationRequest interface.
 */
export function instanceOfMissionCreationRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "repository" in value;
    isInstance = isInstance && "playbook" in value;

    return isInstance;
}

export function MissionCreationRequestFromJSON(json: any): MissionCreationRequest {
    return MissionCreationRequestFromJSONTyped(json, false);
}

export function MissionCreationRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): MissionCreationRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'repository': json['repository'],
        'playbook': json['playbook'],
    };
}

export function MissionCreationRequestToJSON(value?: MissionCreationRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'repository': value.repository,
        'playbook': value.playbook,
    };
}

