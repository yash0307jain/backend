export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    profilePic?: string | null;
    userType?: string;
    dateTime?: Date;
}

export interface ISignIn {
    email: string;
    password: string;
}
