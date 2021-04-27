import jwt from "jsonwebtoken";
import LogService from "./log.service";
import { IUser } from "../interfaces/user.interface";

const logService = new LogService();
export default class JWTService {
    createToken(user: IUser, secretKey: string): string {
        const methodName: string = "createToken";
        try {
            logService.writeLog({
                type: "event",
                methodName: methodName,
                msg: "Token created successfully",
            });
            return jwt.sign({ email: user.email }, secretKey, {
                expiresIn: "1h",
            });
        } catch (error) {
            logService.writeLog({
                type: "error",
                methodName: methodName,
                msg: error.message,
            });
            return error.message;
        }
    }
}
