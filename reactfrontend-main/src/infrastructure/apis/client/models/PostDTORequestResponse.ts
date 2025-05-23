/* tslint:disable */
/* eslint-disable */
/**
 * MobyLab Web App
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { PostDTO } from './PostDTO';
import {
    PostDTOFromJSON,
    PostDTOFromJSONTyped,
    PostDTOToJSON,
    PostDTOToJSONTyped,
} from './PostDTO';
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
    ErrorMessageToJSONTyped,
} from './ErrorMessage';

/**
 * 
 * @export
 * @interface PostDTORequestResponse
 */
export interface PostDTORequestResponse {
    /**
     * 
     * @type {PostDTO}
     * @memberof PostDTORequestResponse
     */
    readonly response?: PostDTO | null;
    /**
     * 
     * @type {ErrorMessage}
     * @memberof PostDTORequestResponse
     */
    readonly errorMessage?: ErrorMessage | null;
}

/**
 * Check if a given object implements the PostDTORequestResponse interface.
 */
export function instanceOfPostDTORequestResponse(value: object): value is PostDTORequestResponse {
    return true;
}

export function PostDTORequestResponseFromJSON(json: any): PostDTORequestResponse {
    return PostDTORequestResponseFromJSONTyped(json, false);
}

export function PostDTORequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): PostDTORequestResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'response': json['response'] == null ? undefined : PostDTOFromJSON(json['response']),
        'errorMessage': json['errorMessage'] == null ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function PostDTORequestResponseToJSON(json: any): PostDTORequestResponse {
    return PostDTORequestResponseToJSONTyped(json, false);
}

export function PostDTORequestResponseToJSONTyped(value?: Omit<PostDTORequestResponse, 'response'|'errorMessage'> | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
    };
}

