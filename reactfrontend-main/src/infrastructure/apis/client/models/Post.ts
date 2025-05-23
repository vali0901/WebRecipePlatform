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
import type { Comment } from './Comment';
import {
    CommentFromJSON,
    CommentFromJSONTyped,
    CommentToJSON,
    CommentToJSONTyped,
} from './Comment';
import type { User } from './User';
import {
    UserFromJSON,
    UserFromJSONTyped,
    UserToJSON,
    UserToJSONTyped,
} from './User';
import type { Recipe } from './Recipe';
import {
    RecipeFromJSON,
    RecipeFromJSONTyped,
    RecipeToJSON,
    RecipeToJSONTyped,
} from './Recipe';

/**
 * 
 * @export
 * @interface Post
 */
export interface Post {
    /**
     * 
     * @type {string}
     * @memberof Post
     */
    id: string;
    /**
     * 
     * @type {Date}
     * @memberof Post
     */
    createdAt: Date;
    /**
     * 
     * @type {Date}
     * @memberof Post
     */
    updatedAt: Date;
    /**
     * 
     * @type {string}
     * @memberof Post
     */
    description: string;
    /**
     * 
     * @type {number}
     * @memberof Post
     */
    likes: number;
    /**
     * 
     * @type {string}
     * @memberof Post
     */
    authorId: string;
    /**
     * 
     * @type {string}
     * @memberof Post
     */
    recipeId: string;
    /**
     * 
     * @type {User}
     * @memberof Post
     */
    author: User;
    /**
     * 
     * @type {Recipe}
     * @memberof Post
     */
    recipe: Recipe;
    /**
     * 
     * @type {Array<Comment>}
     * @memberof Post
     */
    comments: Array<Comment>;
}

/**
 * Check if a given object implements the Post interface.
 */
export function instanceOfPost(value: object): value is Post {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('createdAt' in value) || value['createdAt'] === undefined) return false;
    if (!('updatedAt' in value) || value['updatedAt'] === undefined) return false;
    if (!('description' in value) || value['description'] === undefined) return false;
    if (!('likes' in value) || value['likes'] === undefined) return false;
    if (!('authorId' in value) || value['authorId'] === undefined) return false;
    if (!('recipeId' in value) || value['recipeId'] === undefined) return false;
    if (!('author' in value) || value['author'] === undefined) return false;
    if (!('recipe' in value) || value['recipe'] === undefined) return false;
    if (!('comments' in value) || value['comments'] === undefined) return false;
    return true;
}

export function PostFromJSON(json: any): Post {
    return PostFromJSONTyped(json, false);
}

export function PostFromJSONTyped(json: any, ignoreDiscriminator: boolean): Post {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'createdAt': (new Date(json['createdAt'])),
        'updatedAt': (new Date(json['updatedAt'])),
        'description': json['description'],
        'likes': json['likes'],
        'authorId': json['authorId'],
        'recipeId': json['recipeId'],
        'author': UserFromJSON(json['author']),
        'recipe': RecipeFromJSON(json['recipe']),
        'comments': ((json['comments'] as Array<any>).map(CommentFromJSON)),
    };
}

export function PostToJSON(json: any): Post {
    return PostToJSONTyped(json, false);
}

export function PostToJSONTyped(value?: Post | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'createdAt': ((value['createdAt']).toISOString()),
        'updatedAt': ((value['updatedAt']).toISOString()),
        'description': value['description'],
        'likes': value['likes'],
        'authorId': value['authorId'],
        'recipeId': value['recipeId'],
        'author': UserToJSON(value['author']),
        'recipe': RecipeToJSON(value['recipe']),
        'comments': ((value['comments'] as Array<any>).map(CommentToJSON)),
    };
}

