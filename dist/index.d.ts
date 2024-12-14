import * as qs from 'qs';
import * as express_serve_static_core from 'express-serve-static-core';
import * as http from 'http';
import { Request, Response } from 'express';
import winston from 'winston';

/**
 * Formats the logger response by extracting relevant information from the request and response objects.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @param {any} responseBody - The body of the response, which can be an object or an array sent with res.send().
 * @returns {object} An object containing formatted request and response details.
 *
 * The returned object has the following structure:
 * {
 *   request: {
 *     headers: object, // The headers of the request
 *     host: string, // The host from the request headers
 *     baseUrl: string, // The base URL of the request
 *     url: string, // The full URL of the request
 *     method: string, // The HTTP method of the request
 *     body: any, // The body of the request
 *     params: object, // The URL parameters of the request
 *     query: object, // The query parameters of the request
 *     clientIp: string // The client's IP address
 *   },
 *   response: {
 *     headers: object, // The headers of the response
 *     statusCode: number, // The status code of the response
 *     body: any // The body of the response
 *   }
 * }
 *
 *
 *
 * EXAMPLE:
 * app.post('/example', (req: Request, res: Response) => {
   const responseBody = { message: 'Hello, world!' };
   
   // Send the response
   res.send(responseBody);
   
   // Format the logger response
   const formattedResponse = formatLoggerResponse(req, res, responseBody);
   
   // Log the formatted response
   console.log(formattedResponse);
    });
 *
 *
 *
 *
 */
declare const formatLoggerResponse: (req: Request, res: Response, responseBody: any) => {
    request: {
        headers: http.IncomingHttpHeaders;
        host: string | undefined;
        baseUrl: string;
        url: string;
        method: string;
        body: any;
        params: express_serve_static_core.ParamsDictionary;
        query: qs.ParsedQs;
        clientIp: string | string[] | undefined;
    };
    response: {
        headers: http.OutgoingHttpHeaders;
        statusCode: number;
        body: any;
    };
};

declare const log: winston.Logger;
declare const profiler: winston.Profiler;

declare const errHandler: (value: any) => Error;

export { errHandler, formatLoggerResponse, log, profiler };
