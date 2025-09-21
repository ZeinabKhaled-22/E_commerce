import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utlis/constant/enums.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addToWishList, deleteWishlist, getAllwishlist, specificWishlist } from "./wishlist.controller.js";

const wishlistRouter = Router()

// add to wishlist
wishlistRouter.post('/:productId',
    isAuthenticated(),
    isAuthorized([roles.USER, roles.ADMIN]),
    asyncHandler(addToWishList)
)

// delete
wishlistRouter.delete('/:wishlistId',
    isAuthenticated(),
    isAuthorized([roles.USER, roles.ADMIN]),
    asyncHandler(deleteWishlist)
)

// get wishlist
wishlistRouter.get('/',
    isAuthenticated(),
    isAuthorized([roles.USER, roles.ADMIN]),
    asyncHandler(getAllwishlist)
)

// specific
wishlistRouter.post('/:wishlistId',
    isAuthenticated(),
    isAuthorized([roles.USER, roles.ADMIN]),
    asyncHandler(specificWishlist)
)

export default wishlistRouter