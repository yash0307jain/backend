import {User} from '../models/user.model';
import {IUser} from '../interfaces/user.interface'
import {LogService} from './log.service'

const logService = new LogService();
export default class UserService {
    async createUser(user: IUser): Promise<{ user: IUser; msg: string }> {
        let info: { user: IUser; msg: string };
        try {
            const createdUser: IUser = await User.create(user);
            return (info = {
                user: createdUser,
                msg: "User created successfully",
            });
        } catch (error) {
            return (info = {
                user: {} as IUser,
                msg: error.message,
            });
        }
    }
}