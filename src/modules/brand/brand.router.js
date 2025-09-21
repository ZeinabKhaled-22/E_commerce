import { Router } from "express";
import { cloudUploads } from "../../utlis/multer_cloud.js";
import { isValid } from "../../middleware/validation.js";
import { addBrandVal, updateBrandval } from "./brand.validation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addBrand, deleteBrand, specificBrand, updateBrand } from "./brand.controller.js";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAuthorized } from "../../middleware/authorization.js";
import { roles } from "../../utlis/constant/enums.js";

const brandRouter = Router()

// add brand >>> authentication(login) authorization(user,admin)
brandRouter.post('/',
    isAuthenticated(),
    isAuthorized([roles.ADMIN, roles.SELLER]),
    cloudUploads().single('logo'),
    isValid(addBrandVal),
    asyncHandler(addBrand)
)

// update brand >>> authentication authorization
brandRouter.put('/:brandId',
    isAuthenticated(),
    isAuthorized([roles.ADMIN, roles.SELLER]),
    cloudUploads({}).single('logo'),
    isValid(updateBrandval),
    asyncHandler(updateBrand)
)

// get all brands
brandRouter.get('/', asyncHandler())

// get specific brand
brandRouter.get('/:brandId', asyncHandler(specificBrand))

// delete brand
brandRouter.delete('/:brandId', 
    isAuthenticated(),
    isAuthorized([roles.ADMIN, roles.SELLER]),
    asyncHandler(deleteBrand)
)

export default brandRouter