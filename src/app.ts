import * as dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import { mongoConnect } from "./config/db.config";
import { indexRoutes } from "./routes/index.routes";
import LogService from "./services/log.service";

const logService = new LogService();
dotenv.config();
mongoConnect();

const app: Application = express();
app.set("secretKey", "todoUser");
app.use(express.json());
app.use(cors());
logService.writeLog({
    type: "event",
    methodName: "startFile",
    msg: "Express config done",
});

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome here",
    });
});

app.use("/", indexRoutes);
logService.writeLog({
    type: "event",
    methodName: "startFile",
    msg: "Routes config done",
});

const port: Number = parseInt(process.env.PORT as string) || 5000;
app.listen(port, () => {
    logService.writeLog({
        type: "event",
        methodName: "startFile",
        msg: "Server running successfully",
    });
    console.log(`Server listening to port ${port}`);
});
