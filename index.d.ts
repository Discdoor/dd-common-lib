/*
 * Typescript typings for libdd-node.
 */

import { APIResponse } from './lib/types/api/response';

/**
 * LibDD module namespace.
 */
export declare namespace api {
    /**
     * Constructs a response.
     * @param success Whether the request was successful.
     * @param message The message to associate.
     * @param data The data.
     */
    function constructResponseObject<T>(success: boolean, message: string, data?: T): APIResponse<T>;
    
    /**
     * Sends the specified response object.
     * @param res The response to send.
     * @param code The status code to send.
     * @param obj The response object to send.
     */
    function sendResponseObject<T>(res: Express.Response, code: number, obj: APIResponse<T>);
}

export declare namespace schema {
    /**
     * Validates the specified schema.
     * @param schema The schema to validate against.
     * @param inData The data to check.
     * @param strictMode Whether to strictly check objects (they must match exactly).
     */
    function validateSchema(schema: any, inData: any, strictMode?: boolean): boolean;
}

export declare namespace reflect {
    /**
     * Assigns the properties of a partial object to the specified object.
     * @param obj The target object.
     * @param part The partial object.
     * @param exclusions Key names to exclude.
     */
    function assignProps(obj: any, part: any, exclusions: string[]): any;

    /**
     * Creates a shallow view of an object.
     * @param obj The input object to filter.
     * @param filter Items to filter out.
     */
    function createShallowView(obj: any, filter: string[]): any;
}