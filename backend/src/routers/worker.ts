import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { TOTAL_DECIMALS, WORKER_JWT_SECRET } from "../config";
import { workerMiddleware } from "../middleware";
import { getNextTask } from "../db";
import { createSubmissionInput } from "../types";

const TOTAL_SUBMISSIONS = 100;

const prismaClient = new PrismaClient();

const router = Router();

router.post("/submission", workerMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const body = req.body;
    const parsedBody = createSubmissionInput.safeParse(body);

    if (parsedBody.success) {
        const task = await getNextTask(Number(userId));
        if (!task || task?.id !== Number(parsedBody.data.taskId)) {
            return res.status(411).json({
                message: "Incorrect task id"
            })
        }

        let amount = (Number(task.amount) / TOTAL_SUBMISSIONS).toString();

        const submission = await prismaClient.$transaction(async tx => {
            const submission = await prismaClient.submission.create({
                data: {
                    option_id: Number(parsedBody.data.selection),
                    task_id: Number(parsedBody.data.taskId),
                    worker_id: userId,
                    amount: Number(amount)
                }
            })

            await prismaClient.worker.update({
                where: {
                    id: userId
                },
                data: {
                    pending_amount: {
                        increment: Number(amount) * TOTAL_DECIMALS
                    }
                }
            })

            return submission; 
        })


        const nextTask = await getNextTask(Number(userId));
        res.json({
            nextTask,
            amount
        })
    } else {

    }
})

router.get("/nextTask", workerMiddleware, async (req, res) => {
    //@ts-ignore
    const userId: string = req.userId;

    const task = await getNextTask(Number(userId));

    if (!task) {
        return res.status(411).json({
            message: "No more tasks available for you to review"
        })
    } else {
        return res.status(411).json({
            task
        })
    }
})

router.post("/signin", async (req, res) => {
    // Todo: signin with cypto wallet logic
    const hardCodedWalletAddress = "0x3d60ac04db6B220EB3Df6bcbD809cD0a64E7beEB";

    const existingUser = await prismaClient.worker.findFirst({
        where: {
            address: hardCodedWalletAddress
        }
    })

    if (existingUser) {
        const token = jwt.sign({
            userId: existingUser.id
        }, WORKER_JWT_SECRET);

        res.json({
            token
        });
    } else {
        const newUser = await prismaClient.worker.create({
            data: {
                address: hardCodedWalletAddress,
                pending_amount: 0,
                locked_amount: 0
            }
        });

        const token = jwt.sign({
            userId: newUser.id
        }, WORKER_JWT_SECRET);

        res.json({
            token
        });
    }
});

export default router;