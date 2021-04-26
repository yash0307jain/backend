import { Connection, connect, connection, disconnect } from "mongoose";

let database: Connection;
export const mongoConnect = () => {
    if (database) return;

    const url: string = "mongodb://localhost/gallery";
    connect(url);
    database = connection;
    database.once("open", () => console.log("Connected to database"));
    database.on("error", () => console.log("Error connecting to database"));
};

export const mongoDisconnect = () => {
    if (!database) return;
    disconnect();
};
