import { Response } from "express";
import { IResponse } from "../interfaces/response.interface";

export default class ResponseService {
    response(res: Response, response: IResponse) {
        const data: Object = {
            status: response.status,
            message: response.message,
            data: response.data,
        };
        return res.status(response.statusCode).json(data);
    }
}
