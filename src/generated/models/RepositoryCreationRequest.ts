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
 * @interface RepositoryCreationRequest
 */
export interface RepositoryCreationRequest {
    /**
     * 
     * @type {string}
     * @memberof RepositoryCreationRequest
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof RepositoryCreationRequest
     */
    remark?: string | null;
    /**
     * 
     * @type {string}
     * @memberof RepositoryCreationRequest
     */
    url?: string | null;
}

/**
 * Check if a given object implements the RepositoryCreationRequest interface.
 */
export function instanceOfRepositoryCreationRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;

    return isInstance;
}

export function RepositoryCreationRequestFromJSON(json: any): RepositoryCreationRequest {
    return RepositoryCreationRequestFromJSONTyped(json, false);
}

export function RepositoryCreationRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): RepositoryCreationRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'remark': !exists(json, 'remark') ? undefined : json['remark'],
        'url': !exists(json, 'url') ? undefined : json['url'],
    };
}

export function RepositoryCreationRequestToJSON(value?: RepositoryCreationRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'remark': value.remark,
        'url': value.url,
    };
}
