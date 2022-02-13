const mongoose = require('mongoose')

const schema = mongoose.Schema

const userSchema = new schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetToken: String,
    resetTokenExpiration: String,
    cart: {
        items: [{
            productId: {
                type: schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                required: true
            }
        }]
    }
})

userSchema.methods.addToCart = function(product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString()
    })

    let newQuantity = 1
    const updatedCartItems = [...this.cart.items]
    if(cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1
        updatedCartItems[cartProductIndex].quantity = newQuantity
    } else {
        updatedCartItems.push({
            productId: product._id,
            quantity: newQuantity
        })
    }
    const updatedCart = {items: updatedCartItems}
    this.cart = updatedCart
    return this.save()
}

userSchema.methods.deleteCart = function(productId) {
        
        const updatedCartItems = this.cart.items.filter(i => {
            console.log("jj" , i.productId.toString(), productId)
            return i.productId.toString() !== productId.toString()
        })
        const updatedCart = {items: updatedCartItems}

        this.cart = updatedCart
        return this.save()

}

userSchema.methods.clearCart = function() {
    this.cart = {items: []}
    return this.save()
}


module.exports = mongoose.model('User', userSchema)