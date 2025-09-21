const generateMessage = (entity) => ({
    alreadyExist: `${entity} already exist`,
        notFound: `${entity} not found`,
        createdSuccessfully: `${entity} created successfully`,
        updatedSuccessfully: `${entity} updated successfully`,
        deletedSuccessfully: `${entity} deleted successfully`,
        failToCreate: `fail to create ${entity}`,
        failToUpdate: `fail to update ${entity}`,
        failToDelete: `fail to delete ${entity}`
})
export const messages = {
    categroy: generateMessage('categroy'),
    subcategroy: generateMessage('sabcategroy'),
    brand: generateMessage('brand'),
    product: generateMessage('product'),
    user: {...generateMessage('user'), verified: 'user verified successfully', invalidCredentials: 'invalid credentials', notAuthorized: 'not authorized to access this api'},
    review: generateMessage('review'),
    coupon: generateMessage('coupon'),
    order: generateMessage('order'),
    cart: generateMessage('cart')
}