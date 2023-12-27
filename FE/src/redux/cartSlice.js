import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// TAKE OUT CARTITEM
export const fetchUserCartProduct = createAsyncThunk(
    'cart/fetchUserCartProduct',
    async () => {
        const response = await axios.get(
            'http://localhost:8080/product_cart/getUserCartItem/',
            { withCredentials: true },
        )
        return response.data
    },
)
//TAKE OUT TOTAL ALL
export const fetchTotalAll = createAsyncThunk(
    'cart/fetchTotalAll',
    async () => {
        try {
            const response = await axios.get(
                'http://localhost:8080/cart/totalAll/',
                { withCredentials: true },
            )
            return response.data.totalAll
        } catch (error) {
            throw error
        }
    },
)
//DELETE ONE PRODUCT
export const fetchDeleteOProduct = createAsyncThunk(
    'cart/fetchDeleteOProduct',
    async ({ productId, color }) => {
        try {
            const response = await axios.delete(
                `http://localhost:8080/product_cart/delete/${productId}/${color}`,
                { withCredentials: true },
            )
            console.log(response)
            return response.data
        } catch (error) {
            throw error
        }
    },
)
//INCREASE QUANTITY
export const fetchIncreaseQuantity = createAsyncThunk(
    'cart/fetchIncreaseQuantity',
    async ({ productId, color }) => {
        try {
            const response = await axios.put(
                `http://localhost:8080/product_cart/increaseProduct/${productId}/${color}`,
                { withCredentials: true },
            )
            console.log('fetchIncreaseQuantity', response)
            return response.data
        } catch (error) {
            throw error
        }
    },
)
//DECREASE QUANTITY
export const fetchDecreaseQuantity = createAsyncThunk(
    'cart/fetchDecreaseQuantity',
    async ({ productId, color }) => {
        try {
            const response = await axios.put(
                `http://localhost:8080/product_cart/decreaseProduct/${productId}/${color}`,
                { withCredentials: true },
            )
            console.log('fetchDecreaseQuantity', response)
            return response.data
        } catch (error) {
            throw error
        }
    },
)

export const CartSlice = createSlice({
    name: 'Cart',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        quantity: 0,
        textSearch: '',
    },
    reducers: {
        searchProduct: (state, action) => {
            console.log('---SEARCH IN REDUX------')
            const { textSearch } = action.payload

            // Create a new state object instead of mutating the existing state
            return {
                ...state,
                textSearch: textSearch,
            }
        },
        // decreaseProduct: (state, action) => {
        //     console.log('=============INCREASE========')
        //     const { productId, colorr, quantity } = action.payload
        //     const existingItemIndex = state.cartItem.findIndex(
        //         item => item.products.id === productId && item.color === colorr,
        //     )
        //     if (existingItemIndex) {
        //         // Update the quantity for the specific item
        //         state.cartItem[existingItemIndex].quantity = Math.max(
        //             state.cartItem[existingItemIndex].quantity - quantity,
        //             1,
        //         )
        //         // Update the total and allTotal accordingly
        //         state.cartItem[existingItemIndex].total =
        //             state.cartItem[existingItemIndex].products.price *
        //             state.cartItem[existingItemIndex].quantity
        //         // Recalculate the total and allTotal accordingly
        //         state.allTotal = state.cartItem.reduce(
        //             (acc, item) => acc + item.total,
        //             0,
        //         )
        //     } else {
        //         state.cartItem[existingItemIndex].quantity = Math.max(
        //             state.cartItem[existingItemIndex].quantity - quantity,
        //             1,
        //         )
        //         // Update the total and allTotal accordingly
        //         state.cartItem[existingItemIndex].total =
        //             state.cartItem[existingItemIndex].products.price *
        //             state.cartItem[existingItemIndex].quantity
        //         // Recalculate the total and allTotal accordingly
        //         state.allTotal = state.cartItem.reduce(
        //             (acc, item) => acc + item.total,
        //             0,
        //         )
        //     }
        // },
    },
    extraReducers: builder => {
        builder
            // TAKE OUT CARTITEM
            .addCase(fetchUserCartProduct.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchUserCartProduct.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload
            })
            .addCase(fetchUserCartProduct.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            //TAKE OUT TOTAL ALL
            .addCase(fetchTotalAll.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchTotalAll.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.totalAll = action.payload
            })
            .addCase(fetchTotalAll.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            //METHOD DELETE ONE PRODUCT
            .addCase(fetchDeleteOProduct.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchDeleteOProduct.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const { productId, color } = action.meta.arg
                state.productId = productId
                state.color = color
            })
            .addCase(fetchDeleteOProduct.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            //INCREASE QUANTITY
            .addCase(fetchIncreaseQuantity.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchIncreaseQuantity.fulfilled, (state, action) => {
                const { productId, color } = action.meta.arg
                state.productId = productId
                state.color = color
            })
            .addCase(fetchIncreaseQuantity.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            //DECREASE QUANTITY
            .addCase(fetchDecreaseQuantity.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchDecreaseQuantity.fulfilled, (state, action) => {
                const { productId, color } = action.meta.arg
                state.productId = productId
                state.color = color
            })
            .addCase(fetchDecreaseQuantity.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },
})

export const { searchProduct } = CartSlice.actions
export default CartSlice.reducer
