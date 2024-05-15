import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "..";
export const WORKER_JWT_SECRET = JWT_SECRET + "worker";
const prismaClient = new PrismaClient();

const router = Router();

router.get("/nextTask", async (req, res) => {
    
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