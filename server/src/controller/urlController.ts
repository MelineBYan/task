import Url from '../services/urlService';
import { ApiResponse } from '../core/models/responseModel';
import type { NextFunction, Request, Response } from 'express';

const urlService = new Url();
export default class UrlController {
    public async getAllAvailableUrls(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const  {url } = req.params;
            const uniqueUrl = await urlService.generateUniqueUrl(url);
            return  res.status(200).send(new ApiResponse(200, uniqueUrl, 'Url data'));
        } catch (error) {
            console.log(error, "error");
            next(error);
        }
    }
}
