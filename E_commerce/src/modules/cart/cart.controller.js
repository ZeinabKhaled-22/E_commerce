import { Cart, Prouduct } from "../../../db/index.js"
import { AppError } from "../../utlis/appError.js"
import { messages } from "../../utlis/constant/messages.js"

// add to cart
export const addToCart = async (req,res,next) => {
    // get data from req
    const { productId, quantity } = req.body
    // check existence
    const productExist = await Prouduct.findById(productId)// {}, null
    if(!productExist){
        return next(new AppError(messages.product.notFound, 404))
    }
    // check stock
    if(!productExist.inStock(quantity)){
        return next(new AppError('out of stock', 400))
    }
    let data = ''
    // find product and update quantity
    const productExistInCart = await Cart.findOneAndUpdate(
        { user: req.authUser._id, 'products.productId': productId }, 
        { 'products.$.quantity': quantity },
        { new: true}
    ) //{}, null
    data = productExistInCart
    // add to cart
    if(!productExistInCart){
        const addedProduct = await Cart.findOneAndUpdate({ user: req.authUser._id},
            {
                $push: { products: { productId, quantity }}
            },
            { new: true }
        )
        data = addedProducts
    }

    /**
     * 1- find cart
     * 2- product [] find product if exist
     * 3- update cart
     * 4- add to cart
     */

    // send response
    return res.status(200).json({
        message: 'added to cart successfully',
        success: true,
        data
    })
}

// delete cart
export const deleteCart = async (req,res,next) => {
    // get data from params
    const { cartId } = req.params
    const deletedCart = await Cart.deleteOne({ _id: cartId})
    return res.status(200).json({message: messages.cart.deletedSuccessfully, success: true})
}

// get all cart
export const getAllCart = async (req,res,next) => {
    const getAll = await Cart.find()
    return res.status(200).json({success: true, data: getAll})
}

// get specific cart
export const specificCart = async (req,res,next) => {
    // get data from params
    const{ cartId } = req.params
    const getspecific = await Cart.findById(cartId)
    return res.status(200).json({success: true, data: getspecific})
}
