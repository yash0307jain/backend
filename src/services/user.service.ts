import { User } from "../models/user.model";
import { IUser, ISignIn } from "../interfaces/user.interface";
import LogService from "./log.service";

const logService = new LogService();
export default class UserService {
    async createUser(user: IUser): Promise<{ user: IUser; msg: string }> {
        const methodName: string = "createUser";
        let info: { user: IUser; msg: string };
        try {
            const createdUser: IUser = await User.create(user);
            logService.writeLog({
                type: "event",
                methodName: methodName,
                msg: "User created successfully",
            });
            return (info = {
                user: createdUser,
                msg: "User created successfully",
            });
        } catch (error) {
            logService.writeLog({
                type: "error",
                methodName: methodName,
                msg: error.message,
            });
            return (info = {
                user: {} as IUser,
                msg: error.message,
            });
        }
    }

    async findUser(user: ISignIn) {
        const methodName: string = "findUser";
        let info: { user: IUser; msg: string };
        try {
            const userInfo: IUser | null = await User.findOne(user);
            logService.writeLog({
                type: "event",
                methodName: methodName,
                msg: "User found successfully",
            });
            return (info = {
                user: userInfo ? userInfo : ({} as IUser),
                msg: "User found successfully",
            });
        } catch (error) {
            logService.writeLog({
                type: "error",
                methodName: methodName,
                msg: error.message,
            });
            return (info = {
                user: {} as IUser,
                msg: error.message,
            });
        }
    }
}
