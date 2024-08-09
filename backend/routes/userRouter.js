const express = require("express");
const userSignupValidation = require("./userRouterTypes");
const userSigninValidation = require("./userRouterTypes");
const router = express.Router();
require('dotenv').config();

const {User, Account} = require("../mongoDB"); // Assuming this is your User model
 // Assuming you also have an Account model
const JWT_SECRET = require("./config");
const jwt = require("jsonwebtoken");
const zod = require("zod");

const authMiddleware = require("../middlewares/middleware");

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
});

router.post("/signup", async (req, res) => {
    const body = req.body;
    const { success } = userSignupValidation.safeParse(req.body);
    if (!success) {
        return res.json({
            message: "Email already taken/ Incorrect inputs",
        });
    }
    const user = await User.findOne({ username: body.username }); // Updated
    if (user && user._id) {
        return res.json({
            message: "Email already taken/ Incorrect inputs",
        });
    }
    const dbUser = await User.create(body);

    const userId = dbUser._id; // Updated
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000,
    });

    const token = jwt.sign(
        {
            userId: dbUser._id,
        },
        JWT_SECRET
    );

    res.json({
        message: "User successfully created",
        token: token,
    });
});

router.post("/signin", async (req, res) => {
    const body = req.body;
    const { success } = userSigninValidation.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs",
        });
    }
    const user = await User.findOne({
        username: body.username,
        password: body.password,
    });
    if (user) {
        const token = jwt.sign(
            {
                userId: user._id,
            },
            JWT_SECRET
        );

        res.json({
            token: token,
        });
        return;
    }
    res.status(411).json({
        message: "Error while logging in",
    });
});

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Error while updating information",
        });
    }

    await User.updateOne({ _id: req.userId }, req.body);

    res.json({
        message: "Updated successfully",
    });
});

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [
            {
                firstName: {
                    $regex: filter,
                },
            },
            {
                lastName: {
                    $regex: filter,
                },
            },
        ],
    });

    res.json({
        user: users.map((user) => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id,
        })),
    });
});

module.exports = router; // Export the router directly
