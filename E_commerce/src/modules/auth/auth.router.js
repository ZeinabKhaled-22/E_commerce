import { Router } from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { isValid } from "../../middleware/validation.js";
import { loginVal, signupVal } from "./auth.validation.js";
import { deleteAccount, login, signup, updateAccount, verifyAccount } from "./auth.controller.js";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utlis/constant/enums.js";


// signup, verifiy, login
const authRouter = Router()

// signup
authRouter.post('/signup', isValid(signupVal) ,asyncHandler(signup))

// get verify
authRouter.get('/verify/:token', asyncHandler(verifyAccount))

// login
authRouter.post('/login', isValid(loginVal), asyncHandler(login))

// update account
authRouter.put('/:userId',
    isAuthenticated(),
    isAuthorized([roles.USER]),
    asyncHandler(updateAccount)
)

// delete account
authRouter.delete('/:userId',
    isAuthenticated(),
    isAuthorized([roles.ADMIN, roles.USER]),
    asyncHandler(deleteAccount)
)

export default authRouter