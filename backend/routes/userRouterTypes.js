const zod = require("zod")

const userSignupValidation = zod.object({
    username: zod.string().email(),
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string()
});

const UserSignin = zod.object({
    username:zod.string().email(),
    password: zod.string(),
});

module.exports = userSignupValidation;
module.exports = UserSignin;
