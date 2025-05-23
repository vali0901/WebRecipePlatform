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
/**
 * 
 * @export
 * @interface PostUpdateDTO
 */
export interface PostUpdateDTO {
    /**
     * 
     * @type {string}
     * @memberof PostUpdateDTO
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof PostUpdateDTO
     */
    description: string;
    /**
     * 
     * @type {string}
     * @memberof PostUpdateDTO
     */
    recipeId: string;
}

/**
 * Check if a given object implements the PostUpdateDTO interface.
 */
export function instanceOfPostUpdateDTO(value: object): value is PostUpdateDTO {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('description' in value) || value['description'] === undefined) return false;
    if (!('recipeId' in value) || value['recipeId'] === undefined) return false;
    return true;
}

export function PostUpdateDTOFromJSON(json: any): PostUpdateDTO {
    return PostUpdateDTOFromJSONTyped(json, false);
}

export function PostUpdateDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): PostUpdateDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'description': json['description'],
        'recipeId': json['recipeId'],
    };
}

export function PostUpdateDTOToJSON(json: any): PostUpdateDTO {
    return PostUpdateDTOToJSONTyped(json, false);
}

export function PostUpdateDTOToJSONTyped(value?: PostUpdateDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'description': value['description'],
        'recipeId': value['recipeId'],
    };
}

