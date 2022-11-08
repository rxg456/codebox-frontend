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
 * @interface Login
 */
export interface Login {
    /**
     * 
     * @type {string}
     * @memberof Login
     */
    username: string;
    /**
     * 
     * @type {string}
     * @memberof Login
     */
    password: string;
}

/**
 * Check if a given object implements the Login interface.
 */
export function instanceOfLogin(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "username" in value;
    isInstance = isInstance && "password" in value;

    return isInstance;
}

export function LoginFromJSON(json: any): Login {
    return LoginFromJSONTyped(json, false);
}

export function LoginFromJSONTyped(json: any, ignoreDiscriminator: boolean): Login {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'username': json['username'],
        'password': json['password'],
    };
}

export function LoginToJSON(value?: Login | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'username': value.username,
        'password': value.password,
    };
}

