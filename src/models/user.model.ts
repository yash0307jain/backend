import { Document, Schema, Model, model, HookNextFunction } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    profilePic: string;
    userType: string;
    dateTime: Date;
}

const UserSchema: Schema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String
    },
    userType: {
        type: String,
        required: true,
        default: "member"
    },
    dateTime: {
        type: Date,
        required: true,
        default: new Date()
    }
});

UserSchema.pre<IUser>("save", function (next: HookNextFunction) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

export const User: Model<IUser> = model("User", UserSchema);
