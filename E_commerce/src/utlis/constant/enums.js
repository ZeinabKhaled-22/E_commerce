export const discountTypes = {
    FIXED_AMOUNT: 'fixedAmount',
    PERCENTAGE: 'percentage'
}
Object.freeze(discountTypes)

export const roles = {
    USER: 'user',
    ADMIN: 'admin',
    SELLER:  'seller'
}
Object.freeze(roles)

export const status = {
    PENDING: 'pending',
    VERIFIED: 'verified',
    BLOCKED: 'blocked',
    DELETED: 'deleted'
}
Object.freeze(status)

export const orderStatus = {
    PLACED: 'placed',
    SHIPPING: 'shipping',
    DELIVERED: 'delivered',
    CANCELED: 'canceled',
    REFUNDED: 'redunded'
}
Object.freeze(orderStatus)

export const paymentMethods = {
    CASH: 'cash',
    VISA: 'visa'
}
Object.freeze(paymentMethods)