import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication";
import { roles } from "../../utlis/constant/enums";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addReview, deleteReview, getAllReview, specificReviews } from "./review.controller.js";
import { isAuthorized } from "../../middleware/authorization.js";

const reviewRouter = Router()

// add review // todo
reviewRouter.post('/:productId',
   isAuthenticated(),
   isAuthorized([roles.ADMIN, roles.USER]),
   // validation,
   asyncHandler(addReview)
)

// delete
reviewRouter.delete('/:reviewId',
   isAuthenticated(),
   isAuthorized([roles.ADMIN, roles.USER]),
   asyncHandler(deleteReview)
)

// get
reviewRouter.get('/',
   isAuthenticated(),
   isAuthorized([roles.ADMIN, roles.USER]),
   asyncHandler(getAllReview)
)

// sepcific
reviewRouter.get('/:reviewId',
   isAuthenticated(),
   isAuthorized([roles.ADMIN, roles.USER]),
   asyncHandler(specificReviews)
)

export default reviewRouter