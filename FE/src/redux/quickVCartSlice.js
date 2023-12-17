import { createSlice } from '@reduxjs/toolkit'

export const quickVCartSlice = createSlice({
    name: 'quickVCart',
    initialState: {
        products: [],
        color: '',
        quantity: 0,
        total: 0,
        allTotal: 0,
        imgChoosed: '',
        cartItem: [],
    },
    reducers: {
        addToQuickVCart: (state, action) => {
            const { products, color, quantity, total, imgChoosed } =
                action.payload

            // Check if the product with the same ID and color is already in the cart
            const existingItemIndex = state.cartItem.findIndex(
                item =>
                    item.products.id === products.id && item.color === color,
            )

            if (existingItemIndex !== -1) {
                // If the product with the same ID and color is already in the cart, create a new array with updated items
                const updatedCartItem = state.cartItem.map((item, index) => {
                    if (index === existingItemIndex) {
                        // Update the quantity and total of the existing item
                        return {
                            ...item,
                            quantity: item.quantity + quantity,
                            total: item.total + total,
                        }
                    }
                    return item
                })

                // Update state.cartItem with the new array
                state.cartItem = updatedCartItem
            } else {
                // If the product is not in the cart, add a new entry
                state.cartItem.push({
                    products,
                    color,
                    quantity,
                    total: quantity * products.price,
                    imgChoosed,
                })
            }

            // Update the total and allTotal accordingly
            state.allTotal = state.cartItem.reduce(
                (acc, item) => acc + item.total,
                0,
            )
        },

        increaseProduct: (state, action) => {
            console.log('=============INCREASE========')
            const { productId, colorr, quantity } = action.payload

            const existingItemIndex = state.cartItem.findIndex(
                item => item.products.id === productId && item.color === colorr,
            )

            if (existingItemIndex) {
                // Update the quantity for the specific item
                state.cartItem[existingItemIndex].quantity += quantity

                // Update the total and allTotal accordingly
                state.cartItem[existingItemIndex].total =
                    state.cartItem[existingItemIndex].products.price *
                    state.cartItem[existingItemIndex].quantity

                // Recalculate the total and allTotal accordingly
                state.total = state.cartItem.reduce(
                    (acc, item) => acc + item.total,
                    0,
                )
                state.allTotal = state.total
            } else {
                state.cartItem[existingItemIndex].quantity += quantity
                // Update the total and allTotal accordingly
                state.cartItem[existingItemIndex].total =
                    state.cartItem[existingItemIndex].products.price *
                    state.cartItem[existingItemIndex].quantity

                // Recalculate the total and allTotal accordingly
                state.total = state.cartItem.reduce(
                    (acc, item) => acc + item.total,
                    0,
                )
                state.allTotal = state.total
            }
        },
        decreaseProduct: (state, action) => {
            console.log('=============INCREASE========')
            const { productId, colorr, quantity } = action.payload

            const existingItemIndex = state.cartItem.findIndex(
                item => item.products.id === productId && item.color === colorr,
            )

            if (existingItemIndex) {
                // Update the quantity for the specific item
                state.cartItem[existingItemIndex].quantity = Math.max(
                    state.cartItem[existingItemIndex].quantity - quantity,
                    1,
                )
                // Update the total and allTotal accordingly
                state.cartItem[existingItemIndex].total =
                    state.cartItem[existingItemIndex].products.price *
                    state.cartItem[existingItemIndex].quantity

                // Recalculate the total and allTotal accordingly
                state.allTotal = state.cartItem.reduce(
                    (acc, item) => acc + item.total,
                    0,
                )
            } else {
                state.cartItem[existingItemIndex].quantity = Math.max(
                    state.cartItem[existingItemIndex].quantity - quantity,
                    1,
                )
                // Update the total and allTotal accordingly
                state.cartItem[existingItemIndex].total =
                    state.cartItem[existingItemIndex].products.price *
                    state.cartItem[existingItemIndex].quantity

                // Recalculate the total and allTotal accordingly
                state.allTotal = state.cartItem.reduce(
                    (acc, item) => acc + item.total,
                    0,
                )
            }
        },
    },
})

export const { addToQuickVCart, increaseProduct, decreaseProduct } =
    quickVCartSlice.actions
export default quickVCartSlice.reducer
