import * as dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import { mongoConnect } from "./config/db.config";
import { indexRoutes } from "./routes/index.routes";

dotenv.config();
mongoConnect();

const app: Application = express();
app.set("secretKey", "todoUser");
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome here",
    });
});

app.use("/", indexRoutes);

const port: Number = parseInt(process.env.PORT as string) || 5000;
app.listen(port, () => console.log(`Server listening to port ${port}`));
