import { Connection, connect, connection, disconnect } from "mongoose";
import LogService from "../services/log.service";

const logService = new LogService();
let database: Connection;
export const mongoConnect = () => {
    const methodName: string = "mongoConnect";
    try {
        if (database) {
            logService.writeLog({
                type: "event",
                methodName: methodName,
                msg: "Mongo connection already there",
            });
            return;
        }

        const url: string = "mongodb://localhost/gallery";
        connect(url);
        database = connection;
        database.once("open", () => {
            logService.writeLog({
                type: "event",
                methodName: methodName,
                msg: "Mongo connection has made successfully",
            });
            console.log("Connected to database");
        });
        database.on("event", () => {
            logService.writeLog({
                type: "error",
                methodName: methodName,
                msg: "Mongo connection failed",
            });
            console.log("Error connecting to database");
        });
    } catch (error) {
        logService.writeLog({
            type: "error",
            methodName: methodName,
            msg: error.message,
        });
        return;
    }
};

export const mongoDisconnect = () => {
    const methodName: string = "mongoDisconnect";
    try {
        if (!database) {
            logService.writeLog({
                type: "event",
                methodName: methodName,
                msg: "Mongo connection not there",
            });
            return;
        }
        disconnect();
        logService.writeLog({
            type: "event",
            methodName: methodName,
            msg: "Mongo connection closed successfully",
        });
    } catch (error) {
        logService.writeLog({
            type: "error",
            methodName: methodName,
            msg: error.message,
        });
        return;
    }
};
