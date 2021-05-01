import { Request, Response } from "express";
import ResponseService from "../services/response.service";
import UserService from "../services/user.service";
import JWTService from "../services/jwt.service";
import LogService from "../services/log.service";
import { IUser, ISignIn } from "../interfaces/user.interface";
import { IResponse } from "../interfaces/response.interface";

const responseService = new ResponseService();
const userService = new UserService();
const jwtService = new JWTService();
const logService = new LogService();
export class UserController {
    signUp = async (req: Request, res: Response): Promise<Response> => {
        const methodName: string = "signUp";
        const _user: IUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password
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
            logService.writeLog({
                type: "event",
                methodName: methodName,
                msg: "User signup successfully",
            });
            return responseService.response(res, _response);
        } else {
            const _response: IResponse = {
                status: 0,
                message: userInfo.msg,
                data: userInfo.user,
                statusCode: 400,
            };
            logService.writeLog({
                type: "error",
                methodName: methodName,
                msg: "User signup failed",
            });
            return responseService.response(res, _response);
        }
    };

    signIn = async (req: Request, res: Response): Promise<Response> => {
        const methodName: string = "signIn";
        const loginUserInfo: ISignIn = {
            email: req.body.email,
            password: req.body.password,
        };
        const userInfo: {
            user: IUser;
            msg: string;
        } = await userService.findUser(loginUserInfo);
        let jwtToken: string;
        if (Object.keys(userInfo.user).length > 0) {
            jwtToken = jwtService.createToken(
                userInfo.user,
                req.app.get("secretKey")
            );

            const _response: IResponse = {
                status: 0,
                message: userInfo.msg,
                data: { user: userInfo.user, token: jwtToken },
                statusCode: 200,
            };
            logService.writeLog({
                type: "event",
                methodName: methodName,
                msg: "User signin successfully",
            });
            return responseService.response(res, _response);
        } else {
            const _response: IResponse = {
                status: 0,
                message: userInfo.msg,
                data: userInfo.user,
                statusCode: 404,
            };
            logService.writeLog({
                type: "error",
                methodName: methodName,
                msg: "User signin failed",
            });
            return responseService.response(res, _response);
        }
    };
}
