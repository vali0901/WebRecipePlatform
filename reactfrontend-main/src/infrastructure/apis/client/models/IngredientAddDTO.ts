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
 * @interface IngredientAddDTO
 */
export interface IngredientAddDTO {
    /**
     * 
     * @type {string}
     * @memberof IngredientAddDTO
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof IngredientAddDTO
     */
    description: string;
}

/**
 * Check if a given object implements the IngredientAddDTO interface.
 */
export function instanceOfIngredientAddDTO(value: object): value is IngredientAddDTO {
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('description' in value) || value['description'] === undefined) return false;
    return true;
}

export function IngredientAddDTOFromJSON(json: any): IngredientAddDTO {
    return IngredientAddDTOFromJSONTyped(json, false);
}

export function IngredientAddDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): IngredientAddDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'name': json['name'],
        'description': json['description'],
    };
}

export function IngredientAddDTOToJSON(json: any): IngredientAddDTO {
    return IngredientAddDTOToJSONTyped(json, false);
}

export function IngredientAddDTOToJSONTyped(value?: IngredientAddDTO | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'name': value['name'],
        'description': value['description'],
    };
}

