import { Router } from "express";
import { fileUploads } from "../../utlis/multer.js";
import { isValid } from "../../middleware/validation.js";
import { addCategroyVal, updateCategroyVal } from "./categroy.validation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addCategroy, deleteCategroy, getAllCategroies, specificCatregroy, updateCategroy } from "./categroy.controller.js";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utlis/constant/enums.js";

const categroyRouter = Router()

// add categroy >> authentication(login) authorization(who is allowed)
categroyRouter.post('/',
    isAuthenticated(),
    isAuthorized([roles.ADMIN, roles.SELLER]),
    fileUploads({ folder: "categroy" }).single('image'),
    isValid(addCategroyVal),
    asyncHandler(addCategroy)
)

// get categroy
categroyRouter.get('/', asyncHandler(getAllCategroies))

// update categroy
categroyRouter.put('/:categroyId', 
    isAuthenticated(),
    isAuthorized([roles.ADMIN, roles.SELLER]),
    cloudUploads({}).single('image'),
    isValid(updateCategroyVal),
    asyncHandler(updateCategroy)
)

// delete categroy
categroyRouter.delete('/:categroyId',
    isAuthenticated(),
    isAuthorized([roles.ADMIN, roles.SELLER]),
    asyncHandler(deleteCategroy)
)

// get specific categroy
categroyRouter.get('/:categroyId', asyncHandler(specificCatregroy))

export default categroyRouter