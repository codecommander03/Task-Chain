import express from "express";
import userRouter from "./routers/user";
import workerRouter from "./routers/user";

const app = express();

app.use("/v1/user", userRouter);
app.use("/v1/worker", workerRouter);