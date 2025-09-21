import { User } from "../../../db/index.js"

// add to wishlist
export const addToWishList = async (req,res,next) => {
    // get data from params
    const { productId } = req.params
    const userId = req.authUser._id
    // add to db
    const userUpdated = await User.findByIdAndUpdate(userId, { $addToSet: { wishList: productId }}, { new: true })
    // send response
    return res.status(200).json({
        message: 'wishlist updated successfully',
        success: true,
        data: userUpdated.wishList
    })
}

// delete wishlist
export const deleteWishlist = async(req,res,next) => {
    const { wishlistId } = req.params
    const deletedwishlist = await User.deleteOne({ _id: wishlistId })
    return res.status(200).json({success: true, data: deletedwishlist})
}

// get all wishlist
export const getAllwishlist = async(req,res,next) => {
    const allwishlist = await User.find()
    return res.status(200).json({ success: true, data: allwishlist})
}

// get specific wishlist
export const specificWishlist = async (req,res,next) => {
    // get data feom req
    const { wishlistId } = req.params
    // get specific
    const getSpecific = await User.findById(wishlistId)
    // send response
    return res.status(200).json({data: getSpecific, success: true})
}