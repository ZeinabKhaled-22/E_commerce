import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.js";
import { roles } from "../../utlis/constant/enums.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { creteOrder, getAllOrder, getSpecificOrder } from "./order.controller.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";

const orderRouter = Router()

// add order
orderRouter.post('/',
    isAuthenticated(),
    isAuthorized([roles.USER]),
    asyncHandler(creteOrder)
)

// get order
orderRouter.get('/',
    isAuthenticated(),
    isAuthorized([roles.ADMIN]),
    asyncHandler(getAllOrder)
)

// get specific order
orderRouter.get('/:orderId',
    isAuthenticated(),
    isAuthorized([roles.ADMIN]),
    asyncHandler(getSpecificOrder)
)

export default orderRouter