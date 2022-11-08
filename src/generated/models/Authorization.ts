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
import type { User } from './User';
import {
    UserFromJSON,
    UserFromJSONTyped,
    UserToJSON,
} from './User';

/**
 * 
 * @export
 * @interface Authorization
 */
export interface Authorization {
    /**
     * 
     * @type {string}
     * @memberof Authorization
     */
    token: string;
    /**
     * 
     * @type {User}
     * @memberof Authorization
     */
    readonly user: User;
    /**
     * 
     * @type {Date}
     * @memberof Authorization
     */
    expiredAt: Date;
}

/**
 * Check if a given object implements the Authorization interface.
 */
export function instanceOfAuthorization(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "token" in value;
    isInstance = isInstance && "user" in value;
    isInstance = isInstance && "expiredAt" in value;

    return isInstance;
}

export function AuthorizationFromJSON(json: any): Authorization {
    return AuthorizationFromJSONTyped(json, false);
}

export function AuthorizationFromJSONTyped(json: any, ignoreDiscriminator: boolean): Authorization {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'token': json['token'],
        'user': UserFromJSON(json['user']),
        'expiredAt': (new Date(json['expired_at'])),
    };
}

export function AuthorizationToJSON(value?: Authorization | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'token': value.token,
        'expired_at': (value.expiredAt.toISOString()),
    };
}

