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
 * @interface MissionCreation
 */
export interface MissionCreation {
    /**
     * 
     * @type {number}
     * @memberof MissionCreation
     */
    repository: number;
    /**
     * 
     * @type {string}
     * @memberof MissionCreation
     */
    playbook: string;
    /**
     * 
     * @type {string}
     * @memberof MissionCreation
     */
    inventories?: string | null;
}

/**
 * Check if a given object implements the MissionCreation interface.
 */
export function instanceOfMissionCreation(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "repository" in value;
    isInstance = isInstance && "playbook" in value;

    return isInstance;
}

export function MissionCreationFromJSON(json: any): MissionCreation {
    return MissionCreationFromJSONTyped(json, false);
}

export function MissionCreationFromJSONTyped(json: any, ignoreDiscriminator: boolean): MissionCreation {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'repository': json['repository'],
        'playbook': json['playbook'],
        'inventories': !exists(json, 'inventories') ? undefined : json['inventories'],
    };
}

export function MissionCreationToJSON(value?: MissionCreation | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'repository': value.repository,
        'playbook': value.playbook,
        'inventories': value.inventories,
    };
}

