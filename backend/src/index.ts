import express from "express";
import userRouter from "./routers/user";
import workerRouter from "./routers/user";

const app = express();

export const JWT_SECRET = "aditya123";

app.use("/v1/user", userRouter);
app.use("/v1/worker", workerRouter);

app.listen(3000)