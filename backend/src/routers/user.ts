import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "aditya123"

const router = Router();

const prismaClient = new PrismaClient();

// signin with wallet
router.post("/signin", async (req, res) => {
    // Todo: signin with cypto wallet logic
    const hardCodedWalletAddress = "0x3d60ac04db6B220EB3Df6bcbD809cD0a64E7beEA";

    const existingUser = await prismaClient.user.findFirst({
        where: {
            address: hardCodedWalletAddress
        }
    })

    if (existingUser) {
        const token = jwt.sign({
            userId: existingUser.id
        }, JWT_SECRET);

        res.json({
            token
        });
    } else {
        const newUser = await prismaClient.user.create({
            data: {
                address: hardCodedWalletAddress
            }
        });

        const token = jwt.sign({
            userId: newUser.id
        }, JWT_SECRET);

        res.json({
            token
        });
    }
});

export default router;
