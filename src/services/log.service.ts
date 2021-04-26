import fs from "fs";
import { ILog } from "../interfaces/log.interface";

export class LogService {
    writeLog(logInfo: { methodName: string; msg: string }) {
        const currentDirectory: string = __dirname + "\\..\\..\\log";

        const dateTime: Date = new Date();
        const logDate: string =
            dateTime.getDate() +
            "/" +
            dateTime.getMonth() +
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

        if (!fs.existsSync(currentDirectory)) fs.mkdirSync(currentDirectory);
        if (!fs.existsSync(currentDirectory + "\\log.txt"))
            fs.writeFileSync(currentDirectory + "\\log.txt", stringData);
        else
            fs.appendFileSync(
                currentDirectory + "\\log.txt",
                "\n" + stringData
            );
    }
}
