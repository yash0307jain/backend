import { Request, Response } from "express";
import ResponseService from "../services/response.service";
import UserService from "../services/user.service";
import { IUser } from "../interfaces/user.interface";
import { IResponse } from "../interfaces/response.interface";

const responseService = new ResponseService();
const userService = new UserService();

export class UserController{
    signUp = async (req: Request, res: Response): Promise<Response> => {
        const _user: IUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email as string,
            phone: req.body.phone,
            password: req.body.password as string,
        };
        const userInfo: {
            user: IUser;
            msg: string;
        } = await userService.createUser(_user);

        if (Object.keys(userInfo.user).length) {
            const _response: IResponse = {
                status: 1,
                message: userInfo.msg,
                data: userInfo.user,
                statusCode: 200,
            };
            return responseService.response(res, _response);
        } else {
            const _response: IResponse = {
                status: 0,
                message: userInfo.msg,
                data: userInfo.user,
                statusCode: 400,
            };
            return responseService.response(res, _response);
        }
    };
}