import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utlis/constant/enums.js";
import { isValid } from "../../middleware/validation.js";
import { addCouponVal } from "./coupon.validation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addCoupon, deleteCoupon, getAllCoupon, specificCoupon, updateCoupon } from "./coupon.controller.js";

const couponRouter = Router()

// add coupon
couponRouter.post('/',
    isAuthenticated(),
    isAuthorized([roles.ADMIN]),
    isValid(addCouponVal),
    asyncHandler(addCoupon)
)

// update coupon
couponRouter.put('/:couponId',
    isAuthenticated(),
    isAuthorized([roles.ADMIN]),
    asyncHandler(updateCoupon)
)

// get all coupon
couponRouter.get('/',
    isAuthenticated(),
    isAuthorized([roles.ADMIN]),
    asyncHandler(getAllCoupon)
)

// get specific coupon
couponRouter.get('/:couponId', 
    isAuthenticated(),
    isAuthorized([roles.ADMIN]),
    asyncHandler(specificCoupon)
)

// delete coupon
couponRouter.delete('/:couponId',
    isAuthenticated(),
    isAuthorized([roles.ADMIN]),
    asyncHandler(deleteCoupon)
)

export default couponRouter