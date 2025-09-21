import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utlis/constant/enums.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addToCart, deleteCart, getAllCart, specificCart } from "./cart.controller.js";

const cartRouter = Router()

// add to cart
cartRouter.put('/',
    isAuthenticated(),
    isAuthorized([roles.USER]),
    asyncHandler(addToCart)
)

// delete cart
cartRouter.delete('/:cartId',
    isAuthenticated(),
    isAuthorized([roles.ADMIN, roles.USER]),
    asyncHandler(deleteCart)
)

// get all carts
cartRouter.get('/',
    isAuthenticated(),
    isAuthorized([roles.ADMIN]),
    asyncHandler(getAllCart)
)

// get specific
cartRouter.get('/:cartId', 
    isAuthenticated(),
    isAuthorized([roles.ADMIN]),
    asyncHandler(specificCart)
)

export default cartRouter