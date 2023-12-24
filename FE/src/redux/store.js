//app / store.js

// Redux Toolkit cung cấp hàm configureStore để tạo Redux store.
// Hàm này tự động kích thích môi trường phát triển, tích hợp Redux DevTools
//và thực hiện nhiều cấu hình mặc định để giảm độ phức tạp.

//Hàm configureStore được gọi để tạo Redux Store.
//Trong đối số truyền một đối tượng reducer.
// Mỗi cặp key - value của đối tượng này đại diện cho một slice của trạng thái trong store.

import { configureStore } from '@reduxjs/toolkit'
import CartReducer from './cartSlice.js'

export default configureStore({
    reducer: {
        //có một slice có tên là counter, và reducer của nó là counterReducer
        Cart: CartReducer,
    },
})
