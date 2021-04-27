import fs from "fs";
import { ILog } from "../interfaces/log.interface";

type logType = "event" | "error";
export default class LogService {
    writeLog(logInfo: { type: logType; methodName: string; msg: string }) {
        const currentDirectory: string = __dirname + "\\..\\..\\log";

        const dateTime: Date = new Date();
        const logDate: string =
            dateTime.getDate() +
            "/" +
            (dateTime.getMonth() + 1) +
            "/" +
            dateTime.getFullYear();
        const logTime: string =
            dateTime.getHours() +
            ":" +
            dateTime.getMinutes() +
            ":" +
            dateTime.getSeconds();

        const data: ILog = {
            time: logDate + "  " + logTime,
            methodName: logInfo.methodName,
            message: logInfo.msg,
        };
        const stringData: string = JSON.stringify(data);
        const fileName: string = logInfo.type + "_log.txt";

        if (!fs.existsSync(currentDirectory)) fs.mkdirSync(currentDirectory);
        if (!fs.existsSync(currentDirectory + "\\" + fileName))
            fs.writeFileSync(currentDirectory + "\\" + fileName, stringData);
        else
            fs.appendFileSync(
                currentDirectory + "\\" + fileName,
                "\n" + stringData
            );
    }
}
