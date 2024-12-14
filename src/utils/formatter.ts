import { Request, Response } from "express"

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
const formatLoggerResponse = (
  req: Request,
  res: Response,
  responseBody: any // object or array sent with res.send()
) => {
  return {
    request: {
      headers: req.headers,
      host: req.headers.host,
      baseUrl: req.baseUrl,
      url: req.url,
      method: req.method,
      body: req.body,
      params: req?.params,
      query: req?.query,
      clientIp: req.headers["x-forwarded-for"] ?? req.socket.remoteAddress,
    },
    response: {
      headers: res.getHeaders(),
      statusCode: res.statusCode,
      body: responseBody,
    },
  }
}

export { formatLoggerResponse }
