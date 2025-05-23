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
import type { User } from './User';
import {
    UserFromJSON,
    UserFromJSONTyped,
    UserToJSON,
    UserToJSONTyped,
} from './User';
import type { Post } from './Post';
import {
    PostFromJSON,
    PostFromJSONTyped,
    PostToJSON,
    PostToJSONTyped,
} from './Post';

/**
 * 
 * @export
 * @interface Comment
 */
export interface Comment {
    /**
     * 
     * @type {string}
     * @memberof Comment
     */
    id: string;
    /**
     * 
     * @type {Date}
     * @memberof Comment
     */
    createdAt: Date;
    /**
     * 
     * @type {Date}
     * @memberof Comment
     */
    updatedAt: Date;
    /**
     * 
     * @type {Post}
     * @memberof Comment
     */
    post: Post;
    /**
     * 
     * @type {string}
     * @memberof Comment
     */
    postId: string;
    /**
     * 
     * @type {User}
     * @memberof Comment
     */
    author: User;
    /**
     * 
     * @type {string}
     * @memberof Comment
     */
    authorId: string;
    /**
     * 
     * @type {string}
     * @memberof Comment
     */
    commentText: string;
}

/**
 * Check if a given object implements the Comment interface.
 */
export function instanceOfComment(value: object): value is Comment {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('createdAt' in value) || value['createdAt'] === undefined) return false;
    if (!('updatedAt' in value) || value['updatedAt'] === undefined) return false;
    if (!('post' in value) || value['post'] === undefined) return false;
    if (!('postId' in value) || value['postId'] === undefined) return false;
    if (!('author' in value) || value['author'] === undefined) return false;
    if (!('authorId' in value) || value['authorId'] === undefined) return false;
    if (!('commentText' in value) || value['commentText'] === undefined) return false;
    return true;
}

export function CommentFromJSON(json: any): Comment {
    return CommentFromJSONTyped(json, false);
}

export function CommentFromJSONTyped(json: any, ignoreDiscriminator: boolean): Comment {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'createdAt': (new Date(json['createdAt'])),
        'updatedAt': (new Date(json['updatedAt'])),
        'post': PostFromJSON(json['post']),
        'postId': json['postId'],
        'author': UserFromJSON(json['author']),
        'authorId': json['authorId'],
        'commentText': json['commentText'],
    };
}

export function CommentToJSON(json: any): Comment {
    return CommentToJSONTyped(json, false);
}

export function CommentToJSONTyped(value?: Comment | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'createdAt': ((value['createdAt']).toISOString()),
        'updatedAt': ((value['updatedAt']).toISOString()),
        'post': PostToJSON(value['post']),
        'postId': value['postId'],
        'author': UserToJSON(value['author']),
        'authorId': value['authorId'],
        'commentText': value['commentText'],
    };
}

